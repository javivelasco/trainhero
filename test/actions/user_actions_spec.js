var expect         = require('chai').expect,
    sinon          = require('sinon'),
    P              = require('bluebird'),
    actions        = require('../actions'),
    dummies        = require('../dummies'),
    helper         = require('../../core/helper'),
    users          = require('../../core/repositories/user_repository'),
    stations       = require('../../core/repositories/station_repository'),
    trainService   = require('../../core/services/train_service'),
    userActions    = require('../../core/actions/user_actions');

describe("actions/user_actions.js", function() {
  var currentUser, fromStation, toStation, booking, train, signature;

  before(function() {
    currentUser = actions.newUser();
    booking     = actions.newBooking();
    train       = actions.newTrain({bookings: null});
    bookedTrain = actions.newTrain({bookings: [booking]});
    fromStation = actions.newStation({id: 1, code: '1234'});
    toStation   = actions.newStation({id: 2, code: '5678'});
    signature   = helper.signArguments(train.name, train.fromId, train.toId, train.date, train.departure, train.arrival);
  });

  describe("#bookTrain", function() {
    beforeEach(function() {
      sinon.stub(trainService, 'findOrCreateTrain').returns(P.resolve(train));
      sinon.stub(trainService, 'bookTrain').withArgs(currentUser, train).returns(P.resolve(bookedTrain));
      sinon.stub(users, 'findOneById').withArgs(currentUser.id).returns(P.resolve(currentUser));
    });

    afterEach(function() {
      trainService.findOrCreateTrain.restore();
      trainService.bookTrain.restore();
      users.findOneById.restore();
    });

    it("creates the train if it doesn't exists", function(done) {
      userActions.bookTrain(currentUser.id, train.name, train.fromId, train.toId, train.date, train.departure, train.arrival, signature).then(function(result) {
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
         expect(trainService.bookTrain.calledWith(currentUser, train)).to.eql(true);
         done();
      }).catch(function(err) {
        done(err);
      });
    });
  });

  describe("#searchTrains", function() {
    var findStation, date, renfeTrains, localTrains, bookings;

    beforeEach(function() {
      renfeTrains = [actions.newRenfeTrain(), actions.newRenfeTrain({name: 'Other AVE'})];
      localTrains = [actions.newTrain()];
      bookings    = [actions.newBooking()];
      findStation = sinon.stub(stations, 'findOneById');
      findStation.withArgs(fromStation.id).returns(fromStation);
      findStation.withArgs(toStation.id).returns(toStation);
      sinon.stub(trainService,   'searchAtRenfe').returns(P.resolve(renfeTrains));
      sinon.stub(trainService,   'searchAtLocal').returns(P.resolve(localTrains));
      date = '12/03/2015';
    });

    afterEach(function() {
      findStation.restore();
      trainService.searchAtRenfe.restore();
      trainService.searchAtLocal.restore();
    });

    it("retrieves the stations", function(done) {
      userActions.searchTrains(currentUser.id, fromStation.id, toStation.id, date).then(function(results) {
        expect(findStation.withArgs(fromStation.id).calledOnce).to.eql(true);
        expect(findStation.withArgs(toStation.id).calledOnce).to.eql(true);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it("retrieves the trains from Renfe", function(done) {
      userActions.searchTrains(currentUser.id, fromStation.id, toStation.id, date).then(function(results) {
        expect(trainService.searchAtRenfe.calledWith(fromStation, toStation, date)).to.eql(true);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it("retrieves the trains from local", function(done) {
      userActions.searchTrains(currentUser.id, fromStation.id, toStation.id, date).then(function(results) {
        expect(trainService.searchAtLocal.calledWith(fromStation, toStation, date)).to.eql(true);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it("resolves with all information included", function(done) {
      userActions.searchTrains(currentUser.id, fromStation.id, toStation.id, date).then(function(results) {
        expect(results.from).to.eql(fromStation.toJSON());
        expect(results.to).to.eql(toStation.toJSON());
        expect(results.trains[0].name).to.eql(renfeTrains[0].name);
        expect(results.trains[0].booked).to.eql(true);
        expect(results.trains[0].bookings).to.eql(1);
        expect(results.trains[1].name).to.eql(renfeTrains[1].name);
        expect(results.trains[1].booked).to.eql(false);
        expect(results.trains[1].bookings).to.eql(0);
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });
});
