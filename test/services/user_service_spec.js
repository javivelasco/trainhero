var expect  = require('chai').expect,
    sinon   = require('sinon'),
    Promise = require('bluebird').Promise,
    dummies = require('../dummies'),
    actions = require('../actions'),
    service = require('../../core/services/user_service'),
    User    = require('../../core/models/user'),
    users   = require('../../core/repositories/user_repository');

describe('UserService', function() {
  var dummyUser = dummyUser = actions.newUser();

  beforeEach(function() {
    sinon.stub(users, 'put').returns(Promise.resolve(dummyUser));
  });

  afterEach(function() {
    users.put.restore();
    users.findOneByEmail.restore();
  });

	describe('#emailSignup', function() {
    var name = dummies.dummyUser().name,
        email = dummies.dummyUser().email,
        password = dummies.dummyUser().password,
        passwordRepeat = dummies.dummyUser().password;


		it("creates a user if the user does not exists", function(done) {
      sinon.stub(users, "findOneByEmail").returns(Promise.resolve(null));
      service.emailSignup(name, email, password, passwordRepeat).then(function(user) {
        expect(users.put.getCall(0).args[0]).to.be.an.instanceof(User);
        expect(user).to.be.an.instanceof(User);
        expect(users.put.called).to.eql(true);
        expect(user).to.eql(dummyUser);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it("stores the user with the bcrypted password", function(done) {
      sinon.stub(users, "findOneByEmail").returns(Promise.resolve(null));
      service.emailSignup(name, email, password, passwordRepeat).then(function(user) {
        dummyUser.password = users.put.getCall(0).args[0].password;
        expect(dummyUser.validPassword(password)).to.eql(true);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it("does not create a user if the user is not valid", function(done) {
      sinon.stub(users, "findOneByEmail").returns(Promise.resolve(null));
      service.emailSignup(null, email, password, passwordRepeat).catch(function(err) {
        expect(users.put.called).to.eql(false);
        expect(err).to.not.eql(null);
        done();
      });
    });

		it("does not create a user if the user already exists", function(done) {
      sinon.stub(users, "findOneByEmail").returns(Promise.resolve(dummyUser));
      service.emailSignup(name, email, password, passwordRepeat).catch(function(err) {
        expect(err).to.eql("Email is taken");
        expect(users.put.called).to.eql(false);
        done();
      });
    });

		it("does not create a user if the passwords does not match", function(done) {
      sinon.stub(users, "findOneByEmail").returns(Promise.resolve(null));
      service.emailSignup(name, email, password, 'wrongpassword').catch(function(err) {
        expect(err).to.eql("Password repeat does not match");
        expect(users.put.called).to.eql(false);
        done();
      });
    });
	});

  describe('#facebookConnect', function() {
    var name = dummies.dummyUser().name,
        email = dummies.dummyUser().email,
        uid = dummies.dummyAuthorization().uid,
        token = dummies.dummyAuthorization().token,
        arg;

    beforeEach(function() {
      dummyUser.facebook = null;
    });

    it("adds an authorization to the user if user existed", function(done) {
      sinon.stub(users, "findOneByEmail").returns(Promise.resolve(dummyUser));
      service.facebookConnect(name, email, uid, token).then(function(result) {
        expect(users.put.called).to.eql(true);
        arg = users.put.getCall(0).args[0];
        expect(arg.name).to.eql(name);
        expect(arg.email).to.eql(email);
        expect(arg.facebook.uid).to.eql(uid);
        expect(arg.facebook.token).to.eql(token);
        expect(arg.facebook.provider).to.eql('facebook');
        expect(result).to.eql(dummyUser);
        done();
      });
    });

    it("creates a new user if he didn't exist", function(done) {
      sinon.stub(users, "findOneByEmail").returns(Promise.resolve(null));
      service.facebookConnect(name, email, uid, token).then(function(result) {
        expect(users.put.called).to.eql(true);
        arg = users.put.getCall(0).args[0];
        expect(arg.name).to.eql(name);
        expect(arg.email).to.eql(email);
        expect(arg.facebook.uid).to.eql(uid);
        expect(arg.facebook.token).to.eql(token);
        expect(arg.facebook.provider).to.eql('facebook');
        expect(result).to.eql(dummyUser);
        done();
      });
    });
  });
});
