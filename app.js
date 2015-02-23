var dotenv       = require('dotenv').load(),
    express      = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser'),
    errorhandler = require('errorhandler'),
    morgan       = require('morgan'),
    session      = require('express-session'),
    passport     = require('./config/passport'),
    redisStore   = require('./config/redis-store'),
    routes       = require('./routes');

var app  = express();
var port = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === 'development') {
  app.use(errorhandler());
};

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: process.env.SESSION_SECRET, resave: false, store:  redisStore, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'))
app.use(routes);

app.listen(port);
console.log("We took the stage on port " + port + " nigga!");
