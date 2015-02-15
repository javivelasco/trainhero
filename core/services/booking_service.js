var _        = require('lodash'),
		cheerio  = require('cheerio'),
		P        = require('bluebird'),
		moment   = require('moment'),
		request  = require('../../config/request'),
		helper   = require('../helper'),
		Train    = require('../models/train'),
		stations = require('../repositories/station_repository'),
		trains   = require('../repositories/train_repository');

function BookingService () {}

_.extend(BookingService.prototype, {
		bookTrain: function(user, train) {
			train.createBookingFor(user.id);
			if (!train.isValid()) return P.reject(train.errors);
			return trains.put(train);
		},

		getTrainsBookedByUser: function(user) {
			return trains.findByBookingUserId(user.id);
		},

		setBookingCharge: function(train, user, chargeId) {
			var booking = train.getBookingFor(user.id);
			booking.setCharge(chargeId);
			return chargeId ? trains.put(train) : P.reject("Invalid payment data");
		}
});

// Export module
module.exports = new BookingService();
