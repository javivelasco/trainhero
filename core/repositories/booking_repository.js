var MongoRepository = require('./mongo_repository'),
    Booking         = require('../models/booking');

var BookingRepository = MongoRepository.extend({
  collection: 'bookings',
  model: Booking
});

module.exports = new BookingRepository();
