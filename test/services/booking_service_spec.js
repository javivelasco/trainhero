var expect   = require('chai').expect,
    sinon    = require('sinon'),
    P        = require('bluebird'),
    actions  = require('../actions'),
    bookings = require('../../core/repositories/booking_repository'),
    service  = require('../../core/services/booking_service');

describe('BookingService', function() {
  describe("#createBooking", function() {
    var dummyUser, dummyTrain, dummyBooking, invalidBooking;

    before(function() {
      dummyUser    = actions.newUser();
      dummyTrain   = actions.newUser();
      dummyBooking = actions.newBooking();
      invalidBooking = actions.newBooking({trainId: undefined});
    });

    it("creates a booking", function(done) {
      sinon.stub(bookings, "put").returns(P.resolve(dummyBooking));
      service.createBooking(dummyUser, dummyTrain).then(function(booking) {
        expect(booking.id).to.exist();
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it("does not create a booking if it is not valid", function(done) {
      dummyTrain.id = undefined;
      service.createBooking(dummyUser, dummyTrain).catch(function(err) {
        expect(err).to.eql(invalidBooking.errors);
        done();
      });
    });
  });
});
