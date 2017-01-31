package main

import (
	"./assets"
	"encoding/json"
	"github.com/gorilla/pat"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"io/ioutil"
	"log"
	"mime"
	"net/http"
	"path/filepath"
)

var session *mgo.Session
var notifications *mgo.Collection
var filters *mgo.Collection

func main() {
	bindAddress := `:3000`
	dbAddress := `localhost:27017`

	var err error
	session, err = mgo.Dial(dbAddress)
	if err != nil {
		log.Fatal(err)
	}
	defer session.Close()

	session.SetSafe(&mgo.Safe{})

	notifications = session.DB("github-notifications").C("notifications")
	filters = session.DB("github-notifications").C("filters")

	router := pat.New()
	router.Post("/filters/add", addFilter)
	router.Get("/filters", listFilters)
	router.Put("/notifications/{id}", updateNotification)
	router.Get("/notifications", listNotifications)
	router.Get("/{uri:.*}", staticFiles)

	log.Printf("Starting server on %s", bindAddress)

	log.Fatal(http.ListenAndServe(bindAddress, router))
}

func addFilter(w http.ResponseWriter, req *http.Request) {
	filters = session.DB("github-notifications").C("filters")
}

func listFilters(w http.ResponseWriter, req *http.Request) {
	var filtersResponse []map[string]interface{}

	err := filters.Find(bson.M{}).All(&filtersResponse)
	if err != nil {
		log.Println(err)
		w.WriteHeader(500)
		return
	}

	b, err := json.Marshal(filtersResponse)
	if err != nil {
		log.Println(err)
		w.WriteHeader(500)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	w.WriteHeader(200)
	w.Write(b)
}

func updateNotification(w http.ResponseWriter, req *http.Request) {
	var id = req.URL.Query().Get(":id")
	b, err := ioutil.ReadAll(req.Body)
	if err != nil {
		log.Println(err)
		w.WriteHeader(404)
		return
	}

	req.Body.Close()

	log.Printf("Update notification '%s'", id)

	var requestBody map[string]interface{}
	err = json.Unmarshal(b, &requestBody)
	if err != nil {
		log.Println(err)
		w.WriteHeader(400)
		return
	}

	notification := make(map[string]interface{})
	if done, ok := requestBody["done"]; ok {
		notification["done"] = done
	}
	if favourite, ok := requestBody["favourite"]; ok {
		notification["favourite"] = favourite
	}

	err = notifications.Update(bson.M{"_id": id}, bson.M{"$set": notification})
	if err != nil {
		log.Println(err)

		if err == mgo.ErrNotFound {
			w.WriteHeader(404)
		} else {
			w.WriteHeader(500)
		}
		return
	}

	w.WriteHeader(200)
}

func listNotifications(w http.ResponseWriter, req *http.Request) {
	var defaultFilters = map[string]bson.M{
		"inbox":      bson.M{"done": false},
		"done":       bson.M{"done": true},
		"favourites": bson.M{"favourite": true, "done": false},
	}
	var notificationsResponse []map[string]interface{}
	var filterName = req.URL.Query().Get("filter")
	var filter = defaultFilters[filterName]

	log.Printf("Request for filter %s", filterName)

	if len(filter) == 0 {
		var customFilter map[string]interface{}
		err := filters.Find(bson.M{"slug": filterName}).One(&customFilter)
		if err != nil {
			log.Printf("Unable to find custom filter '%s'", filterName)
			w.WriteHeader(500)
			return
		}

		filter = make(map[string]interface{})
		for k, v := range customFilter["queries"].(map[string]interface{}) {
			filter[k] = v
		}
	}

	log.Printf("Filter: %s", filter)

	err := notifications.Find(filter).All(&notificationsResponse)
	if err != nil {
		log.Println(err)
		w.WriteHeader(500)
		return
	}

	b, err := json.Marshal(notificationsResponse)
	if err != nil {
		log.Println(err)
		w.WriteHeader(500)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	w.WriteHeader(200)
	w.Write(b)
}

func staticFiles(w http.ResponseWriter, req *http.Request) {
	path := req.URL.Query().Get(":uri")

	log.Printf("Request for path %s", path)

HERE:

	b, err := assets.Asset("../dist/" + path)
	if err != nil {

		if path != "index.html" {
			path = "index.html"
			goto HERE
		}

		log.Println(err)
		w.WriteHeader(404)
		return
	}

	w.Header().Set(`Content-Type`, mime.TypeByExtension(filepath.Ext(path)))
	w.WriteHeader(200)
	w.Write(b)
}
