var _        = require('lodash'),
    P        = require('bluebird'),
    Booking  = require('../models/booking'),
    bookings = require('../repositories/booking_repository');

function BookingService () {}

_.extend(BookingService.prototype, {
  createBooking: function(user, train) {
    var booking = new Booking({userId: user.id, trainId: train.id});
    if (!booking.isValid()) return P.reject(booking.errors);
    return bookings.put(booking);
  },

  getBookingsForTrains: function(trains) {
    var trainIds = _.map(trains, function(item) { return item.id; });
    return bookings.findAllByTrainId(trainIds);
  }
});

module.exports = new BookingService();
