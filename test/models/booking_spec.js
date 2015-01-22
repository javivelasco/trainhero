var expect  = require('chai').expect,
    actions = require('../actions'),
    dummies = require('../dummies'),
    Booking = require("../../core/models/booking"),
    Model   = require("../../core/models/model");

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

    it("is not valid with no trainId", function() {
      booking = actions.newBooking({trainId: undefined});
      expect(booking.isValid()).to.eql(false);
    });

    it("defaults model id to a composed id", function() {
      booking = actions.newBooking({id: null});
      expect(booking.id).to.eql(booking.userId + '_' + booking.trainId);
      expect(booking.isValid()).to.eql(true);
    })
  });
});
