var MongoRepository = require('./mongo_repository'),
    User            = require('../models/user');

var UserRepository = MongoRepository.extend({
  collection: 'users',
  model: User,

  findOneByEmail: function(email) {
    return this.findOneBy({email: email});
  },

  findOneByFacebookUID: function(uid) {
    return this.findOneBy({'facebook.uid': uid})
  }
});

module.exports = new UserRepository();
