var MongoRepository = require('./mongo_repository'),
    User            = require('../models/user');

var UserRepository = MongoRepository.extend({
  collection: 'users',
  model: User
});

module.exports = new UserRepository();
