var expect  = require('chai').expect,
    sinon   = require('sinon'),
    actions = require('../actions'),
    request = require('request'),
    fs      = require('fs'),
    StationsRepository = require('../../core/repositories/station_repository');

describe('RenfeService', function() {
  var service, getRenfe, postRenfe, renfeSearchPage;

  before(function() {
    requestAgent = request.defaults({jar: true, headers: { 'User-Agent': 'Chrome/38.0.2125.122' }});
    sinon.stub(request, 'defaults').returns(requestAgent)
    getRenfe  = sinon.stub(requestAgent, 'get');
    postRenfe = sinon.stub(requestAgent, 'post');
    service   = require('../../core/services/renfe_service');
    renfeSearchPage = fs.readFileSync(__dirname + "/../fixtures/renfe_search_results.html", 'UTF8');
  });

  after(function() {
    request.defaults.restore();
    requestAgent.get.restore();
    requestAgent.post.restore();
  });

  describe('#getAllStations', function() {
    it("search for all stations in the repository", function() {
      var findAllStations = sinon.spy(StationsRepository, 'findAll');
      service.getAllStations();
      expect(findAllStations.called).to.eql(true);
      StationsRepository.findAll.restore();
    });
  });

  describe('#search', function() {
    var from, to, date;

    before(function() {
      from = actions.newStation({id: 1, code: '1234'});
      to   = actions.newStation({id: 2, code: '5678'});
      date = '2014-12-18';

      findStation = sinon.stub(StationsRepository, 'findOneById');
      findStation.withArgs(from.id).returns(from);
      findStation.withArgs(to.id).returns(to);

      getRenfe.callsArgWith( 1, null, null, "Renfe main page content");
    });

    after(function() {
      StationsRepository.findOneById.restore();
    });

    describe("when Renfe responds", function() {
      before(function() {
        postRenfe.callsArgWith(1, null, null, renfeSearchPage);
      });

      it("sets an array of trains in the callback", function(done) {
        service.search(from.id, to.id, date, function(trains) {
          expect(trains.length).to.eql(3);
          done();
        });
      });

      it("parses the trains from the request properly", function(done) {
        service.search(from.id, to.id, date, function(trains) {
          expect(trains[0].name).to.eql("AV City 02262");
          expect(trains[0].departure).to.eql("06:20");
          expect(trains[0].arrival).to.eql("08:27");
          expect(trains[0].price).to.eql("18,80");
          done();
        });
      });

      it("gives empty array when the stations doesn't exist", function(done) {
        service.search(20, 30, date, function(trains) {
          expect(trains.length).to.eql(0);
          done();
        });
      })
    });

    describe("when Renfe does not respond", function() {
      before(function() {
        postRenfe.callsArgWith(1, {}, null, null);
      });

      it("throws an error", function() {
        expect(service.search.bind(service.search,
          from.id, to.id, date, function(trains) {}
        )).to.throw("Error connecting with Renfe");
      });
    });
  });
});
