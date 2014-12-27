var MongoRepository = require('./mongo_repository'),
    Train = require('../models/train');

var TrainRepository = MongoRepository.extend({
  collection: 'trains',
  model: Train
});

module.exports = new TrainRepository();
