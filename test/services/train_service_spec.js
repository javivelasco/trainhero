var expect  = require('chai').expect,
    dotenv  = require('dotenv').load(),
    sinon   = require('sinon'),
    actions = require('../actions'),
    request = require('request'),
    fs      = require('fs'),
    StationsRepository = require('../../core/repositories/station_repository');

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
      findStation = sinon.stub(StationsRepository, 'findOneById');
      findStation.withArgs(from.id).returns(from);
      findStation.withArgs(to.id).returns(to);
    });

    after(function() {
      request.defaults.restore();
      requestAgent.get.restore();
      requestAgent.post.restore();
      StationsRepository.findOneById.restore();
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
        expect(trains[0].signature).to.eql("6e691381791f42a9d6d8d61f2b6d6f1f");
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
          findAllStations = sinon.spy(StationsRepository, 'findAll');
      service.allStations();
      expect(findAllStations.called).to.eql(true);
      StationsRepository.findAll.restore();
    });
  });
});
