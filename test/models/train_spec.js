var expect  = require('chai').expect,
    actions = require('../actions'),
    dummies = require('../dummies'),
    Train   = require("../../core/models/train"),
    Booking = require("../../core/models/booking"),
    Model   = require("../../core/models/model");

describe("models/train.js", function() {
  describe("#constructor", function() {
    it("implements a train model", function() {
      var train = actions.newTrain();
      expect(train).to.be.an.instanceof(Model);
      expect(train).to.be.an.instanceof(Train);
      expect(train.bookings[0]).to.be.an.instanceof(Booking);
      expect(train.isValid()).to.be.eql(true);
    });

    it("has the right attributes", function() {
      var train = actions.newTrain();
      expect(train.toJSON()).to.eql(dummies.dummyTrain());
    });

    it("is not valid with no fromId", function() {
      var train = actions.newTrain({fromId: undefined});
      expect(train.isValid()).to.eql(false);
    });

    it("is not valid with no toId", function() {
      var train = actions.newTrain({toId: undefined});
      expect(train.isValid()).to.eql(false);
    });

    it("is not valid with no arrival hour", function() {
      var train = actions.newTrain({arrival: undefined});
      expect(train.isValid()).to.eql(false);
    });

    it("is not valid with no departure hour", function() {
      var train = actions.newTrain({departure: undefined});
      expect(train.isValid()).to.eql(false);
    });

    it("is not valid with invalid arrival hour", function() {
      var train = actions.newTrain({arrival: '190'});
      expect(train.isValid()).to.eql(false);
    });

    it("is not valid with not date arrival hour", function() {
      var train = actions.newTrain({arrival: '19:30'});
      expect(train.isValid()).to.eql(false);
    });

    it("is not valid with invalid departure hour", function() {
      var train = actions.newTrain({departure: '28:30'});
      expect(train.isValid()).to.eql(false);
      train = actions.newTrain({departure: '12:99'});
      expect(train.isValid()).to.eql(false);
    });

    it("is not valid with not date departure hour", function() {
      var train = actions.newTrain({arrival: '19:30'});
      expect(train.isValid()).to.eql(false);
    });

    it("has a generated id by default", function() {
      var train = actions.newTrain({id: null});
      expect(train.isValid()).to.eql(true);
      expect(train.id).to.exist();
    })
  });
});
