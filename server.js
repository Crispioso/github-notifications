import express from 'express'
import path from 'path';
import fetch from 'node-fetch';
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

const updateAll = function(db, notifications, callback) {
    const collection = db.collection('notifications');

    collection.updateMany({github_id: 1}, {$set: notifications}, { upsert:true }, function(err, updatedItems) {
        assert.equal(null, err);
        console.log(updatedItems);
        callback(updatedItems);
    });
};

const updateOne = function(db, id, notification, callback) {
    const collection = db.collection('notifications');

    collection.updateOne({github_id: notification.github_id}, {$set: notification, $currentDate: {lastModified: true}}, { upsert:true }, function(err, updatedItems) {
        assert.equal(null, err);
        callback(updatedItems);
    });
};

// Store in database
const update = function(db, notificationsData, callback) {
    // Get the notifications collection
    const collection = db.collection('notifications');

    // Insert some notifications
    collection.updateMany(notificationsData, function(err, result) {
        assert.equal(err, null);
        assert.equal(notificationsData.length, result.result.n);
        assert.equal(notificationsData.length, result.ops.length);
        console.log("Inserted %s documents into the collection", result.result.n);
        callback(result);
    });
};

// Retrieve from database
const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('notifications');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
};

const createIndexes = function(db) {
    const collection = db.collection('notifications');

    collection.createIndex({ github_id: 1 }, function(error, result) {
        if (error) {
            console.log("Error whilst creating index: %s", error);
        }
    })
};


fetch('https://api.github.com/notifications?access_token=' + config.auth_token).then(response => {
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
        const dataModel = {
            _id: 0,
            github_id: 0,
            repo_id: 0,
            repo_full_name: '',
            repo_url: '',
            title: '',
            url: '',
            type: '',
            unread: true,
            favourite: false,
            archived: false,
            reason: '',
            updated_at: '',
            last_read_at: ''
        };
        let i = 0;

        for (i; i < responseLength; i++) {
            let thisObj = Object.assign({}, dataModel);
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


app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/index.html'));
    //__dirname : It will resolve to your project folder.
});

app.get('/notificationsData', function(req, res) {
    MongoClient.connect(database, function(err, db) {
        assert.equal(null, err);

        findDocuments(db, function(notifications) {
            res.json(notifications);
            db.close();
        });
    });
});

app.listen(config.port, function () {
    console.log('Preact app started \nPORT: %s\nOAUTH_TOKEN: %s\n', config.port, config.auth_token);
});

app.use(express.static('dist'));