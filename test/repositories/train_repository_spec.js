var expect          = require('chai').expect,
    sinon           = require('sinon'),
    P               = require('bluebird'),
    actions         = require('../actions'),
    Train           = require('../../core/models/train'),
    MongoRepository = require('../../core/repositories/mongo_repository'),
    repository      = require('../../core/repositories/train_repository');

describe("TrainRepository", function() {
  var dummyTrain = actions.newTrain();

  describe("#constructor", function() {
    it('is a mongo repository', function() {
      expect(repository).to.be.an.instanceof(MongoRepository);
    });

    it('has a train collection', function() {
      expect(repository.collection).to.eql('trains');
    });

    it('has a Train model reference', function() {
      expect(repository.model).to.eql(Train);
    });
  }),

  describe("#findOneByNameAndRoute", function() {
    var searchParams;

    before(function() {
      searchParams = {
        name:   dummyTrain.name,
        fromId: dummyTrain.fromId,
        toId:   dummyTrain.toId
      };
    });

    afterEach(function() {
      repository.findOneBy.restore();
    });

    it("finds the train if it exists", function(done) {
      sinon.stub(repository, 'findOneBy').withArgs(searchParams).returns(P.resolve(dummyTrain));
      repository.findOneByNameAndRoute(searchParams).then(function(train) {
        expect(train.toJSON()).to.eql(dummyTrain.toJSON());
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it("resolves the promise with null if train is not found", function(done) {
      sinon.stub(repository, 'findOneBy').withArgs(searchParams).returns(P.resolve(null));
      repository.findOneByNameAndRoute(searchParams).then(function(train) {
        expect(train).to.eql(null);
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });
});
