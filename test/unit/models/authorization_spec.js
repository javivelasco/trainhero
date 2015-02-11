var expect  = require('chai').expect,
    actions = require('../../actions'),
    dummies = require('../../dummies'),
		Model   = require('../../../core/models/model'),
    Authorization = require('../../../core/models/authorization');

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

		it("is valid with no token", function() {
			var authorization = actions.newAuthorization({token: null});
			expect(authorization.isValid()).to.eql(true);
		});

		it("is not valid with strange provider", function() {
			var authorization = actions.newAuthorization({provider: 'renfe'});
			expect(authorization.isValid()).to.eql(false);
		});

    it("sets as default facebook as provider", function() {
      var authorization = actions.newAuthorization({provider: null});
      expect(authorization.provider).to.eql('facebook');
      expect(authorization.isValid()).to.eql(true);
    });
	});
});
