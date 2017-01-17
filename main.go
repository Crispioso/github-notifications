package main

import (
	"./assets"
	"net/http"
	"github.com/gorilla/pat"
	"mime"
	"path/filepath"
	"log"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"encoding/json"
)

var session *mgo.Session
var collection *mgo.Collection

func main() {
	bindAddress := `:3000`
	dbAddress := `localhost:27017`

	var err error
	session, err = mgo.Dial(dbAddress)
	if err != nil {
		log.Fatal(err)
	}
	defer session.Close()

	collection = session.DB("github-notifications").C("notifications")

	router := pat.New()
	router.Get("/notificationsData", listNotifications)
	router.Get("/{uri:.*}", staticFiles)

	log.Printf("Starting server on %s", bindAddress)

	log.Fatal(http.ListenAndServe(bindAddress, router))
}

func listNotifications(w http.ResponseWriter, req *http.Request) {
	var notifications []map[string]interface{}

	err := collection.Find(bson.M{}).All(&notifications)
	if err != nil {
		log.Println(err)
		w.WriteHeader(500)
		return
	}

	b, err := json.Marshal(notifications)
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
