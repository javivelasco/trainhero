var MongoRepository = require('./mongo_repository'),
    User            = require('../models/user');

var UserRepository = MongoRepository.extend({
  collection: 'users',
  model: User,

  findOneByEmail: function(email) {
    return this.findOneBy({email: email});
  }
});

module.exports = new UserRepository();
