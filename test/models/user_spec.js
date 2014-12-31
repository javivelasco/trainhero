var expect  = require('chai').expect,
		bcrypt  = require('bcrypt-nodejs'),
		sinon   = require('sinon'),
		actions = require('../actions'),
		dummies = require('../dummies'),
		User    = require("../../core/models/user"),
		Model   = require("../../core/models/model"),
		Authorization = require("../../core/models/authorization");

describe("models/user.js", function() {
	var user;

	describe("#constructor", function() {
		it("implements a user model", function() {
			user = actions.newUser();
			expect(user).to.be.an.instanceof(Model);
			expect(user).to.be.an.instanceof(User);
			expect(user.isValid()).to.be.eql(true);
		});

		it("has the right attributes", function() {
			user = actions.newUser();
			expect(user.toJSON()).to.eql(dummies.dummyUser());
			expect(user.facebook).to.be.an.instanceof(Authorization);
		});

		it("is not valid with no email", function() {
			user = actions.newUser({email: undefined});
			expect(user.isValid()).to.eql(false);
		});

		it("is not valid with invalid email", function() {
			user = actions.newUser({email: "foo@bar"});
			expect(user.isValid()).to.eql(false);
		});

		it("is not valid with no name", function() {
			user = actions.newUser({name: null});
			expect(user.isValid()).to.eql(false);
		});
	});

	describe("#generateHash", function() {
		before(function() {
			sinon.stub(bcrypt, 'hashSync').withArgs('password').returns('encrypted');
		});

		after(function() {
			bcrypt.hashSync.restore();
		});

		it("calls bcrypt with proper arguments", function() {
			user = actions.newUser();
			expect(user.generateHash('password')).to.eql('encrypted');
		});
	});

	describe("#validPassword", function() {
		var password;

		before(function() {
			password = 'mysuperpassword';
			user = actions.newUser();
			user.password = user.generateHash(password);
			sinon.spy(bcrypt, "compareSync");
		});

		after(function() {
			bcrypt.compareSync.restore();
		});

		it("returns true if the password is correct", function() {
			expect(user.validPassword(password)).to.eql(true);
		});

		it("returns false if the password is not correct", function() {
			expect(user.validPassword('other')).to.eql(false);
		});

		it("calls bcrypt with proper arguments", function() {
			expect(bcrypt.compareSync.called).to.eql(true);
		});
	});
});
