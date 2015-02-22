var expect      = require('chai').expect,
    actions     = require('../actions'),
    userActions = require('../../core/actions/user_actions'),
    users       = require('../../core/repositories/user_repository');

describe("Creating users", function() {
  var dummyUser = actions.newUser();

  beforeEach(function() {
    users.clear();
  });

  it("creates a user using email", function(done) {
    userActions.signupWithEmail(dummyUser.name, dummyUser.email, dummyUser.password, dummyUser.password).then(function(user) {
      expect(user.id).to.exist();
      expect(user.name).to.eql(dummyUser.name);
      expect(user.email).to.eql(dummyUser.email);
      done();
    }).catch(function(err) {
      done(err);
    });
  });

  it("creates a user connecting facebook", function(done) {
    userActions.connectFacebook(dummyUser.name, dummyUser.email, dummyUser.facebook.uid, dummyUser.facebook.token).then(function(user) {
      expect(user.id).to.exist();
      expect(user.name).to.eql(dummyUser.name);
      expect(user.email).to.eql(dummyUser.email);
      done();
    }).catch(function(err) {
      done(err);
    });
  });
});
