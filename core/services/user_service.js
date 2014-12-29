var _     = require('lodash'),
    User  = require('../models/user'),
		users = require('../repositories/user_repository');

function UserService() {};

_.extend(UserService.prototype, {
	emailSignup: function(name, email, password, passwordRepeat, cb) {
		var user;

		if (password !== passwordRepeat)
			return cb("Passwords doesn't match", null);

		user = new User({name: name, email: email, password: password});
		if (!user.isValid()) return cb("User is not valid", user);

		users.findOneByEmail(email, function(err, userExists) {
			if (userExists) return cb("Email is taken", null);
			users.put(user, function(err, user) {
				cb(null, user);
			});
		});
	}
});

module.exports = new UserService();
