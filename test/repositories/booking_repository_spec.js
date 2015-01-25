var expect          = require('chai').expect,
    sinon           = require('sinon'),
    P               = require('bluebird'),
    actions         = require('../actions'),
    Booking         = require('../../core/models/booking'),
    MongoRepository = require('../../core/repositories/mongo_repository'),
    repository      = require('../../core/repositories/booking_repository');

describe("repositories/booking_repository", function() {
  var dummyBooking;

  describe("#constructor", function() {
    it('is a mongo repository', function() {
      expect(repository).to.be.an.instanceof(MongoRepository);
    });

    it('has a booking collection', function() {
      expect(repository.collection).to.eql('bookings');
    });

    it('has a Booking model reference', function() {
      expect(repository.model).to.eql(Booking);
    });
  });

  describe("#findAllByTrainId", function() {
    var booking, trainIds;

    before(function() {
      booking  = actions.newBooking();
      trainIds = [1, 2, 3];
      sinon.stub(repository, "find").returns(P.resolve([booking]));
    });

    it("performs the proper query", function(done) {
      repository.findAllByTrainId(trainIds).then(function(results) {
        expect(repository.find.called).to.eql(true);
        expect(repository.find.getCall(0).args[0]).to.eql({trainId: {$in: trainIds}});
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it("resolves the promise with the results", function(done) {
      repository.findAllByTrainId(trainIds).then(function(results) {
        expect(results).to.eql([booking]);
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });
});
