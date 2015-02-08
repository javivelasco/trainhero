var mongoskin = require('mongoskin'),
    Promise   = require("bluebird"),
    config    = require('./config');
    db        = null;

Promise.promisifyAll(mongoskin);
module.exports.db = mongoskin.db(config.mongoUrl);
