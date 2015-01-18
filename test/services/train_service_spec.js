var expect   = require('chai').expect,
    dotenv   = require('dotenv').load(),
    fs       = require('fs'),
    sinon    = require('sinon'),
    P        = require('bluebird'),
    request  = require('../../config/request'),
    actions  = require('../actions'),
    helper   = require('../../core/helper'),
    stations = require('../../core/repositories/station_repository'),
    trains   = require('../../core/repositories/train_repository'),
    service  = require('../../core/services/train_service');

describe('TrainService', function() {
  describe('#search', function() {
    var renfeSearchPage, from, to, date;

    before(function() {
      renfeSearchPage = fs.readFileSync(__dirname + "/../fixtures/renfe_search_results.html", 'UTF8');
      sinon.stub(request, 'get').returns(P.resolve("Renfe main page content"));
      from = actions.newStation({id: 1, code: '1234'});
      to   = actions.newStation({id: 2, code: '5678'});
      date = '2014-12-18';
    });

    after(function() {
      request.get.restore();
    });

    afterEach(function() {
      request.post.restore();
    });

    it("sets an array of trains in the callback when Renfe responds", function(done) {
      sinon.stub(request, 'post').returns(P.resolve(renfeSearchPage));
      service.search(from, to, date).then(function(trains) {
        expect(trains.length).to.eql(3);
        done();
      });
    });

    it("parses the trains from the request properly when Renfe responds", function(done) {
      sinon.stub(request, 'post').returns(P.resolve(renfeSearchPage));
      service.search(from, to, date).then(function(trains) {
        expect(trains[0].name).to.eql("AV City 02262");
        expect(trains[0].departure).to.eql("06:20");
        expect(trains[0].arrival).to.eql("08:27");
        expect(trains[0].price).to.eql("18.80");
        expect(trains[0].signature).to.eql("099c7c6bbd29b2b6e927709398c6e3b3");
        done();
      });
    });

    it("throws an error when renfe does not respond", function(done) {
      sinon.stub(request, 'post').returns(P.reject("Some error"));
      service.search(from.id, to.id, date).catch(function(err) {
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
    var dummyTrain, wrongTrain, savedTrain, signature;

    before(function() {
      service    = require('../../core/services/train_service');
      dummyTrain = actions.newTrain();
      wrongTrain = actions.newTrain({name: null});
      savedTrain = actions.newTrain({id: 4321});
      signature  = helper.signArguments(dummyTrain.name, dummyTrain.fromId, dummyTrain.toId, dummyTrain.date, dummyTrain.departure, dummyTrain.arrival);
    });

    beforeEach(function() {
      sinon.stub(trains, 'put').returns(P.resolve(savedTrain));
    });

    afterEach(function() {
      trains.put.restore();
      trains.findOneByNameAndRoute.restore();
    });

    it("creates a train if signature is valid and did not exist", function(done) {
      sinon.stub(trains, "findOneByNameAndRoute").withArgs().returns(P.resolve(null));
      service.findOrCreateTrain(dummyTrain.name, dummyTrain.fromId, dummyTrain.toId, dummyTrain.date, dummyTrain.departure, dummyTrain.arrival, signature).then(function(train) {
        expect(train.toJSON()).to.eql(savedTrain.toJSON());
        done();
      });
    });

    it("does not create a train if signature is not valid", function(done) {
      sinon.stub(trains, "findOneByNameAndRoute").withArgs().returns(P.resolve(null));
      service.findOrCreateTrain("Quahog", dummyTrain.fromId, dummyTrain.toId, dummyTrain.date, dummyTrain.departure, dummyTrain.arrival, signature).catch(function(err) {
        expect(err).to.eql({signature: "Invalid signature for train data"});
        expect(err).not.eql(wrongTrain.errors);
        done();
      });
    });

    it("does not create a train if data is not valid", function(done) {
      var wrongTrain = actions.newTrain({name: undefined});
      var wrongSignature = helper.signArguments(undefined, dummyTrain.fromId, dummyTrain.toId, dummyTrain.date, dummyTrain.departure, dummyTrain.arrival);
      sinon.stub(trains, "findOneByNameAndRoute").withArgs().returns(P.resolve(null));
      service.findOrCreateTrain(undefined, dummyTrain.fromId, dummyTrain.toId, dummyTrain.date, dummyTrain.departure, dummyTrain.arrival, wrongSignature).then(function(train) {
        done();
      }).catch(function (err) {
        expect(trains.put.called).to.eql(false);
        expect(err).eql(wrongTrain.errors);
        done();
      });
    });

    it("does not create a train if it existed", function(done) {
      sinon.stub(trains, "findOneByNameAndRoute").withArgs({name: dummyTrain.name, fromId: dummyTrain.fromId, toId: dummyTrain.toId, date: dummyTrain.date}).returns(P.resolve(dummyTrain));
      service.findOrCreateTrain(dummyTrain.name, dummyTrain.fromId, dummyTrain.toId, dummyTrain.date, dummyTrain.departure, dummyTrain.arrival, signature).then(function(train) {
        expect(trains.put.called).to.eql(false);
        expect(train).to.eql(dummyTrain);
        done();
      });
    });
  });
});
