import express from 'express'
import path from 'path';
import fetch from 'node-fetch';
import async from 'async';
import bodyParser from 'body-parser';
import models from './src/models/models';
import parseBool from './src/utilities/parseBool';
const app = express();
const router = express.Router();
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

const updateOne = function(db, notification, callback) {
    const collection = db.collection('notifications');

    delete notification['lastModified'];
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

const createCustomFilters = function(db) {
    const collection = db.collection('filters');

    collection.updateOne({}, {$set: {title: "test", parameters: {"repo_id": 71245455, "type": "PullRequest"}}}, {upsert: true}, function(err, updatedItem) {
        assert.equal(null, err);
        console.log('Added test filter');
    });
};

function getNotifications(pageNumber) {
    let hasNextPage = false;
    const thisPageNumber = pageNumber ? (pageNumber + 1) : 1;
    const url = 'https://api.github.com/notifications?all=true' + '&page=' + thisPageNumber + '&access_token=' + config.auth_token;

    fetch(url).then(response => {
        if (response.status !== 200) {
            console.log("Expected 200 response from Github API, instead got '%s %s'", response.status, response.statusText);
            throw('');
        }
        hasNextPage = (response.headers.get('link').indexOf('rel="next"') !== -1);
        return response.json();
    }).then(response => {
        MongoClient.connect(database, function(err, db) {
            assert.equal(null, err);

            createIndexes(db);
            createCustomFilters(db);

            async.each(response, function(notification, callback) {
                const id = notification.id + "-" + notification.repository.owner.login;
                findDocuments(db, {_id: id}, function(dbData) {
                    const notificationData = dbData.length ? dbData[0] : models.notification;
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

                    getNotificationWebURL(notification.subject.url, webURL => {
                        thisObj.web_url = webURL;
                        updateOne(db, thisObj, function() {});
                        callback();
                    });
                });
            }, function(err) {
                if (err) {
                    console.log("Error finding document");
                } else {
                    if (hasNextPage) {
                        getNotifications(thisPageNumber);
                        return;
                    }
                    db.close();
                }
            });
        });
    }).catch(error => {
        console.log("Error getting notifications data from Github API \n%s", error);
    });
}

getNotifications();
// setInterval(getNotifications, 60000);

function getNotificationWebURL(apiURL, callback) {
    fetch(apiURL + '?access_token=' + config.auth_token).then(response => response.json()).then(response => {
        callback(response.html_url);
    });
}


router.get('/notificationsData', function(req, res) {

    MongoClient.connect(database, function(err, db) {
        assert.equal(null, err);

        const dbQuery = buildDBQuery(req.query);

        findDocuments(db, dbQuery, function(notifications) {
            addNotificationsMetadata(db, dbQuery, notifications, function(response) {
                res.json(response);
                db.close();
            });
        });
    });
});

router.get('/', function(req, res){
    console.log("Request for %s", req.params.path);
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.use('/', router);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('dist'));
app.post('/updateNotification/:id', function(req, res) {
    const id = req.params.id;
    const field = req.body.field;
    const value = req.body.value;
    const newData = {};
    newData[field] = value;

    console.log("POST database query:");
    console.log(req.query);

    MongoClient.connect(database, function(err, db) {
        assert.equal(null, err);
        const collection = db.collection('notifications');
        collection.updateOne({_id: id}, {$set: newData, $currentDate: {lastModified: true}}, { upsert:true }, function(err, updatedData) {
            assert.equal(null, err);
            const dbQuery = buildDBQuery(req.query);

            findDocuments(db, dbQuery, function(notifications) {
                addNotificationsMetadata(db, dbQuery, notifications, function(response) {
                    res.setHeader('Content-Type', 'application/json');
                    res.json(response);
                });
            });
        });
    });
});

app.listen(config.port, function () {
    console.log('Inferno app started \nPORT: %s\nOAUTH_TOKEN: %s\n', config.port, config.auth_token);
});

function addNotificationsMetadata(db, dbQuery, notifications, callback) {
    const collection = db.collection('notifications');

    collection.find(dbQuery).count(function(err, count) {
        callback({
            totalCount: count,
            pageCount: Math.ceil(count / 50),
            notifications: notifications
        });
    });
}

function buildDBQuery(parameters) {
    const parametersArray = Object.keys(parameters);
    const parameterToDBProperty = {
        "repo-id": "repo_id",
        "type": "type",
        "favourite": "favourite",
        "done": "done"
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