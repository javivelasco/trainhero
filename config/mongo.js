var mongoskin = require('mongoskin'),
    Promise   = require("bluebird"),
    config    = require('./config');

// Promisify the whole mongoskin
Object.keys(mongoskin).forEach(function(key) {
 var value = mongoskin[key];
 if (typeof value === "function") {
   Promise.promisifyAll(value);
   Promise.promisifyAll(value.prototype);
 }
});

Promise.promisifyAll(mongoskin);

// Connect database and export the object
var db = mongoskin.db(config.mongo_url);
module.exports.db = db;
