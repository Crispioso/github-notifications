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
const database = 'mongodb://localhost:27017/myproject';

// Store in database
const insertDocuments = function(db, notificationsData, callback) {
    // Get the documents collection
    const collection = db.collection('notifications');
    // Insert some documents
    collection.insertMany(notificationsData, function(err, result) {
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

fetch('https://api.github.com/notifications?access_token=' + config.auth_token).then(response => {
    if (response.status !== 200) {
        console.log("Expected 200 response from Github API, instead got '%s %s'", response.status, response.statusText);
        throw('');
    }

    return response.json();
}).then(response => {

    console.log("Fetch notifications from Github API successful");

    MongoClient.connect(database, function(err, db) {
        assert.equal(null, err);

        insertDocuments(db, response, function() {
            db.close();
        });
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