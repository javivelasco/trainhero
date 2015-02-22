var expect          = require('chai').expect,
    sinon           = require('sinon'),
    P               = require('bluebird'),
    moment          = require('moment'),
    actions         = require('../../actions'),
    Train           = require('../../../core/models/train'),
    MongoRepository = require('../../../core/repositories/mongo_repository'),
    repository      = require('../../../core/repositories/train_repository');

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
  });

  describe("#findOneByNameRouteAndDeparture", function() {
    var searchParams;

    before(function() {
      searchParams = {
        name:      dummyTrain.name,
        fromId:    dummyTrain.fromId,
        toId:      dummyTrain.toId,
        departure: dummyTrain.departure
      };
    });

    afterEach(function() {
      repository.findOneBy.restore();
    });

    it("finds the train if it exists", function(done) {
      sinon.stub(repository, 'findOneBy').withArgs(searchParams).returns(P.resolve(dummyTrain));
      repository.findOneByNameRouteAndDeparture(searchParams).then(function(train) {
        expect(train.toJSON()).to.eql(dummyTrain.toJSON());
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it("resolves the promise with null if train is not found", function(done) {
      sinon.stub(repository, 'findOneBy').withArgs(searchParams).returns(P.resolve(null));
      repository.findOneByNameRouteAndDeparture(searchParams).then(function(train) {
        expect(train).to.eql(null);
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });

  describe("findByRouteAndDeparture", function(done) {
    var searchParams, searchDate;

    before(function() {
      searchDate = moment("12/03/2015", "DD/MM/YYYY");
      dayAfter   = moment(searchDate.toDate()).add(1, 'days');
      fromId     = '1';
      toId       = '2';
      sinon.stub(repository, 'find').returns(P.resolve([]));
    });

    after(function() {
      repository.find.restore();
    });

    it("performs the proper query", function(done) {
      repository.findByRouteAndDeparture(fromId, toId, searchDate.toDate()).then(function(results) {
        expect(repository.find.called).to.eql(true);
        expect(repository.find.getCall(0).args[0]).to.eql({fromId: fromId, toId: toId, departure: { $gte: searchDate.toDate(), $lt: dayAfter.toDate() }});
        expect(results.length).to.eql(0);
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });

  describe("#findByBookingUserId", function(done) {
    var user;

    before(function() {
      user = actions.newUser();
      sinon.stub(repository, 'find').returns(P.resolve('train results'));
    });

    after(function() {
      repository.find.restore();
    });

    it("performs the proper query", function(done) {
      repository.findByBookingUserId(user.id).then(function(results) {
        expect(repository.find.called).to.eql(true);
        expect(repository.find.getCall(0).args[0]).to.eql({$query: {bookings: {$elemMatch: {userId: user.id}}}, $orderby: {'bookings.createdAt': -1}});
        expect(results).to.eql('train results');
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });

  describe("findOneByIdAndUserBooking", function(done) {
    var user, train;

    before(function() {
      user  = actions.newUser();
      train = actions.newTrain();
      sinon.stub(repository, 'findOneBy').returns(P.resolve('train'));
    });

    after(function() {
      repository.findOneBy.restore();
    });

    it("performs the proper query", function(done) {
      repository.findOneByIdAndUserBooking(train.id, user.id).then(function(results) {
        expect(repository.findOneBy.called).to.eql(true);
        expect(repository.findOneBy.getCall(0).args[0]).to.eql({_id: train.id, bookings: {$elemMatch: {userId: user.id}}});
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });
});
