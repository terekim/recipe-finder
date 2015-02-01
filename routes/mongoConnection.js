var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var assert = require('assert');


//Connection URL
var url = 'mongodb://localhost:27017/recipeFinder';
var dbName = 'recipeFinder';

//collections (tables)
var usersColl = 'users';
var dishesColl = 'dishes';

MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	console.log('Connected correctly to server');


	db = db.db(dbName);
});


exports.updateUser = function (callback) {
	connectMongo(usersColl, callback);
};

exports.updateDish = function (callback) {
	connectMongo(dishesColl, callback);
};

exports.getDishesById = function (callback) {
	connectMongo(dishesColl, callback);
};

var connectMongo = function(collName, callback){
    mongo.connect(url, function(err, conn){
        conn.collection(collName, function(err, collection){
            callback(collection);
        });
    });
}