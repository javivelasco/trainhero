var dotenv = require('dotenv');
var express = require('express');
var bodyParser = require('body-parser');
var errorhandler = require('errorhandler');
var Promise = require("bluebird");
var morgan = require("morgan");
var routes  = require('./routes');

var app = express();

dotenv.load();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === 'development') {
  app.use(errorhandler());
};

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'))

app.use(routes);
app.listen('3000');
console.log("We took the stage on port 3000 nigga!");
