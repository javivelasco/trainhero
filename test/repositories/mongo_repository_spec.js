var expect = require('chai').expect,
    sinon  = require('sinon'),
    db     = require('../../mongo').db,
    Train  = require('../../core/models/train'),
    MongoRepository = require("../../core/repositories/mongo_repository");

describe("Mongo Repository", function() {
  var repository;

  before(function() {
    repository = new (MongoRepository.extend({
      collection: 'trips',
      model: Train
    }));
  });

  describe("#configure", function() {
    it("sets the proper Mongo collection", function() {
      expect(repository._collection).to.eql(db.collection('trips'));
    });

    it("sets the proper model name", function() {
      expect(repository._model).to.eql(Train);
    });
  });

  describe("#find", function() {
    var storedRecord, findMongo;

    before(function() {
      storedRecord = { _id: 1, from: "Springfield", to: "Quahog"}
      findMongo = sinon.stub(repository._collection, 'findOne');
    });

    after(function() {
      repository._collection.findOne.restore();
    });

    it("handles an Mongo find error", function(done) {
      findMongo.callsArgWith(1, {}, null);

      repository.findOneById(12, function(err, result) {
        expect(err).to.exist;
        done();
      });
    });

    it("returns null if there is no result", function(done) {
      findMongo.callsArgWith(1, null, null);

      repository.findOneById(12, function(err, result) {
        expect(result).to.eql(null);
        done();
      });
    });

    it("finds existent record if exists", function(done) {
      findMongo.callsArgWith(1, null, storedRecord);

      repository.findOneById(storedRecord['_id'], function(err, result) {
        expect(result.id).to.eql(1);
        done();
      });
    });

    it("returns an instance of the model", function(done) {
      findMongo.callsArgWith(1, null, storedRecord);

      repository.findOneById(storedRecord['_id'], function(err, result) {
        expect(result).to.be.an.instanceof(Train);
        done();
      });
    })
  });

  describe("#put", function() {
    var train, cursor, storedRecord, findMongo, insertMongo, updateMongo;

    before(function() {
      train = new Train({from: "Springfield", to: "Quahog"});
      findMongo   = sinon.stub(repository._collection, 'find');
      insertMongo = sinon.stub(repository._collection, 'insert');
      updateMongo = sinon.stub(repository._collection, 'update');
    });

    after(function() {
      repository._collection.find.restore();
      repository._collection.insert.restore();
      repository._collection.update.restore();
    });

    it("returns an instance of model", function(done) {
      storedRecord = { _id: 1, from: "Springfield", to: "Quahog"};
      cursor = { count: function(cb) { cb(null, 0); } };
      findMongo.callsArgWith(1, null, cursor);
      insertMongo.callsArgWith(1, null, [storedRecord])

      repository.put(train, function(err, result) {
        expect(result).to.be.an.instanceof(Train);
        done();
      });
    });

    it("stores a new record when there is no id for model", function(done) {
      cursor = { count: function(cb) { cb(null, 0); } };
      storedRecord = { _id: 1, from: "Springfield", to: "Quahog"};
      findMongo.callsArgWith(1, null, cursor);
      insertMongo.callsArgWith(1, null, [storedRecord])

      repository.put(train, function(err, result) {
        expect(result.id).to.exist;
        expect(result.from).to.eql(train.from);
        done();
      });
    });

    it("stores a new record when there is id for model", function(done) {
      cursor = { count: function(cb) { cb(null, 0); } };
      storedRecord = { _id: 1, from: "Springfield", to: "Quahog"};
      findMongo.callsArgWith(1, null, cursor);
      insertMongo.callsArgWith(1, null, [storedRecord])
      train.id = 1;

      repository.put(train, function(err, result) {
        expect(result.id).to.exist;
        expect(result.from).to.eql(train.from);
        done();
      });
    });

    it("saves changes if the record existed", function(done) {
      cursor = { count: function(cb) { cb(null, 1); } };
      storedRecord = { _id: 1, from: "Springfield", to: "Quahog"};
      findMongo.callsArgWith(1, null, cursor);
      updateMongo.callsArgWith(2, null, 1, storedRecord)
      train.id = 1;

      repository.put(train, function(err, result) {
        expect(result.id).to.exist;
        expect(result.from).to.eql(train.from);
        done();
      });
    });

    it("handles a Mongo find error", function(done) {
      findMongo.callsArgWith(1, {}, null);

      repository.put(train, function(err, result) {
        expect(err).to.exist;
        done();
      });
    });

    it("handles a Mongo cursor error", function(done) {
      cursor = { count: function(cb) { cb({}, null); } };
      findMongo.callsArgWith(1, null, cursor);

      repository.put(train, function(err, result) {
        expect(err).to.exist;
        done();
      });
    });

    it("handles a Mongo insert error", function(done) {
      cursor = { count: function(cb) { cb(null, 0); } };
      findMongo.callsArgWith(1, null, cursor);
      insertMongo.callsArgWith(1, {}, null)

      repository.put(train, function(err, result) {
        expect(err).to.exist;
        done();
      });
    });

    it("handles a Mongo update error", function(done) {
      cursor = { count: function(cb) { cb(null, 1); } };
      findMongo.callsArgWith(1, null, cursor);
      updateMongo.callsArgWith(2, {}, null)

      repository.put(train, function(err, result) {
        expect(err).to.exist;
        done();
      });
    });
  });
});
