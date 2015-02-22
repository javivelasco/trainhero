var expect  = require('chai').expect,
    P       = require('bluebird'),
    sinon   = require('sinon'),
    dummies = require('../../dummies'),
    actions = require('../../actions'),
    stripe  = require('../../../config/stripe'),
    service = require("../../../core/infrastructure/payment_service"),
    sandbox = sinon.sandbox.create();

describe("PaymentService", function() {
  describe("#createBlockedCharge", function() {
    var train       = actions.newTrain(),
        metadata    = { key: 'value' },
        response    = { id:  '12345' },
        token       = 'tokenGivenByStripe',
        description = 'Super payment for user';

    beforeEach(function() {
      sandbox.stub(stripe.charges, 'create').returns(P.resolve(response));
    });

    afterEach(function() {
      sandbox.restore();
    });

    it("calls stripe with the proper parameters", function(done) {
      service.createBlockedCharge(token, train.price, description, metadata).then(function(result) {
        expect(stripe.charges.create.called).to.eql(true);
        expect(stripe.charges.create.getCall(0).args[0].amount).to.eql(train.price * 100)
        expect(stripe.charges.create.getCall(0).args[0].capture).to.eql(false)
        expect(stripe.charges.create.getCall(0).args[0].card).to.eql(token)
        expect(stripe.charges.create.getCall(0).args[0].currency).to.eql('eur')
        expect(stripe.charges.create.getCall(0).args[0].description).to.eql(description)
        expect(stripe.charges.create.getCall(0).args[0].metadata).to.eql(metadata)
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });
});
