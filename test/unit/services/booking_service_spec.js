var expect   = require('chai').expect,
		dotenv   = require('dotenv').load(),
		fs       = require('fs'),
		sinon    = require('sinon'),
		P        = require('bluebird'),
		moment   = require('moment'),
		request  = require('../../../config/request'),
		actions  = require('../../actions'),
		dummies  = require('../../dummies'),
		helper   = require('../../../core/helper'),
		stations = require('../../../core/repositories/station_repository'),
		trains   = require('../../../core/repositories/train_repository'),
		service  = require('../../../core/services/booking_service');

describe('BookingService', function() {
	describe('#bookTrain', function() {
		var dummyUser, dummyTrain, dummyBooking, invalidBooking;

		before(function() {
			dummyUser      = actions.newUser();
			dummyTrain     = actions.newTrain({bookings: null});
			dummyBooking   = actions.newBooking();
			invalidBooking = actions.newBooking({trainId: undefined});
		});

		it("creates a booking", function(done) {
			sinon.stub(trains, "put").returns(P.resolve(dummyBooking));
			service.bookTrain(dummyUser, dummyTrain).then(function(booking) {
				var trainCalled = trains.put.getCall(0).args[0];
				expect(trains.put.called).to.eql(true);
				expect(trainCalled.bookings.length).to.eql(1);
				expect(trainCalled.bookings[0].userId).to.eql(dummyUser.id);
				done();
				trains.put.restore();
			}).catch(function(err) {
				done(err);
			});
		});

		it("does not create a train if booking user id is invalid", function(done) {
			dummyUser.id = null;
			service.bookTrain(dummyUser, dummyTrain).then(function(booking) {
				done(booking);
			}).catch(function(err) {
				expect(err).to.exist();
				done();
			});
		});
	});

	describe('#setBookingCharge', function() {
		var dummyTrain, dummyUser, chargeId;

		beforeEach(function() {
			dummyTrain = actions.newTrain({bookings: []});
			dummyUser  = actions.newUser();
			chargeId  = "chargeIdtreturnedbystripe";
			dummyTrain.createBookingFor(dummyUser.id);
			sinon.stub(trains, 'put').returns(P.resolve('train saved'));
		});

		afterEach(function() {
			trains.put.restore();
		});

		it("set the booking as paid in the repository", function(done) {
			service.setBookingCharge(dummyTrain, dummyUser, chargeId).then(function() {
				expect(trains.put.called).to.eql(true);
				expect(trains.put.getCall(0).args[0].getBookingFor(dummyUser.id).chargeId).to.eql(chargeId);
				expect(trains.put.getCall(0).args[0].getBookingFor(dummyUser.id).paidAt).to.eql(null);
				done();
			}).catch(function(err) {
				done(err);
			});
		});

		it("rejects the promise if payment data is invalid", function(done) {
			service.setBookingCharge(dummyTrain, dummyUser, null).then(function(result) {
				done(result);
			}).catch(function(err) {
				expect(trains.put.called).to.eql(false);
				done();
			});
		});
	});
});
