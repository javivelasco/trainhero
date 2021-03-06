var expect     = require('chai').expect,
    sinon      = require('sinon'),
    P          = require('bluebird'),
    actions    = require('../../actions'),
    testHelper = require('../../test_helper'),
    db         = require('../../../config/mongo').db,
    Train      = require('../../../core/models/train'),
    MongoRepository = require('../../../core/repositories/mongo_repository');

describe("Mongo Repository", function() {
  var repository, timestampedRepository;

  before(function() {
    var TestRepository     = MongoRepository.extend({collection: 'trains', model: Train });
    var TestTimeRepository = MongoRepository.extend({collection: 'trains', model: Train, timestamped: true });
    repository             = new TestRepository();
    timestampedRepository  = new TestTimeRepository();
  });

  describe("#configure", function() {
    it("sets the proper Mongo collection", function() {
      expect(repository._collection).to.eql(db.collection('trains'));
    });

    it("sets the proper model name", function() {
      expect(repository._model).to.eql(Train);
    });

    it("sets the timestamped value", function() {
      expect(timestampedRepository._timestamped).to.eql(true);
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
      sinon.stub(repository, "findOneBy").withArgs({_id: "1"}).returns(P.resolve('example'));
    });

    after(function() {
      repository.findOneBy.restore();
    });

    it("calls properly the find function", function(done) {
      repository.findOneById("1").then(function(result) {
        expect(repository.findOneBy.called).to.eql(true);
        expect(result).to.eql('example');
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });

  describe("#find", function() {
    var findMongo, train;

    beforeEach(function() {
      train = actions.newTrain();
      findMongo    = sinon.stub(repository._collection, 'findAsync');
      storedRecord = { _id: 1, fromId: train.fromId, toId: train.toId, departure: train.departure, arrival: train.arrival};
    });

    afterEach(function() {
      repository._collection.findAsync.restore();
    });

    it("returns an empty array when there are no results", function(done) {
      cursor = testHelper.generateCursorWithResult(0, []);
      findMongo.returns(P.resolve(cursor));
      repository.find({}).then(function(result) {
        expect(result).to.eql([]);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it("returns a list of instances of the model", function(done) {
      cursor = testHelper.generateCursorWithResult(1, [storedRecord]);
      findMongo.returns(P.resolve(cursor));
      repository.find({}).then(function(result) {
        expect(result.length).to.eql(1);
        expect(result[0]).to.be.an.instanceof(Train);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it("gives the proper parameters to the driver", function(done) {
      cursor = testHelper.generateCursorWithResult(0, []);
      findMongo.returns(P.resolve(cursor));
      repository.find({name: 'AVE 127'}).then(function(result) {
        expect(findMongo.called).to.exist();
        expect(findMongo.getCall(0).args[0]).to.eql({name: 'AVE 127'});
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });

  describe("#put", function() {
    var train, findMongo, tFindMongo, insertMongo, tInsertMongo, updateMongo, tUpdateMongo;

    beforeEach(function() {
      train = actions.newTrain();
      findMongo    = sinon.stub(repository._collection, 'findAsync');
      insertMongo  = sinon.stub(repository._collection, 'insertAsync');
      updateMongo  = sinon.stub(repository._collection, 'updateAsync');
      tFindMongo   = sinon.stub(timestampedRepository._collection, 'findAsync');
      tInsertMongo = sinon.stub(timestampedRepository._collection, 'insertAsync');
      tUpdateMongo = sinon.stub(timestampedRepository._collection, 'updateAsync');
      storedRecord = { _id: 1, fromId: train.fromId, toId: train.toId};
    });

    afterEach(function() {
      repository._collection.findAsync.restore();
      repository._collection.insertAsync.restore();
      repository._collection.updateAsync.restore();
      timestampedRepository._collection.findAsync.restore();
      timestampedRepository._collection.insertAsync.restore();
      timestampedRepository._collection.updateAsync.restore();
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

    it("stores timestamps when it is a timestamped repository", function(done) {
      cursor = testHelper.generateCursorWithResult(0);
      train.id = null;
      tFindMongo.returns(P.resolve(cursor));
      tInsertMongo.returns(P.resolve([storedRecord]));

      timestampedRepository.put(train).then(function(result) {
        expect(tInsertMongo.getCall(0).args[0].createdAt).to.exist();
        expect(tInsertMongo.getCall(0).args[0].createdAt).to.be.an.instanceof(Date);
        expect(tInsertMongo.getCall(0).args[0].updatedAt).to.exist();
        expect(tInsertMongo.getCall(0).args[0].updatedAt).to.be.an.instanceof(Date);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it("updates timestamp when it is a timestamped repository", function(done) {
      cursor = testHelper.generateCursorWithResult(1);
      tFindMongo.returns(P.resolve(cursor));
      tUpdateMongo.returns(P.resolve([storedRecord]));

      timestampedRepository.put(train).then(function(result) {
        expect(tUpdateMongo.getCall(0).args[1].$set.createdAt).to.exist();
        expect(tUpdateMongo.getCall(0).args[1].$set.createdAt).to.be.an.instanceof(Date);
        expect(tUpdateMongo.getCall(0).args[1].$set.updatedAt).to.exist();
        expect(tUpdateMongo.getCall(0).args[1].$set.updatedAt).to.be.an.instanceof(Date);
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
