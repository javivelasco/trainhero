var expect          = require('chai').expect,
    sinon           = require('sinon'),
    Promise         = require('bluebird').Promise,
    actions         = require('../actions'),
    User            = require('../../core/models/user'),
    MongoRepository = require('../../core/repositories/mongo_repository'),
    repository      = require('../../core/repositories/user_repository');

describe("UserRepository", function() {
  var dummyUser = actions.newUser();

  describe("#constructor", function() {
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

  describe("#findOneByEmail", function() {
    afterEach(function() {
      repository.findOneBy.restore();
    });

    it("finds users by email if the user exists", function(done) {
      sinon.stub(repository, 'findOneBy').withArgs({email: dummyUser.email}).returns(Promise.resolve(dummyUser));
      repository.findOneByEmail(dummyUser.email).then(function(user) {
        expect(user.toJSON()).to.eql(dummyUser.toJSON());
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it("calls the callback with null if user is not found", function(done) {
      sinon.stub(repository, 'findOneBy').withArgs({email: dummyUser.email}).returns(Promise.resolve(null));
      repository.findOneByEmail(dummyUser.email).then(function(result) {
        expect(result).to.eql(null);
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });
});
