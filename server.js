import express from 'express'
import path from 'path';
import fetch from 'node-fetch';
import async from 'async';
import bodyParser from 'body-parser';
import models from './src/models/models';
import parseBool from './src/utilities/parseBool';
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

    collection.updateOne({_id: notification._id}, {$set: notification, $currentDate: {lastModified: true}}, { upsert:true }, function(err, updatedItems) {
        assert.equal(null, err);
        callback(updatedItems);
    });
};

// Retrieve from database
const findDocuments = function(db, query, callback) {
    // Get the documents collection
    const collection = db.collection('notifications');
    // Find some documents
    collection.find(query).sort({'updated_at': -1}).toArray(function(err, docs) {
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
    });
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

            async.each(response, function(notification, callback) {
                const id = notification.id + "-" + notification.repository.owner.login;
                findDocuments(db, {_id: id}, function(dbData) {
                    const notificationData = dbData.length ? dbData : models.notification;
                    const thisObj = Object.assign({}, notificationData, {
                        _id: notification.id + "-" + notification.repository.owner.login,
                        github_id: notification.id,
                        repo_id: notification.repository.id,
                        repo_owner: notification.repository.owner.login,
                        repo_full_name: notification.repository.full_name,
                        repo_url: notification.repository.html_url,
                        title: notification.subject.title,
                        url: notification.subject.url,
                        type: notification.subject.type,
                        unread: notification.unread,
                        reason: notification.reason,
                        updated_at: notification.updated_at,
                        last_read_at: notification.last_read_at
                    });
                    updateOne(db, notification.id, thisObj, function() {});
                    callback();
                });
            }, function(err) {
                if (err) {
                    console.log("Error finding document");
                } else {
                    db.close();
                }
            });
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

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));
app.post('/updateNotification/:id', function(req, res) {
    const id = req.params.id;
    const field = req.body.field;
    const value = req.body.value;
    const newData = {};
    newData[field] = value;

    MongoClient.connect(database, function(err, db) {
        assert.equal(null, err);
        const collection = db.collection('notifications');
        collection.updateOne({_id: id}, {$set: newData, $currentDate: {lastModified: true}}, { upsert:true }, function(err, updatedData) {
            assert.equal(null, err);
            res.setHeader('Content-Type', 'application/json');
            newData['_id'] = id;
            res.send(JSON.stringify(newData));
        });
    });
});

app.listen(config.port, function () {
    console.log('Inferno app started \nPORT: %s\nOAUTH_TOKEN: %s\n', config.port, config.auth_token);
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
        "type": "type",
        "favourite": "favourite"
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
        if (property === "favourite" || property === "unread" || property === "done") {
            DBQuery[parameterToDBProperty[property]] = parseBool(DBQuery[parameterToDBProperty[property]]);
        }
    });

    console.log("Database query: ");
    console.log(DBQuery);

    return DBQuery;
}