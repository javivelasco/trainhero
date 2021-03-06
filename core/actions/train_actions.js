var _              = require('lodash'),
    P              = require('bluebird'),
    users          = require('../repositories/user_repository'),
    trains         = require('../repositories/train_repository'),
    stations       = require('../repositories/station_repository'),
    trainService   = require('../services/train_service'),
    paymentService = require('../infrastructure/payment_service'),
    bookingService = require('../services/booking_service');

var trainActions = {
  getAllStations: function() {
    return stations.findAll();
  },

  bookTrain: function(currentUserId, trainName, fromId, toId, date, departure, arrival, price, signature) {
    var trainP = trainService.findOrCreateTrain(trainName, fromId, toId, date, departure, arrival, price, signature),
        userP  = users.findOneById(currentUserId);

    return P.join(trainP, userP, function(train, user) {
      return bookingService.bookTrain(user, train);
    });
  },

  searchTrains: function(currentUserId, fromId, toId, departureDate) {
    var fromStation  = stations.findOneById(fromId),
        toStation    = stations.findOneById(toId),
        localTrainsP = trainService.searchAtLocal(fromStation, toStation, departureDate),
        renfeTrainsP = trainService.searchAtRenfe(fromStation, toStation, departureDate);

    return P.join(localTrainsP, renfeTrainsP, function(localTrains, renfeTrains) {
      return P.resolve({
        trains: buildTrainsForSearch(localTrains, renfeTrains, currentUserId),
        from: fromStation.toJSON(),
        to: toStation.toJSON()
      });
    });
  },

  trainsBookedByUser: function(currentUserId) {
    return users.findOneById(currentUserId).then(function(user) {
      return trains.findByBookingUserId(user.id);
    }).then(function(trains) {
      return P.resolve({
        trains: buildTrainsForBookingList(trains, currentUserId)
      });
    });
  },

  chargeBooking: function(currentUserId, trainId, token) {
    var currentUserP = users.findOneById(currentUserId),
        trainP       = trains.findOneByIdAndUserBooking(trainId, currentUserId);

    return P.join(currentUserP, trainP, function(user, train) {
      if (!train)                           return P.reject("Booking not found for user");
      if (bookingIsCharged(train, user.id)) return P.reject("Booking is already charged");
      return paymentService.createBlockedCharge(token, train.price).then(function(chargeId) {
        return bookingService.chargeBooking(train, user, chargeId);
      });
    });
  }
};

function buildTrainsForSearch(localTrains, renfeTrains, currentUserId) {
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

function buildTrainsForBookingList(trains, userId) {
  return _.map(trains, function(train) {
    var item      = train.toJSON();
    item.bookings = item.bookings.length;
    item.status   = getBookingStatus(train.getBookingFor(userId));
    return item;
  });
}

function bookingIsCharged(train, userId) {
  return !!train.getBookingFor(userId).isCharged();
}

function getBookingStatus(booking) {
  if (!booking.isCharged())        return 'UNCONFIRMED';
  if (!booking.isChargeCaptured()) return 'BLOCKED';
  else                             return 'PAID';
}

module.exports = trainActions;
