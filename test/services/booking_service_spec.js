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

  describe('#getBookingsForTrains', function() {
    var booking, train1, train2, trains;

    beforeEach(function() {
      train1  = actions.newTrain({id: 1});
      train2  = actions.newTrain({id: 2});
      trains  = [train1, train2];
      booking = actions.newBooking({trainId: train1.id});
      sinon.stub(bookings, "findAllByTrainId").returns(P.resolve([booking]));
    });

    afterEach(function() {
      bookings.findAllByTrainId.restore();
    });

    it("resolves with the results", function(done) {
      service.getBookingsForTrains(trains).then(function(results) {
        expect(results).to.eql([booking]);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it("searchs in the repository with proper parameters", function(done) {
      service.getBookingsForTrains(trains).then(function(results) {
        expect(bookings.findAllByTrainId.called).to.eql(true);
        expect(bookings.findAllByTrainId.getCall(0).args[0]).to.eql([train1.id, train2.id]);
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });
});
