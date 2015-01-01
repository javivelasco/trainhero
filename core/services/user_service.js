var _       = require('lodash'),
    Promise = require('bluebird').Promise,
    User    = require('../models/user'),
		users   = require('../repositories/user_repository');

function UserService() {};

_.extend(UserService.prototype, {
	emailSignup: function(name, email, password, passwordRepeat) {
    var user = new User({name: name, email: email, password: password});

    if (password !== passwordRepeat)
      return Promise.reject("Password repeat does not match");

    if (!user.isValid())
      return Promise.reject(user.errors);

    return users.findOneByEmail(email).then(function(result) {
      if (result) return Promise.reject("Email is taken");
      user.password = user.generateHash(user.password);
      return users.put(user);
    });
	},

  facebookConnect: function(name, email, uid, token) {
    return users.findOneByEmail(email).then(function(result) {
      if (result) {
        result.setFacebookAuthorization({uid: uid, token: token});
        return users.put(result);
      }
      return users.put(new User({
        name: name, email: email,
        facebook: { uid: uid, token: token }
      }));
    });
  }
});

module.exports = new UserService();
