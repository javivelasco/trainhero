var expect         = require('chai').expect,
    sinon          = require('sinon'),
    P              = require('bluebird'),
    actions        = require('../../actions'),
    users          = require('../../../core/repositories/user_repository'),
    userService    = require('../../../core/services/user_service'),
    userActions    = require('../../../core/actions/user_actions');

describe("actions/user_actions.js", function() {
  describe("#emailSignupUser", function() {
    var user = actions.newUser();

    before(function() { sinon.stub(userService, 'emailSignup').returns(P.resolve(user)); });
    after(function()  { userService.emailSignup.restore(); });

    it("calls user service with the proper arguments", function(done) {
      userActions.signupWithEmail(user.name, user.email, user.password, user.password).then(function(result) {
        expect(result).to.eql(user);
        expect(userService.emailSignup.called).to.eql(true);
        expect(userService.emailSignup.getCall(0).args[0]).to.eql(user.name);
        expect(userService.emailSignup.getCall(0).args[1]).to.eql(user.email);
        expect(userService.emailSignup.getCall(0).args[2]).to.eql(user.password);
        expect(userService.emailSignup.getCall(0).args[3]).to.eql(user.password);
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });

  describe("#connectFacebook", function() {
    var user  = actions.newUser(),
        token = 'facebookTokenConnect',
        uid   = 'testUID';

    before(function() { sinon.stub(userService, 'facebookConnect').returns(P.resolve(user)); });
    after(function()  { userService.facebookConnect.restore(); });

    it("calls user service with the proper arguments", function(done) {
      userActions.connectFacebook(user.name, user.email, uid, token).then(function(result) {
        expect(result).to.eql(user);
        expect(userService.facebookConnect.called).to.eql(true);
        expect(userService.facebookConnect.getCall(0).args[0]).to.eql(user.name);
        expect(userService.facebookConnect.getCall(0).args[1]).to.eql(user.email);
        expect(userService.facebookConnect.getCall(0).args[2]).to.eql(uid);
        expect(userService.facebookConnect.getCall(0).args[3]).to.eql(token);
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });
});
