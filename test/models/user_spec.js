var expect  = require('chai').expect,
		actions = require('../actions'),
		dummies = require('../dummies'),
		User    = require("../../core/models/user"),
		Model   = require("../../core/models/model");

describe("models/user.js", function() {
	describe("#constructor", function() {
		it("implements a user model", function() {
			var user = actions.newUser();
			expect(user).to.be.an.instanceof(Model);
			expect(user).to.be.an.instanceof(User);
			expect(user.isValid()).to.be.eql(true);
		});

		it("has the right attributes", function() {
			var user = actions.newUser();
			expect(user.toJSON()).to.eql(dummies.dummyUser());
		});

		it("is not valid with no email", function() {
			var user = actions.newUser({email: undefined});
			expect(user.isValid()).to.eql(false);
		});

		it("is not valid with invalid email", function() {
			var user = actions.newUser({email: "foo@bar"});
			expect(user.isValid()).to.eql(false);
		});

		it("is not valid with no name", function() {
			var user = actions.newUser({name: null});
			expect(user.isValid()).to.eql(false);
		});
	});
});
