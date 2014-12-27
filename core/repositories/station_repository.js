var _  = require('lodash'),
    fs = require('fs'),
    Station = require('../models/station');

function StationRepository() {
  this.items = loadStations();
};

_.extend(StationRepository.prototype, {
  findOneById: function(id) {
    return this.items[id];
  },

  findAll: function() {
    return _.map(this.items, function(item) {
      return item;
    });
  }
});

var loadStations = function () {
  var items   = {};
  var fixture = JSON.parse(fs.readFileSync(__dirname + "/../fixtures/stations.json", 'UTF8'));
  fixture.forEach(function(element, index, array) {
    id = Object.keys(items).length;
    items[id] = build(id, element);
  });
  return items;
};

var build = function (id, element) {
  return new Station({
    id:   id,
    name: element.d,
    code: element.c
  });
};

module.exports = new StationRepository();
