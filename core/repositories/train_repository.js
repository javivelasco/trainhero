var moment          = require('moment'),
    MongoRepository = require('./mongo_repository'),
    Train           = require('../models/train');

var TrainRepository = MongoRepository.extend({
  collection: 'trains',
  model: Train,

  findOneByNameRouteAndDeparture: function(query) {
    return this.findOneBy({name: query.name, fromId: query.fromId, toId: query.toId, departure: query.departure});
  },

  findByRouteAndDeparture: function(fromId, toId, departure) {
    var dayAfterDeparture = moment(departure).add(1, 'days').toDate();
    return this.find({fromId: fromId, toId: toId, departure: { $gte: departure, $lt: dayAfterDeparture}});
  },

  findByBookingUserId: function(userId) {
    return this.find({$query: {bookings: {$elemMatch: {userId: userId}}}, $orderby: {'bookings.createdAt': -1}});
  }
});

module.exports = new TrainRepository();
