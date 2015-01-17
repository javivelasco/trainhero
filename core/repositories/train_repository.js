var MongoRepository = require('./mongo_repository'),
    Train           = require('../models/train');

var TrainRepository = MongoRepository.extend({
  collection: 'trains',
  model: Train,

  findOneByNameAndRoute: function(query) {
    return this.findOneBy({name: query.name, fromId: query.fromId, toId: query.toId, date: query.date});
  }
});

module.exports = new TrainRepository();
