var _              = require('lodash'),
    P              = require('bluebird'),
    users          = require('../repositories/user_repository'),
    stations       = require('../repositories/station_repository'),
    bookingService = require('../services/booking_service'),
    trainService   = require('../services/train_service');

function UserActions () {}

_.extend(UserActions.prototype, {
  bookTrain: function(currentUserId, trainName, fromId, toId, date, departure, arrival, signature) {
    var trainP = trainService.findOrCreateTrain(trainName, fromId, toId, date, departure, arrival, signature),
        userP  = users.findOneById(currentUserId);
    return P.join(trainP, userP, function(train, user) {
      return bookingService.createBooking(user, train);
    });
  },

  searchTrains: function(currentUserId, fromId, toId, departureDate) {
    var fromStation = stations.findOneById(fromId),
        toStation   = stations.findOneById(toId);

    return trainService.searchAtRenfe(fromStation, toStation, departureDate).then(function(trains) {
      return P.resolve({
        trains: trains,
        from: fromStation.toJSON(),
        to: toStation.toJSON()
      });
    });
  }
});

module.exports = new UserActions();
