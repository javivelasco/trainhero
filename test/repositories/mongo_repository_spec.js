var expect     = require('chai').expect,
    sinon      = require('sinon'),
    Promise    = require('bluebird').Promise,
    db         = require('../../mongo').db,
    actions    = require('../actions'),
    testHelper = require('../helper'),
    Train      = require('../../core/models/train'),
    MongoRepository = require("../../core/repositories/mongo_repository");

describe("Mongo Repository", function() {
  var repository;

  before(function() {
    repository = new (MongoRepository.extend({
      collection: 'trains',
      model: Train
    }));
  });

  describe("#configure", function() {
    it("sets the proper Mongo collection", function() {
      expect(repository._collection).to.eql(db.collection('trains'));
    });

    it("sets the proper model name", function() {
      expect(repository._model).to.eql(Train);
    });
  });

  describe("#find", function() {
    var storedRecord, findMongo;

    beforeEach(function() {
      storedRecord = { _id: 1, from: "Springfield", to: "Quahog"}
      findMongo = sinon.stub(repository._collection, 'findOneAsync');
    });

    afterEach(function() {
      repository._collection.findOneAsync.restore();
    });

    it("returns an instance of the model", function(done) {
      findMongo.returns(Promise.resolve(storedRecord));
      repository.findOneBy({_id: storedRecord['_id']}).then(function(result) {
        expect(result).to.be.an.instanceof(Train);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it("gives the proper parameters to the driver", function(done) {
      findMongo.returns(Promise.resolve(storedRecord));
      repository.findOneBy({email: 'omar@thewire.com'}).then(function() {
        expect(findMongo.getCall(0).args[0]).to.eql({email: 'omar@thewire.com'});
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it("returns null if there are no records", function(done) {
      findMongo.returns(Promise.resolve(null));
      repository.findOneBy({email: 'omar@thewire.com'}).then(function(result) {
        expect(result).to.eql(null);
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });

  describe("#put", function() {
    var train;

    beforeEach(function() {
      train = actions.newTrain();
      findMongo    = sinon.stub(repository._collection, 'findAsync');
      insertMongo  = sinon.stub(repository._collection, 'insertAsync');
      updateMongo  = sinon.stub(repository._collection, 'updateAsync');
      storedRecord = { _id: 1, fromId: train.fromId, toId: train.toId};
    });

    afterEach(function() {
      repository._collection.findAsync.restore();
      repository._collection.insertAsync.restore();
      repository._collection.updateAsync.restore();
    });

    it("stores a new record when there is no id for model", function(done) {
      cursor = testHelper.generateCursorWithResult(0);
      train.id = null;
      findMongo.returns(Promise.resolve(cursor));
      insertMongo.returns(Promise.resolve([storedRecord]));

      repository.put(train).then(function(result) {
        expect(result).to.be.an.instanceof(Train);
        expect(result.id).to.exist;
        expect(result._id).to.not.exist;
        expect(result.fromId).to.eql(train.fromId);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it("stores record when there is an id for model", function(done) {
      cursor = testHelper.generateCursorWithResult(0);
      findMongo.returns(Promise.resolve(cursor));
      insertMongo.returns(Promise.resolve([storedRecord]));

      repository.put(train).then(function(result) {
        expect(result).to.be.an.instanceof(Train);
        expect(result.id).to.exist;
        expect(result.fromId).to.eql(train.fromId);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it("saves changes if the record existed", function(done) {
      cursor = testHelper.generateCursorWithResult(1);
      findMongo.returns(Promise.resolve(cursor));
      updateMongo.returns(Promise.resolve([storedRecord]));

      repository.put(train).then(function(result) {
        expect(result.id).to.exist;
        expect(result.fromId).to.eql(train.fromId);
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });
});
