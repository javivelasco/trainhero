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
  });

	describe('#emailSignup', function() {
    var name = dummies.dummyUser().name,
        email = dummies.dummyUser().email,
        password = dummies.dummyUser().password,
        passwordRepeat = dummies.dummyUser().password;

    afterEach(function() {
      users.findOneByEmail.restore();
    });

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
        token = dummies.dummyAuthorization().token;

    beforeEach(function() {
      dummyUser.facebook = null;
    });

    afterEach(function() {
      users.findOneByFacebookUID.restore();
    });

    it("updates the user authorization when it existed", function(done) {
      sinon.stub(users, "findOneByFacebookUID").returns(Promise.resolve(dummyUser));
      service.facebookConnect(name, email, uid, token).then(function(result) {
        expect(users.findOneByFacebookUID.called).to.exist;
        expect(users.put.getCall(0).args[0].facebook.toJSON()).to.eql(dummies.dummyAuthorization());
        expect(result).to.eql(dummyUser);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it("updates the user authorization when user existed but auth didn't", function(done) {
      sinon.stub(users, "findOneByFacebookUID").returns(Promise.resolve(null));
      sinon.stub(users, "findOneByEmail").returns(Promise.resolve(dummyUser));
      service.facebookConnect(name, email, uid, token).then(function(result) {
        expect(users.put.called).to.eql(true);
        expect(users.put.getCall(0).args[0].facebook.toJSON()).to.eql(dummies.dummyAuthorization());
        expect(result).to.eql(dummyUser);
        done();
      });
      users.findOneByEmail.restore();
    });

    it("creates a new user if he didn't exist by email or uid", function(done) {
      sinon.stub(users, "findOneByFacebookUID").returns(Promise.resolve(null));
      sinon.stub(users, "findOneByEmail").returns(Promise.resolve(null));
      var arg;

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
      users.findOneByEmail.restore();
    });
  });
});
