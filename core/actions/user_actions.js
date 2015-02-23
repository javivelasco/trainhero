var userService = require('../services/user_service');

var userActions = {
  signupWithEmail: function(name, email, password, passwordRepeat) {
    return userService.emailSignup(name, email, password, passwordRepeat);
  },

  connectFacebook: function(name, email, uid, token) {
    return userService.facebookConnect(name, email, uid, token);
  }
};

module.exports = userActions;
