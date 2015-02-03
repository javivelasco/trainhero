var _              = require('lodash'),
    P              = require('bluebird'),
    users          = require('../repositories/user_repository'),
    stations       = require('../repositories/station_repository'),
    trainService   = require('../services/train_service');

function UserActions () {}

_.extend(UserActions.prototype, {
  bookTrain: function(currentUserId, trainName, fromId, toId, date, departure, arrival, signature) {
    var trainP = trainService.findOrCreateTrain(trainName, fromId, toId, date, departure, arrival, signature),
        userP  = users.findOneById(currentUserId);

    return P.join(trainP, userP, function(train, user) {
      return trainService.bookTrain(user, train);
    });
  },

  searchTrains: function(currentUserId, fromId, toId, departureDate) {
    var fromStation  = stations.findOneById(fromId),
        toStation    = stations.findOneById(toId),
        localTrainsP = trainService.searchAtLocal(fromStation, toStation, departureDate),
        renfeTrainsP = trainService.searchAtRenfe(fromStation, toStation, departureDate);

    return P.join(localTrainsP, renfeTrainsP, function(localTrains, renfeTrains) {
      return P.resolve({
        trains: buildTrainsResponse(localTrains, renfeTrains, currentUserId),
        from: fromStation.toJSON(),
        to: toStation.toJSON()
      });
    });
  }
});

function buildTrainsResponse(localTrains, renfeTrains, currentUserId) {
  var trainBookings, savedTrain;
  return _.map(renfeTrains, function(item) {
    savedTrain    = findSavedTrain(item, localTrains);
    item.bookings = savedTrain ? savedTrain.bookings.length : 0;
    item.booked   = anyBookingByUser(savedTrain, currentUserId);
    return item;
  });
}

function findSavedTrain(renfeTrain, localTrains) {
  return _.find(localTrains, function(train) {
    return train.name === renfeTrain.name;
  });
}

function anyBookingByUser(savedTrain, userId) {
  if (!savedTrain) return false;
  return !!_.find(savedTrain.bookings, function(booking) {
    return booking.userId === userId;
  });
}

module.exports = new UserActions();
