var expect  = require('chai').expect,
    actions = require('../actions'),
    dummies = require('../dummies'),
		Model   = require("../../core/models/model"),
    Authorization = require("../../core/models/authorization");

describe("models/authorization.js", function() {
	describe("#constructor", function() {
		it("implements an authorization model", function() {
			var authorization = actions.newAuthorization();
			expect(authorization).to.be.an.instanceof(Model);
			expect(authorization).to.be.an.instanceof(Authorization);
			expect(authorization.isValid()).to.be.eql(true);
		});

		it("has the right attributes", function() {
			var authorization = actions.newAuthorization();
			expect(authorization.toJSON()).to.eql(dummies.dummyAuthorization());
		});

		it("is not valid with no uid", function() {
			var authorization = actions.newAuthorization({uid: null});
			expect(authorization.isValid()).to.eql(false);
		});

		it("is not valid with no token", function() {
			var authorization = actions.newAuthorization({token: null});
			expect(authorization.isValid()).to.eql(false);
		});

		it("is not valid with strange provider", function() {
			var train = actions.newAuthorization({provider: 'renfe'});
			expect(train.isValid()).to.eql(false);
		});
	});
});
