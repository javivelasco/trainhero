var mongoskin = require('mongoskin'),
       config = require('./config');

var db = mongoskin.db(config.mongo_url);
module.exports.db = db;
