var expect     = require('chai').expect,
    Station    = require('../../core/models/station'),
    repository = require('../../core/repositories/station_repository');

describe("Station Repository", function() {
  describe('#findOneById', function() {
    it('returns a station model', function(){
      expect(repository.findOneById('0')).to.be.an.instanceof(Station);
    });

    it('has the right attributes', function() {
      expect(repository.findOneById('0').toJSON()).to.eql(stations[0]);
    });
  });

  describe('#findAll', function() {
    it('returns an array of stations', function() {
      expect(repository.findAll()).to.be.an.instanceof(Array);
      expect(repository.findAll()['0']).to.be.an.instanceof(Station);
    });

    it('returns all elements', function() {
      expect(repository.findAll().length).to.eql(2207);
    });
  });
});

var stations = [
  {id: '0', name: "A Albergueria-Prado", code: "0071,31209,31209"},
  {id: '1', name: "A Bandeira", code: "0071,31311,31311"}
];
