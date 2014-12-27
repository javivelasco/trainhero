var _       = require("lodash"),
    dummies = require("./dummies"),
    Station = require("../core/models/station"),
    Train   = require("../core/models/train");

var Actions = function() {};

_.extend(Actions.prototype, {
  newStation: function(args) {
    return new Station(_.extend(dummies.dummyStation(), args));
  },

  newTrain: function(args) {
    return new Train(_.extend(dummies.dummyTrain(), args));
  }
});

module.exports = new Actions();
