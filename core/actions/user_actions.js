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
    var fromStation  = stations.findOneById(fromId),
        toStation    = stations.findOneById(toId),
        localTrainsP = trainService.searchAtLocal(fromStation, toStation, departureDate),
        renfeTrainsP = trainService.searchAtRenfe(fromStation, toStation, departureDate);

    return P.join(localTrainsP, renfeTrainsP, function(localTrains, renfeTrains) {
      return bookingService.getBookingsForTrains(localTrains).then(function(bookings) {
        return P.resolve({
          trains: buildTrainsResponse(localTrains, renfeTrains, bookings, currentUserId),
          from: fromStation.toJSON(),
          to: toStation.toJSON()
        });
      });
    });
  }
});

function buildTrainsResponse(localTrains, renfeTrains, bookings, currentUserId) {
  var trainBookings;
  return _.map(renfeTrains, function(item) {
    trainBookings  = filterBookingsForTrain(item, localTrains, bookings);
    item.bookings  = trainBookings.length;
    item.booked    = anyBookingByUser(trainBookings, currentUserId);
    return item;
  });
}

function filterBookingsForTrain(renfeTrain, localTrains, bookings) {
  var savedTrain = findSavedTrain(renfeTrain, localTrains);
  if (!savedTrain) return [];
  return _.filter(bookings, function(booking) {
    return booking.trainId === savedTrain.id;
  });
}

function findSavedTrain(renfeTrain, localTrains) {
  return _.find(localTrains, function(train) {
    return train.name === renfeTrain.name;
  });
}

function anyBookingByUser(bookings, userId) {
  return !!_.find(bookings, function(booking) {
    return booking.userId === userId;
  });
}

module.exports = new UserActions();
