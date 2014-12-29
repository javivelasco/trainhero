var MongoRepository = require('./mongo_repository'),
    User            = require('../models/user');

var UserRepository = MongoRepository.extend({
  collection: 'users',
  model: User,

  findOneByEmail: function(email, cb) {
    this.findOneBy({email: email}, cb);
  }
});

module.exports = new UserRepository();
