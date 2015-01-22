var MongoRepository = require('./mongo_repository'),
    Train           = require('../models/train');

var TrainRepository = MongoRepository.extend({
  collection: 'trains',
  model: Train,

  findOneByNameRouteAndDeparture: function(query) {
    return this.findOneBy({name: query.name, fromId: query.fromId, toId: query.toId, departure: query.departure});
  }
});

module.exports = new TrainRepository();
