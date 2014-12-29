var expect  = require('chai').expect,
    sinon   = require('sinon'),
    dummies = require('../dummies'),
    actions = require('../actions'),
    service = require('../../core/services/user_service'),
    User    = require('../../core/models/user'),
    users   = require('../../core/repositories/user_repository');

describe('UserService', function() {
	describe('#emailSignup', function() {
    var name = dummies.dummyUser().name,
        email = dummies.dummyUser().email,
        password = dummies.dummyUser().password,
        passwordRepeat = dummies.dummyUser().password,
        dummyUser = actions.newUser();

    beforeEach(function() {
      sinon.stub(users, 'put').callsArgWith(1, null, dummyUser)
    });

    afterEach(function() {
      users.put.restore();
      users.findOneByEmail.restore();
    });

		it("creates a user if the user does not exists", function() {
      sinon.stub(users, "findOneByEmail").withArgs(email).callsArgWith(1, null, null);
      service.emailSignup(name, email, password, passwordRepeat, function(err, user) {
        expect(users.put.getCall(0).args[0]).to.be.an.instanceof(User);
        expect(users.put.called).to.eql(true);
        expect(user).to.be.an.instanceof(User);
        expect(user).to.eql(dummyUser);
      });
    });

    it("does not create a user if the user is not valid", function() {
      sinon.stub(users, "findOneByEmail").withArgs(email).callsArgWith(1, null, null);
      service.emailSignup(null, email, password, passwordRepeat, function(err, user) {
        expect(user).to.be.an.instanceof(User);
        expect(users.put.called).to.eql(false);
        expect(err).not.to.eql(null);
      });
    });

		it("does not create a user if the user already exists", function() {
      sinon.stub(users, "findOneByEmail").withArgs(email).callsArgWith(1, null, dummyUser);
      service.emailSignup(name, email, password, passwordRepeat, function(err, user) {
        expect(user).to.eql(null);
        expect(users.put.called).to.eql(false);
        expect(err).not.to.eql(null);
      });
    });

		it("does not create a user if the passwords does not match", function() {
      sinon.stub(users, "findOneByEmail").withArgs(email).callsArgWith(1, null, dummyUser);
      service.emailSignup(name, email, password, 'wrongpassword', function(err, user) {
        expect(user).to.eql(null);
        expect(err).not.to.eql(null);
        expect(users.put.called).to.eql(false);
        expect(users.findOneByEmail.called).to.eql(false);
      });
    });
	});
});
