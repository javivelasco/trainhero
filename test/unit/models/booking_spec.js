var expect   = require('chai').expect,
    sinon    = require('sinon'),
    moment   = require('moment'),
    actions  = require('../../actions'),
    dummies  = require('../../dummies'),
    Booking  = require('../../../core/models/booking'),
    Model    = require('../../../core/models/model');

describe('models/booking', function() {
  var booking;

  describe("#constructor", function() {
    it("implements a booking model", function() {
      booking = actions.newBooking();
      expect(booking).to.be.an.instanceof(Model);
      expect(booking).to.be.an.instanceof(Booking);
      expect(booking.isValid()).to.be.eql(true);
    });

    it("has the right attributes", function() {
      booking = actions.newBooking();
      expect(booking.toJSON()).to.eql(dummies.dummyBooking());
    });

    it("is not valid with no userId", function() {
      booking = actions.newBooking({userId: undefined});
      expect(booking.isValid()).to.eql(false);
    });

    it("has a createdAt field by default", function() {
      booking = actions.newBooking({createdAt: null});
      expect(booking.isValid()).to.eql(true);
      expect(booking.createdAt).to.be.an.instanceof(Date);
    });

    it("has null paidAt by default", function() {
      booking = actions.newBooking({paidAt: undefined});
      expect(booking.paidAt).to.eql(null);
      expect(booking.isValid()).to.eql(true);
    });

    it("has null chargeId by default", function() {
      booking = actions.newBooking({chargeId: undefined});
      expect(booking.chargeId).to.eql(null);
      expect(booking.isValid()).to.eql(true);
    });

    it("is not valid with invalid paidAt", function() {
      booking = actions.newBooking({paidAt: true});
      expect(booking.isValid()).to.eql(false);
    });
  });

  describe("#setCharge", function() {
    var chargeId = "external_payment_id",
        booking  = actions.newBooking({chargeId: null, paidAt: moment().toDate()});

    it("sets the charge id and paidAt", function() {
      booking.setCharge(chargeId);
      expect(booking.chargeId).to.eql(chargeId);
      expect(booking.paidAt).to.eql(null);
      expect(booking.isValid()).to.eql(true);
    });
  });

  describe("#setChargeCaptured", function() {
    var booking = actions.newBooking({chargeId: 'external_payment_id', paidAt: null});

    it("sets paidAt to the current value", function() {
      var clock = sinon.useFakeTimers();
      booking.setChargeCaptured();
      expect(booking.paidAt).to.eql(moment().toDate());
      expect(booking.isValid()).to.eql(true);
      clock.restore();
    });
  });

  describe("#isCharged", function() {
    it("returns true if the chargeId is set", function() {
      booking = actions.newBooking({chargeId: 'external_payment_id'});
      expect(booking.isCharged()).to.eql(true);
    });

    it("returns false if the chargeId is not set", function() {
      booking = actions.newBooking({chargeId: null});
      expect(booking.isCharged()).to.eql(false);
    });
  });

  describe("#isChargeCaptured", function() {
    it("returns true if the charge is captured", function() {
      booking = actions.newBooking({chargeId: 'external_payment_id', paidAt: moment().toDate()});
      expect(booking.isChargeCaptured()).to.eql(true);
    });

    it("returns false if the charge is unexistent", function() {
      booking = actions.newBooking({chargeId: null, paidAt: null});
      expect(booking.isChargeCaptured()).to.eql(false);
    });

    it("returns false if the charge is not captured", function() {
      booking = actions.newBooking({chargeId: 'external_payment_id', paidAt: null});
      expect(booking.isChargeCaptured()).to.eql(false);
    });
  });
});
