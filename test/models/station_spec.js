var expect  = require('chai').expect,
    actions = require('../actions'),
    dummies = require('../dummies'),
    Station = require("../../core/models/station"),
    Model   = require("../../core/models/model");

describe("models/station.js", function() {
  describe("#constructor", function() {
    it("throws an error with no name", function() {
      expect(actions.newStation.bind(actions.newStation, {
        name: undefined,
        code: '123456'
      })).to.throw("Invalid station name");
    });

    it("throws an error with no code", function() {
      expect(actions.newStation.bind(actions.newStation, {
        name: 'Ankara',
        code: undefined
      })).to.throw("Invalid station code");
    });

    it("implements a station model", function() {
      var station = actions.newStation();
      expect(station).to.be.an.instanceof(Model);
      expect(station).to.be.an.instanceof(Station);
    });

    it("has the right attributes", function() {
      var station = actions.newStation();
      expect(station.toJSON()).to.eql(dummies.dummyStation());
    });
  });
});
