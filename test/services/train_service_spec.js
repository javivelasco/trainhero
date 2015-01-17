var expect   = require('chai').expect,
    dotenv   = require('dotenv').load(),
    fs       = require('fs'),
    sinon    = require('sinon'),
    request  = require('request'),
    P        = require('bluebird'),
    actions  = require('../actions'),
    helper   = require('../../core/helper'),
    stations = require('../../core/repositories/station_repository'),
    trains   = require('../../core/repositories/train_repository');

describe('TrainService', function() {
  describe('#searchAtRenfe', function() {
    var renfeSearchPage, requestAgent, postRenfe,
        service, from, to, date;

    before(function() {
      // Stub external requests to Renfe website
      renfeSearchPage = fs.readFileSync(__dirname + "/../fixtures/renfe_search_results.html", 'UTF8');
      requestAgent = request.defaults({jar: true, headers: { 'User-Agent': 'Chrome/38.0.2125.122' }});
      sinon.stub(request, 'defaults').returns(requestAgent);
      sinon.stub(requestAgent, 'get').callsArgWith(1, null, null, "Renfe main page content");
      postRenfe = sinon.stub(requestAgent, 'post');
      service = require('../../core/services/train_service');

      // Stub repositories responses for station codes
      from = actions.newStation({id: 1, code: '1234'});
      to   = actions.newStation({id: 2, code: '5678'});
      date = '2014-12-18';
      findStation = sinon.stub(stations, 'findOneById');
      findStation.withArgs(from.id).returns(from);
      findStation.withArgs(to.id).returns(to);
    });

    after(function() {
      request.defaults.restore();
      requestAgent.get.restore();
      requestAgent.post.restore();
      stations.findOneById.restore();
    });

    it("sets an array of trains in the callback when Renfe responds", function(done) {
      postRenfe.callsArgWith(1, null, null, renfeSearchPage);
      service.searchAtRenfe(from.id, to.id, date, function(trains) {
        expect(trains.length).to.eql(3);
        done();
      });
    });

    it("parses the trains from the request properly when Renfe responds", function(done) {
      postRenfe.callsArgWith(1, null, null, renfeSearchPage);
      service.searchAtRenfe(from.id, to.id, date, function(trains) {
        expect(trains[0].name).to.eql("AV City 02262");
        expect(trains[0].departure).to.eql("06:20");
        expect(trains[0].arrival).to.eql("08:27");
        expect(trains[0].price).to.eql("18.80");
        expect(trains[0].signature).to.eql("099c7c6bbd29b2b6e927709398c6e3b3");
        done();
      });
    });

    it("gives empty array when the stations doesn't exist", function(done) {
      service.searchAtRenfe(20, 30, date, function(trains) {
        expect(trains.length).to.eql(0);
        done();
      });
    });

    it("throws an error when renfe does not respond", function() {
      postRenfe.callsArgWith(1, {}, null, null);
      expect(service.searchAtRenfe.bind(service.searchAtRenfe,
        from.id, to.id, date, function(trains) {}
      )).to.throw("Error connecting with Renfe");
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
