var expect   = require('chai').expect,
    sinon    = require('sinon'),
    moment   = require('moment'),
    actions  = require('../actions'),
    dummies  = require('../dummies'),
    Booking  = require("../../core/models/booking"),
    Model    = require("../../core/models/model");

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

    it("has null paymentId by default", function() {
      booking = actions.newBooking({paymentId: undefined});
      expect(booking.paymentId).to.eql(null);
      expect(booking.isValid()).to.eql(true);
    });

    it("is not valid with invalid paidAt", function() {
      booking = actions.newBooking({paidAt: true});
      expect(booking.isValid()).to.eql(false);
    });
  });

  describe("#setPayment", function() {
    var paymentId;

    before(function() {
      booking = actions.newBooking({paymentId: null, paidAt: null});
      paymentId = "external_payment_id";
    });

    it("sets the payment id", function() {
      var clock = sinon.useFakeTimers();
      booking.setPayment(paymentId);
      expect(booking.paymentId).to.eql(paymentId);
      expect(booking.isValid()).to.eql(true);
      clock.restore();
    });

    it("sets paidAt as the current time", function() {
      booking.setPayment(paymentId);
      expect(booking.paidAt).to.eql(moment().toDate());
      expect(booking.isValid()).to.eql(true);
    });
  });

  describe("#isPaid", function() {
    it("returns true if it has paymentId", function() {
      booking = actions.newBooking();
      expect(booking.isPaid()).to.eql(true);
    });

    it("returns false if it has no paymentId", function() {
      booking = actions.newBooking({paymentId: null});
      expect(booking.isPaid()).to.eql(false);
    });
  });
});
