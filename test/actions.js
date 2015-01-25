var _       = require("lodash"),
    dummies = require("./dummies"),
    Station = require("../core/models/station"),
    Train   = require("../core/models/train"),
    User    = require("../core/models/user"),
    Booking = require("../core/models/booking"),
    Authorization = require("../core/models/authorization");

var Actions = function() {};

_.extend(Actions.prototype, {
  newStation: function(args) {
    return new Station(_.extend(dummies.dummyStation(), args));
  },

  newTrain: function(args) {
    return new Train(_.extend(dummies.dummyTrain(), args));
  },

  newRenfeTrain: function(args) {
    return _.extend(dummies.dummyTrain(), args);
  },

  newUser: function(args) {
    return new User(_.extend(dummies.dummyUser(), args));
  },

  newAuthorization: function(args) {
    return new Authorization(_.extend(dummies.dummyAuthorization(), args));
  },

  newBooking: function(args) {
    return new Booking(_.extend(dummies.dummyBooking(), args));
  }
});

module.exports = new Actions();
