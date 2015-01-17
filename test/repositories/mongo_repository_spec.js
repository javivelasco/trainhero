var expect     = require('chai').expect,
    sinon      = require('sinon'),
    mongoskin  = require('mongoskin'),
    P          = require('bluebird'),
    db         = require('../../config/mongo').db,
    actions    = require('../actions'),
    testHelper = require('../helper'),
    Train      = require('../../core/models/train'),
    MongoRepository = require("../../core/repositories/mongo_repository");

describe("Mongo Repository", function() {
  var repository;

  before(function() {
    var TestRepository = MongoRepository.extend({
      collection: 'trains',
      model: Train
    });
    repository = new TestRepository();
  });

  describe("#configure", function() {
    it("sets the proper Mongo collection", function() {
      expect(repository._collection).to.eql(db.collection('trains'));
    });

    it("sets the proper model name", function() {
      expect(repository._model).to.eql(Train);
    });
  });

  describe("#findOneBy", function() {
    var storedRecord, findMongo;

    beforeEach(function() {
      storedRecord = { _id: 1, from: "Springfield", to: "Quahog"};
      findMongo = sinon.stub(repository._collection, 'findOneAsync');
    });

    afterEach(function() {
      repository._collection.findOneAsync.restore();
    });

    it("returns an instance of the model", function(done) {
      findMongo.returns(P.resolve(storedRecord));
      repository.findOneBy({_id: storedRecord._id}).then(function(result) {
        expect(result).to.be.an.instanceof(Train);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it("gives the proper parameters to the driver", function(done) {
      findMongo.returns(P.resolve(storedRecord));
      repository.findOneBy({email: 'omar@thewire.com'}).then(function() {
        expect(findMongo.getCall(0).args[0]).to.eql({email: 'omar@thewire.com'});
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it("returns null if there are no records", function(done) {
      findMongo.returns(P.resolve(null));
      repository.findOneBy({email: 'omar@thewire.com'}).then(function(result) {
        expect(result).to.eql(null);
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });

  describe("#findOneById", function() {
    before(function() {
      sinon.stub(mongoskin, "ObjectID").returns("object_id");
      sinon.stub(repository, "findOneBy")
           .withArgs({_id: "object_id"})
           .returns(P.resolve('example'));
    });

    after(function() {
      repository.findOneBy.restore();
    });

    it("calls properly the find function", function(done) {
      repository.findOneById(1).then(function(result) {
        expect(repository.findOneBy.called).to.eql(true);
        expect(result).to.eql('example');
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
      findMongo.returns(P.resolve(cursor));
      insertMongo.returns(P.resolve([storedRecord]));

      repository.put(train).then(function(result) {
        expect(result).to.be.an.instanceof(Train);
        expect(result.id).to.exist();
        expect(result._id).to.not.exist();
        expect(result.fromId).to.eql(train.fromId);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it("stores record when there is an id for model", function(done) {
      cursor = testHelper.generateCursorWithResult(0);
      findMongo.returns(P.resolve(cursor));
      insertMongo.returns(P.resolve([storedRecord]));

      repository.put(train).then(function(result) {
        expect(result).to.be.an.instanceof(Train);
        expect(result.id).to.exist();
        expect(result.fromId).to.eql(train.fromId);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it("saves changes if the record existed", function(done) {
      cursor = testHelper.generateCursorWithResult(1);
      findMongo.returns(P.resolve(cursor));
      updateMongo.returns(P.resolve([storedRecord]));

      repository.put(train).then(function(result) {
        expect(result.id).to.exist();
        expect(result.fromId).to.eql(train.fromId);
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });

  describe("#clear", function() {
    it("clears the collection", function(done) {
      sinon.stub(repository._collection, 'removeAsync').returns(P.resolve('done'));
      repository.clear().then(function(result) {
        expect(result).to.eql('done');
        expect(repository._collection.removeAsync.called).to.eql(true);
        done();
        repository._collection.removeAsync.restore();
      });
    });
  });
});
