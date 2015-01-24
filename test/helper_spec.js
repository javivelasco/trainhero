var expect = require('chai').expect,
    sinon  = require('sinon'),
    moment = require('moment'),
    helper = require('../core/helper');

describe('Helper', function() {
  describe('#trimSpacesAndNewlines', function() {
    it("removes all spaces and new lines", function() {
      var result = helper.trimSpacesAndNewlines("something\r\r\n with spaces");
      expect(result).to.eql("something with spaces");
    });
  });

  describe('#parseHour', function() {
    it("changes the dots for double dots", function() {
      var result = helper.parseHour("12.30")
      expect(result).to.eql('12:30');
    });
  });

  describe('#renfeDatetimeToDate', function() {
    it("returns false if its an invalid date and hour", function() {
      var result = helper.renfeDatetimeToDate('Frodo');
      expect(result).to.eql(false);
    });

    it("returns a date object after parsing", function() {
      var result = helper.renfeDatetimeToDate('12/02/2014', '18:20');
      expect(result).to.be.an.instanceof(Date);
    });
  });
});
