var session    = require('express-session'),
    RedisStore = require('connect-redis')(session),
    url        = require('url'),
    config     = require('./config'),
		redis      = url.parse(config.redisUrl);

var authFromParsedUrl = function(auth) {
	return auth ? auth.substring(auth.indexOf(':') + 1) : null
};

module.exports = new RedisStore({
	host: redis.hostname,
	port: redis.port,
	pass: authFromParsedUrl(redis.auth)
});
