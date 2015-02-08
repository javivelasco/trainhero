var expect   = require('chai').expect,
    dotenv   = require('dotenv').load(),
    fs       = require('fs'),
    sinon    = require('sinon'),
    P        = require('bluebird'),
    moment   = require('moment'),
    request  = require('../../config/request'),
    actions  = require('../actions'),
    dummies  = require('../dummies'),
    helper   = require('../../core/helper'),
    stations = require('../../core/repositories/station_repository'),
    trains   = require('../../core/repositories/train_repository'),
    service  = require('../../core/services/train_service');

describe('TrainService', function() {
  describe('#searchAtRenfe', function() {
    var renfeSearchPage, from, to, date;

    before(function() {
      renfeSearchPage = fs.readFileSync(__dirname + "/../fixtures/renfe_search_results.html", 'UTF8');
      sinon.stub(request, 'get').returns(P.resolve("Renfe main page content"));
      from = actions.newStation({id: 1, code: '1234'});
      to   = actions.newStation({id: 2, code: '5678'});
      date = '12/03/2015';
    });

    after(function() {
      request.get.restore();
    });

    afterEach(function() {
      request.post.restore();
    });

    it("sets an array of trains in the callback when Renfe responds", function(done) {
      sinon.stub(request, 'post').returns(P.resolve(renfeSearchPage));
      service.searchAtRenfe(from, to, date).then(function(trains) {
        expect(trains.length).to.eql(3);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it("parses the trains from the request properly when Renfe responds", function(done) {
      sinon.stub(request, 'post').returns(P.resolve(renfeSearchPage));
      service.searchAtRenfe(from, to, date).then(function(trains) {
        expect(trains[0].name).to.eql("AV City 02262");
        expect(trains[0].departure).to.eql("06:20");
        expect(trains[0].arrival).to.eql("08:27");
        expect(trains[0].price).to.eql("18.80");
        expect(trains[0].signature).to.eql("a25b5900bb7a466ccd479455ad517b3c");
        done();
      });
    });

    it("throws an error when renfe does not respond", function(done) {
      sinon.stub(request, 'post').returns(P.reject("Some error"));
      service.searchAtRenfe(from.id, to.id, date).catch(function(err) {
        expect(err).to.eql("Some error");
        done();
      });
    });
  });

  describe('#allStations', function() {
    it("search for all stations in the repository", function() {
      var service = require('../../core/services/train_service'),
          findAllStations = sinon.spy(stations, 'findAll');
      service.allStations();
      expect(findAllStations.called).to.eql(true);
      stations.findAll.restore();
    });
  });

  describe('#findOrCreateTrain', function() {
    var dummyTrain, dummyTrainTimes, wrongTrain, savedTrain, signature;

    before(function() {
      service         = require('../../core/services/train_service');
      dummyTrain      = actions.newTrain();
      dummyTrainTimes = dummies.dummyTrainTimes();
      savedTrain      = actions.newTrain({id: 4321});
      signature       = helper.signArguments(dummyTrain.name, dummyTrain.fromId, dummyTrain.toId, dummyTrainTimes.departureDateString, dummyTrainTimes.departureHourString, dummyTrainTimes.arrivalHourString);
    });

    beforeEach(function() {
      sinon.stub(trains, 'put').returns(P.resolve(savedTrain));
    });

    afterEach(function() {
      trains.put.restore();
      trains.findOneByNameRouteAndDeparture.restore();
    });

    it("creates a train if signature is valid and did not exist", function(done) {
      sinon.stub(trains, "findOneByNameRouteAndDeparture").returns(P.resolve(null));
      service.findOrCreateTrain(dummyTrain.name, dummyTrain.fromId, dummyTrain.toId, dummyTrainTimes.departureDateString, dummyTrainTimes.departureHourString, dummyTrainTimes.arrivalHourString, signature).then(function(train) {
        expect(train.toJSON()).to.eql(savedTrain.toJSON());
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it("does not create a train if signature is not valid", function(done) {
      sinon.stub(trains, "findOneByNameRouteAndDeparture").withArgs().returns(P.resolve(null));
      service.findOrCreateTrain("Quahog", dummyTrain.fromId, dummyTrain.toId, dummyTrainTimes.departureDateString, dummyTrainTimes.departureHourString, dummyTrainTimes.arrivalHourString, signature).catch(function(err) {
        expect(err).to.eql({signature: "Invalid signature for train data"});
        done();
      });
    });

    it("does not create a train if data is not valid", function(done) {
      var wrongTrain = actions.newTrain({name: undefined});
      var wrongSignature = helper.signArguments(undefined, dummyTrain.fromId, dummyTrain.toId, dummyTrain.date, dummyTrain.departure, dummyTrain.arrival);
      sinon.stub(trains, "findOneByNameRouteAndDeparture").withArgs().returns(P.resolve(null));
      service.findOrCreateTrain(undefined, dummyTrain.fromId, dummyTrain.toId, dummyTrainTimes.departureDateString, dummyTrainTimes.departureHourString, dummyTrainTimes.arrivalHourString, wrongSignature).then(function(train) {
        done(train);
      }).catch(function (err) {
        expect(trains.put.called).to.eql(false);
        done();
      });
    });

    it("does not create a train if it existed", function(done) {
      sinon.stub(trains, "findOneByNameRouteAndDeparture").withArgs({name: dummyTrain.name, fromId: dummyTrain.fromId, toId: dummyTrain.toId, departure: dummyTrain.departure}).returns(P.resolve(dummyTrain));
      service.findOrCreateTrain(dummyTrain.name, dummyTrain.fromId, dummyTrain.toId, dummyTrainTimes.departureDateString, dummyTrainTimes.departureHourString, dummyTrainTimes.arrivalHourString, signature).then(function(train) {
        expect(trains.put.called).to.eql(false);
        expect(train).to.eql(dummyTrain);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it("does not create a train if data is invalid", function(done) {
      sinon.stub(trains, "findOneByNameRouteAndDeparture").returns(P.resolve(null));
      signature = helper.signArguments('', dummyTrain.fromId, dummyTrain.toId, dummyTrainTimes.departureDateString, dummyTrainTimes.departureHourString, dummyTrainTimes.arrivalHourString);
      service.findOrCreateTrain('', dummyTrain.fromId, dummyTrain.toId, dummyTrainTimes.departureDateString, dummyTrainTimes.departureHourString, dummyTrainTimes.arrivalHourString, signature).then(function(train) {
        done(train);
      }).catch(function(err) {
        expect(trains.put.called).to.eql(false);
        expect(err.name).to.exist();
        done();
      });
    });
  });

  describe('#searchAtLocal', function() {
    var from, to, date, dummyTrain;

    beforeEach(function() {
      from       = actions.newStation({id: 1, code: '1234'});
      to         = actions.newStation({id: 2, code: '5678'});
      dummyTrain = actions.newTrain({fromId: from.id, toId: to.id});
      dateString = '12/03/2015';
      date       = helper.renfeDatetimeToDate(dateString);
    });

    afterEach(function() {
      trains.findByRouteAndDeparture.restore();
    });

    it("resolves with empty array if there are no trains", function(done) {
      sinon.stub(trains, "findByRouteAndDeparture").withArgs(from.id, to.id, date).returns(P.resolve([]));
      service.searchAtLocal(from, to, dateString).then(function(result) {
        expect(result).to.eql([]);
        expect(trains.findByRouteAndDeparture.called).to.eql(true);
        done();
      });
    });

    it("resolves with array of trains if there are trains", function(done) {
      sinon.stub(trains, "findByRouteAndDeparture").withArgs(from.id, to.id, date).returns(P.resolve([dummyTrain]));
      service.searchAtLocal(from, to, dateString).then(function(result) {
        expect(result).to.eql([dummyTrain]);
        expect(trains.findByRouteAndDeparture.called).to.eql(true);
        done();
      });
    });
  });

  describe('#bookTrain', function() {
    var dummyUser, dummyTrain, dummyBooking, invalidBooking;

    before(function() {
      dummyUser      = actions.newUser();
      dummyTrain     = actions.newTrain({bookings: null});
      dummyBooking   = actions.newBooking();
      invalidBooking = actions.newBooking({trainId: undefined});
    });

    it("creates a booking", function(done) {
      sinon.stub(trains, "put").returns(P.resolve(dummyBooking));
      service.bookTrain(dummyUser, dummyTrain).then(function(booking) {
        var trainCalled = trains.put.getCall(0).args[0];
        expect(trains.put.called).to.eql(true);
        expect(trainCalled.bookings.length).to.eql(1);
        expect(trainCalled.bookings[0].userId).to.eql(dummyUser.id);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it("does not create a train if booking user id is invalid", function(done) {
      dummyUser.id = null;
      service.bookTrain(dummyUser, dummyTrain).then(function(booking) {
        done(booking);
      }).catch(function(err) {
        expect(err).to.exist();
        done();
      });
    });
  });

  describe('#getBookedByUser', function() {
    var dummyUser, dummyTrain;

    before(function() {
      dummyUser  = actions.newUser();
      dummyTrain = actions.newTrain();
      sinon.stub(trains, 'findByBookingUserId').withArgs(dummyUser.id).returns(P.resolve([dummyTrain]));
    });

    after(function() {
      trains.findByBookingUserId.restore();
    });

    it("returns trains booked by user", function(done) {
      service.getBookedByUser(dummyUser).then(function(result) {
        expect(result).to.eql([dummyTrain]);
        expect(trains.findByBookingUserId.called).to.eql(true);
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });
});
