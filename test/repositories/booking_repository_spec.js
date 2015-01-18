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
  });

  it('has a booking collection', function() {
    expect(repository.collection).to.eql('bookings');
  });

  it('has a Booking model reference', function() {
    expect(repository.model).to.eql(Booking);
  });
});
