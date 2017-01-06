import express from 'express'
import path from 'path';
import fetch from 'node-fetch';
import models from './src/models/models';
const app = express();
const config = {
    port: process.env.PORT || 3000,
    auth_token: process.env.OAUTH_TOKEN
};

if (!config.auth_token) {
    throw('OAUTH_TOKEN must be provided to use Github API');
}

// Database config
import MongoClient from 'mongodb';
import assert from 'assert';
const database = 'mongodb://localhost:27017/github-notifications';

const updateOne = function(db, id, notification, callback) {
    const collection = db.collection('notifications');

    collection.updateOne({github_id: notification.github_id}, {$set: notification, $currentDate: {lastModified: true}}, { upsert:true }, function(err, updatedItems) {
        assert.equal(null, err);
        callback(updatedItems);
    });
};

// Retrieve from database
const findDocuments = function(db, query, callback) {
    // Get the documents collection
    const collection = db.collection('notifications');
    // Find some documents
    collection.find(query).toArray(function(err, docs) {
        assert.equal(err, null);
        callback(docs);
    });
};

const createIndexes = function(db) {
    const collection = db.collection('notifications');

    collection.createIndex({ repo_id: 1 }, function(error) {
        if (error) {
            console.log("Error whilst creating index: %s", error);
        }
    });

    collection.createIndex({ type: "text" }, function(error) {
        if (error) {
            console.log("Error whilst creating index: %s", error);
        }
    })
};


function getNotifications() {
    fetch('https://api.github.com/notifications?all=true&access_token=' + config.auth_token).then(response => {
        if (response.status !== 200) {
            console.log("Expected 200 response from Github API, instead got '%s %s'", response.status, response.statusText);
            throw('');
        }
        return response.json();
    }).then(response => {
        MongoClient.connect(database, function(err, db) {
            assert.equal(null, err);

            createIndexes(db);

            const responseLength = response.length;
            let i = 0;

            for (i; i < responseLength; i++) {
                let thisObj = Object.assign({}, models.notification);
                thisObj._id = response[i].id;
                thisObj.github_id = response[i].id;
                thisObj.repo_id = response[i].repository.id;
                thisObj.repo_full_name = response[i].repository.full_name;
                thisObj.repo_url = response[i].repository.html_url;
                thisObj.title = response[i].subject.title;
                thisObj.url = response[i].subject.url;
                thisObj.type = response[i].subject.type;
                thisObj.unread = response[i].unread;
                thisObj.reason = response[i].reason;
                thisObj.updated_at = response[i].updated_at;
                thisObj.last_read_at = response[i].last_read_at;

                updateOne(db, response[i].id, thisObj, function() {});
            }

            db.close();
        });
    }).catch(error => {
        console.log("Error getting notifications data from Github API \n%s", error);
    });
}

getNotifications();
setInterval(getNotifications, 60000);


app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/index.html'));
    //__dirname : It will resolve to your project folder.
});

app.get('/notificationsData', function(req, res) {

    MongoClient.connect(database, function(err, db) {
        assert.equal(null, err);

        findDocuments(db, buildDBQuery(req.query), function(notifications) {
            const response = addNotificationsMetadata(notifications);
            res.json(response);
            db.close();
        });
    });
});

app.listen(config.port, function () {
    console.log('Preact app started \nPORT: %s\nOAUTH_TOKEN: %s\n', config.port, config.auth_token);
});

app.use(express.static('dist'));

function addNotificationsMetadata(notifications) {
    let metadata = {
        unreadCount: 0
    };
    let combinedObject = {metadata: metadata, notifications: notifications};

    notifications.map(value => {
        if (value.unread) {
            metadata.unreadCount++;
        }
    });

    return combinedObject;
}

function buildDBQuery(parameters) {
    const parametersArray = Object.keys(parameters);
    const parameterToDBProperty = {
        "repo-id": "repo_id",
        "type": "type"
    };
    let DBQuery = {};

    if (parametersArray.length <= 0) {
        return {}
    }

    parametersArray.forEach(function(property) {
        DBQuery[parameterToDBProperty[property]] = parameters[property];

        // Do any type changing (eg string to int)
        if (property === "repo-id") {
            DBQuery[parameterToDBProperty[property]] = parseInt(DBQuery[parameterToDBProperty[property]]);
        }
    });

    console.log("Database query: ");
    console.log(DBQuery);

    return DBQuery;
}