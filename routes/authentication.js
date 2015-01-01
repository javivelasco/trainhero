var passport = require('../config/passport');

var authentication = {
	emailLogin: passport.authenticate('local-login', {
		successRedirect : '/search',
		failureRedirect : '/login'
	}),

	emailSignup: passport.authenticate('local-signup', {
		successRedirect : '/search',
		failureRedirect : '/signup'
	}),

	facebookConnect: passport.authenticate('facebook', {
		scope : 'email'
	}),

	facebookCallback: passport.authenticate('facebook', {
		successRedirect : '/search',
		failureRedirect : '/login'
	}),

	loginPage: function (req, res) {
		res.render('authentication/login');
	},

	signupPage: function (req, res) {
		res.render('authentication/signup');
	},

	logout: function(req, res) {
		req.logout();
		res.redirect('/login');
	}
};

module.exports = authentication;
