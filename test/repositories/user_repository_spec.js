var expect          = require('chai').expect,
    User            = require('../../core/models/user'),
    MongoRepository = require('../../core/repositories/mongo_repository'),
    repository      = require('../../core/repositories/user_repository');

describe("UserRepository", function() {
  it('is a mongo repository', function() {
    expect(repository).to.be.an.instanceof(MongoRepository);
  });

  it('has a user collection', function() {
    expect(repository.collection).to.eql('users')
  });

  it('has a User model reference', function() {
    expect(repository.model).to.eql(User);
  });
});
