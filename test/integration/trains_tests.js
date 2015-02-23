var expect         = require('chai').expect,
    sinon          = require('sinon'),
    fs             = require('fs'),
    P              = require('bluebird'),
    actions        = require('../actions'),
    request        = require('../../config/request'),
    users          = require('../../core/repositories/user_repository'),
    trains         = require('../../core/repositories/train_repository'),
    stations       = require('../../core/repositories/station_repository'),
    paymentService = require('../../core/infrastructure/payment_service'),
    trainActions   = require('../../core/actions/train_actions'),
    sandbox        = sinon.sandbox.create();

describe("Booking trains", function() {
  var renfeSearchPage = fs.readFileSync(__dirname + "/../fixtures/renfe_search_results.html", 'UTF8'),
      madridStation   = stations.findOneById(1179),
      cordobaStation  = stations.findOneById(590),
      currentUser     = actions.newUser(),
      otherUser       = actions.newUser({id: "u2"}),
      trainName       = 'AV City 02262',
      date            = '19/12/2014',
      stripeToken     = 'abscfs2312easda1232gr5',
      searchedTrain   = null;

  beforeEach(function(done) {
    sandbox.stub(request, 'get').returns(P.resolve("Renfe main page content"));
    sandbox.stub(request, 'post').returns(P.resolve(renfeSearchPage));
    users.put(currentUser).then(function(user) {
      return users.put(otherUser);
    }).then(function() {
      done();
    });
  });

  afterEach(function() {
    sandbox.restore();
    users.clear();
    trains.clear();
  });

  it("creates a booking when there are no other bookings", function(done) {
    trainActions.searchTrains(currentUser.id, madridStation.id, cordobaStation.id, date).then(function(results) {
      searchedTrain = results.trains[0];
      trainActions.bookTrain(currentUser.id, searchedTrain.name, madridStation.id, cordobaStation.id, date, searchedTrain.departure, searchedTrain.arrival, searchedTrain.price, searchedTrain.signature).then(function(result) {
        expect(result.id).to.exist();
        expect(result.name).to.eql(searchedTrain.name);
        expect(result.fromId).to.eql(madridStation.id);
        expect(result.toId).to.eql(cordobaStation.id);
        expect(result.departure).to.be.an.instanceof(Date);
        expect(result.arrival).to.be.an.instanceof(Date);
        expect(result.bookings.length).to.eql(1);
        done();
      });
    });
  });

  it("includes information of bookings in search results", function(done) {
    train = actions.newTrain({name: trainName, fromId: madridStation.id, toId: cordobaStation.id, bookings: []});
    train.createBookingFor(currentUser.id);
    train.createBookingFor(otherUser.id);
    trains.put(train).then(function() {
      trainActions.searchTrains(currentUser.id, madridStation.id, cordobaStation.id, date).then(function(results) {
        searchedTrain = results.trains[0];
        expect(searchedTrain.bookings).to.eql(2);
        expect(searchedTrain.booked).to.eql(true);
        done();
      });
    });
  });

  it("get trains booked by a user", function(done) {
    train = actions.newTrain({name: trainName, fromId: madridStation.id, toId: cordobaStation.id, bookings: []});
    train.createBookingFor(currentUser.id);
    train.createBookingFor(otherUser.id);
    trains.put(train).then(function() {
      trainActions.trainsBookedByUser(currentUser.id).then(function(results) {
        expect(results.trains.length).to.eql(1);
        expect(results.trains[0].bookings).to.eql(2);
        done();
      });
    });
  });

  it("creates a blocked charge for user", function(done) {
    sandbox.stub(paymentService, 'createBlockedCharge').returns(P.resolve('abcde'));
    train = actions.newTrain({name: trainName, fromId: madridStation.id, toId: cordobaStation.id, bookings: []});
    train.createBookingFor(currentUser.id);
    train.createBookingFor(otherUser.id);
    trains.put(train).then(function(savedTrain) {
      trainActions.chargeBooking(currentUser.id, train.id, stripeToken).then(function(result) {
        expect(result.getBookingFor(currentUser.id).chargeId).to.eql('abcde');
        expect(result.getBookingFor(currentUser.id).paidAt).to.eql(null);
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });
});
