var MongoRepository = require('./mongo_repository'),
    Booking         = require('../models/booking');

var BookingRepository = MongoRepository.extend({
  collection: 'bookings',
  model: Booking,

  findAllByTrainId: function(trainIds) {
    return this.find({trainId: {$in: trainIds}})
  }
});

module.exports = new BookingRepository();
