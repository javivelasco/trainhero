var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var userService      = require('../core/services/user_service');
var users            = require('../core/repositories/user_repository');

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	users.findOneById(id).then(function(user) {
		done(null, user);
	}).catch(function(err) {
		done(err, null);
	});
});

passport.use('local-signup', new LocalStrategy({
		usernameField:    'email',
		passwordField:    'password',
		passReqToCallback: true
	},
	function(req, email, password, done) {
		process.nextTick(function() {
			var name           = req.body.name;
			var passwordRepeat = req.body.passwordRepeat;

			userService.emailSignup(name, email, password, passwordRepeat).then(function(user) {
				done(null, user)
			}).catch(function(err) {
				done(err);
			});
		});
	}
));

passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, email, password, done) {
		users.findOneByEmail(email).then(function(user) {
			if (!user)
				return done(null, false)

			if (!user.validPassword(password))
				return done(null, false)

			return done(null, user);
		});
	}
));

passport.use('facebook', new FacebookStrategy({
		clientID:     process.env.FACEBOOK_APP_ID,
		clientSecret: process.env.FACEBOOK_APP_SECRET,
		callbackURL:  '/auth/facebook/callback'
	},
	function(accessToken, refreshToken, profile, done) {
		process.nextTick(function() {
			var uid   = profile.id;
			var name  = profile.name.givenName + ' ' + profile.name.familyName;
			var email = profile.emails[0].value;
			var token = token;

			return userService.facebookConnect(name, email, uid, token).then(function(user) {
				return done(null, user);
			}).catch(function(err) {
				return done(err, null);
			});
		});
	}
));

module.exports = passport;
