var expect   = require('chai').expect,
    dotenv   = require('dotenv').load(),
    fs       = require('fs'),
    sinon    = require('sinon'),
    P        = require('bluebird'),
    actions  = require('../../actions'),
    dummies  = require('../../dummies'),
    helper   = require('../../../core/helper'),
    request  = require('../../../config/request'),
    trains   = require('../../../core/repositories/train_repository'),
    service  = require('../../../core/services/train_service');

describe('TrainService', function() {
  describe('#searchAtRenfe', function() {
    var renfeSearchPage, from, to, date;

    before(function() {
      renfeSearchPage = fs.readFileSync(__dirname + "/../../fixtures/renfe_search_results.html", 'UTF8');
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
        expect(trains[0].signature).to.eql("4fae4588c27633385a38f1f11a06d2af");
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

  describe('#findOrCreateTrain', function() {
    var dummyTrain, dummyTrainTimes, wrongTrain, savedTrain, signature;

    before(function() {
      service         = require('../../../core/services/train_service');
      dummyTrain      = actions.newTrain();
      dummyTrainPrice = actions.newTrain({price: 32.30});
      dummyTrainTimes = dummies.dummyTrainTimes();
      savedTrain      = actions.newTrain({id: 4321});
      signature       = helper.signArguments(dummyTrain.name, dummyTrain.fromId, dummyTrain.toId, dummyTrainTimes.departureDateString, dummyTrainTimes.departureHourString, dummyTrainTimes.arrivalHourString, dummyTrain.price);
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
      service.findOrCreateTrain(dummyTrain.name, dummyTrain.fromId, dummyTrain.toId, dummyTrainTimes.departureDateString, dummyTrainTimes.departureHourString, dummyTrainTimes.arrivalHourString, dummyTrain.price, signature).then(function(train) {
        expect(train.toJSON()).to.eql(savedTrain.toJSON());
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it("does not create a train if signature is not valid", function(done) {
      sinon.stub(trains, "findOneByNameRouteAndDeparture").withArgs().returns(P.resolve(null));
      service.findOrCreateTrain("Quahog", dummyTrain.fromId, dummyTrain.toId, dummyTrainTimes.departureDateString, dummyTrainTimes.departureHourString, dummyTrainTimes.arrivalHourString, dummyTrain.price, signature).catch(function(err) {
        expect(err).to.eql({signature: "Invalid signature for train data"});
        done();
      });
    });

    it("does not create a train if data is not valid", function(done) {
      var wrongTrain = actions.newTrain({name: undefined});
      var wrongSignature = helper.signArguments(undefined, dummyTrain.fromId, dummyTrain.toId, dummyTrain.date, dummyTrain.departure, dummyTrain.arrival);
      sinon.stub(trains, "findOneByNameRouteAndDeparture").withArgs().returns(P.resolve(null));
      service.findOrCreateTrain(undefined, dummyTrain.fromId, dummyTrain.toId, dummyTrainTimes.departureDateString, dummyTrainTimes.departureHourString, dummyTrainTimes.arrivalHourString, dummyTrain.price, wrongSignature).then(function(train) {
        done(train);
      }).catch(function (err) {
        expect(trains.put.called).to.eql(false);
        done();
      });
    });

    it("does not create a train if it existed", function(done) {
      sinon.stub(trains, "findOneByNameRouteAndDeparture").withArgs({name: dummyTrain.name, fromId: dummyTrain.fromId, toId: dummyTrain.toId, departure: dummyTrain.departure}).returns(P.resolve(dummyTrain));
      service.findOrCreateTrain(dummyTrain.name, dummyTrain.fromId, dummyTrain.toId, dummyTrainTimes.departureDateString, dummyTrainTimes.departureHourString, dummyTrainTimes.arrivalHourString, dummyTrain.price, signature).then(function(train) {
        expect(trains.put.called).to.eql(false);
        expect(train).to.eql(dummyTrain);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it("updates price of a train if it's now different", function(done) {
      sinon.stub(trains, "findOneByNameRouteAndDeparture").withArgs({name: dummyTrain.name, fromId: dummyTrain.fromId, toId: dummyTrain.toId, departure: dummyTrain.departure}).returns(P.resolve(dummyTrainPrice));
      service.findOrCreateTrain(dummyTrain.name, dummyTrain.fromId, dummyTrain.toId, dummyTrainTimes.departureDateString, dummyTrainTimes.departureHourString, dummyTrainTimes.arrivalHourString, dummyTrain.price, signature).then(function(train) {
        expect(train.price).to.eql(dummyTrain.price);
        expect(trains.put.called).to.eql(true);
        dummyTrainPrice.price = dummyTrain.price;
        expect(trains.put.getCall(0).args[0]).to.eql(dummyTrainPrice);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it("does not create a train if data is invalid", function(done) {
      sinon.stub(trains, "findOneByNameRouteAndDeparture").returns(P.resolve(null));
      signature = helper.signArguments('', dummyTrain.fromId, dummyTrain.toId, dummyTrainTimes.departureDateString, dummyTrainTimes.departureHourString, dummyTrainTimes.arrivalHourString, dummyTrain.price);
      service.findOrCreateTrain('', dummyTrain.fromId, dummyTrain.toId, dummyTrainTimes.departureDateString, dummyTrainTimes.departureHourString, dummyTrainTimes.arrivalHourString, dummyTrain.price, signature).then(function(train) {
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
});
