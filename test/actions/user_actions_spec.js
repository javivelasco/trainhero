var expect         = require('chai').expect,
    sinon          = require('sinon'),
    P              = require('bluebird'),
    actions        = require('../actions'),
    helper         = require('../../core/helper'),
    users          = require('../../core/repositories/user_repository'),
    trainService   = require('../../core/services/train_service'),
    bookingService = require('../../core/services/booking_service'),
    userActions    = require('../../core/actions/user_actions');

describe("actions/user_actions.js", function() {
  var currentUser;

  before(function() {
    currentUser = actions.newUser();
    train       = actions.newTrain();
    booking     = actions.newBooking();
    signature   = helper.signArguments(train.name, train.fromId, train.toId, train.date, train.departure, train.arrival);
  });

  beforeEach(function() {
    sinon.stub(trainService, 'findOrCreateTrain').returns(P.resolve(train));
    sinon.stub(users, 'findOneById').withArgs(currentUser.id).returns(P.resolve(currentUser));
    sinon.stub(bookingService, 'createBooking').withArgs(currentUser, train).returns(P.resolve(booking));
  });

  afterEach(function() {
    trainService.findOrCreateTrain.restore();
    bookingService.createBooking.restore();
    users.findOneById.restore();
  });

  describe("bookTrain", function() {
    it("creates the train if it doesn't exists", function(done) {
      userActions.bookTrain(currentUser.id, train.name, train.fromId, train.toId, train.date, train.departure, train.arrival, signature).then(function(booking) {
        expect(trainService.findOrCreateTrain.calledWith(train.name, train.fromId, train.toId, train.date, train.departure, train.arrival, signature)).to.eql(true);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it("searchs for the user", function(done) {
      userActions.bookTrain(currentUser.id, train.name, train.fromId, train.toId, train.date, train.departure, train.arrival, signature).then(function(booking) {
        expect(users.findOneById.calledWith(currentUser.id)).to.eql(true);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it("creates the booking", function(done) {
      userActions.bookTrain(currentUser.id, train.name, train.fromId, train.toId, train.date, train.departure, train.arrival, signature).then(function(booking) {
         expect(bookingService.createBooking.calledWith(currentUser, train)).to.eql(true);
         done();
      }).catch(function(err) {
        done(err);
      });
    });
  });
});
