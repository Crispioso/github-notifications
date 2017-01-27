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
	"time"
)

var session *mgo.Session
var notifications *mgo.Collection
var filters *mgo.Collection

type notification struct {
	GithubID string `bson:"github_id"`
	RepoID int32 `bson:"repo_id"`
	RepoOwner string `bson:"repo_owner"`
	RepoFullName string `bson:"repo_full_name"`
	RepoURL string `bson:"repo_url"`
	Title string `bson:"title"`
	ApiURL string `bson:"api_url"`
	WebURL string `bson:"web_url"`
	Type string `bson:"type"`
	Unread bool `bson:"unread"`
	Favourite bool `bson:"favourite"`
	Done bool `bson:"done"`
	Archived bool `bson:"archived"`
	Reason string `bson:"reason"`
	UpdatedAt string `bson:"updated_at"`
	LastReadAt string `bson:"last_read_at"`
	LastModified time.Time `bson:"last_modified"`
}

func main() {
	bindAddress := `:3000`
	dbAddress := `localhost:27017`

	var err error
	session, err = mgo.Dial(dbAddress)
	if err != nil {
		log.Fatal(err)
	}
	defer session.Close()

	notifications = session.DB("github-notifications").C("notifications")

	router := pat.New()
	router.Post("/filter", addFilter)
	router.Get("/notifications", listNotifications)
	router.Get("/{uri:.*}", staticFiles)

	log.Printf("Starting server on %s", bindAddress)

	log.Fatal(http.ListenAndServe(bindAddress, router))
}

func addFilter (w http.ResponseWriter, req *http.Request) {
	filters = session.DB("github-notifications").C("filters")
}

func listNotifications(w http.ResponseWriter, req *http.Request) {
	var defaultFilters = map[string]bson.M{
		"inbox": bson.M{"done": false},
		"done": bson.M{"done": true},
		"favourites": bson.M{"favourite": true, "done": false},
	}
	var notificationsResponse []map[string]interface{}
	var filterName = req.URL.Query().Get("filter")
	var filter = defaultFilters[filterName]

	//TODO validate that filter has been found
	//if filter, ok := defaultFilters[filterName]; ok {
	//
	//}

	log.Printf("Request for filter %s", filterName)

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
