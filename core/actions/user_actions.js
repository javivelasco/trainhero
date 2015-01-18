var _              = require('lodash'),
    P              = require('bluebird'),
    users          = require('../repositories/user_repository'),
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
  }
});

module.exports = new UserActions();
