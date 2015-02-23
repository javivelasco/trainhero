var _        = require('lodash'),
		P        = require('bluebird'),
		Train    = require('../models/train'),
		trains   = require('../repositories/train_repository');

function BookingService () {}

_.extend(BookingService.prototype, {
		bookTrain: function(user, train) {
			train.createBookingFor(user.id);
			if (!train.isValid()) return P.reject(train.errors);
			return trains.put(train);
		},

		chargeBooking: function(train, user, chargeId) {
			var booking = train.getBookingFor(user.id);
			booking.setCharge(chargeId);
			return chargeId ? trains.put(train) : P.reject("Invalid payment data");
		}
});

module.exports = new BookingService();
