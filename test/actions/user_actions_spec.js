var expect         = require('chai').expect,
    sinon          = require('sinon'),
    P              = require('bluebird'),
    actions        = require('../actions'),
    helper         = require('../../core/helper'),
    users          = require('../../core/repositories/user_repository'),
    stations       = require('../../core/repositories/station_repository'),
    trainService   = require('../../core/services/train_service'),
    bookingService = require('../../core/services/booking_service'),
    userActions    = require('../../core/actions/user_actions');

describe("actions/user_actions.js", function() {
  var currentUser, fromStation, toStation, booking, train, signature;

  before(function() {
    currentUser = actions.newUser();
    train       = actions.newTrain();
    booking     = actions.newBooking();
    fromStation = actions.newStation({id: 1, code: '1234'});
    toStation   = actions.newStation({id: 2, code: '5678'});
    signature   = helper.signArguments(train.name, train.fromId, train.toId, train.date, train.departure, train.arrival);
  });

  describe("bookTrain", function() {
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

  describe("searchTrains", function() {
    var findStation, date, renfeTrains;

    beforeEach(function() {
      renfeTrains = [{renfeTrain: 1}, {renfeTrain: 2}];
      findStation = sinon.stub(stations, 'findOneById');
      findStation.withArgs(fromStation.id).returns(fromStation);
      findStation.withArgs(toStation.id).returns(toStation);
      sinon.stub(trainService, 'search').returns(P.resolve(renfeTrains));
      date = '2014-12-18';
    });

    afterEach(function() {
      findStation.restore();
      trainService.search.restore();
    })

    it("retrieves the stations", function(done) {
      userActions.searchTrains(currentUser.id, fromStation.id, toStation.id, date).then(function(results) {
        expect(findStation.withArgs(fromStation.id).calledOnce).to.eql(true);
        expect(findStation.withArgs(toStation.id).calledOnce).to.eql(true);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it("makes the search in train service", function(done) {
      userActions.searchTrains(currentUser.id, fromStation.id, toStation.id, date).then(function(results) {
        expect(trainService.search.calledWith(fromStation, toStation, date)).to.eql(true);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it("resolves with all information included", function(done) {
      userActions.searchTrains(currentUser.id, fromStation.id, toStation.id, date).then(function(results) {
        expect(results.trains).to.eql(renfeTrains);
        expect(results.from).to.eql(fromStation.toJSON());
        expect(results.to).to.eql(toStation.toJSON());
        done();
      }).catch(function(err) {
        done(err);
      });
    })
  })
});
