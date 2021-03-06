var expect         = require('chai').expect,
    sinon          = require('sinon'),
    P              = require('bluebird'),
    actions        = require('../../actions'),
    helper         = require('../../../core/helper'),
    users          = require('../../../core/repositories/user_repository'),
    trains         = require('../../../core/repositories/train_repository'),
    stations       = require('../../../core/repositories/station_repository'),
    trainService   = require('../../../core/services/train_service'),
    paymentService = require('../../../core/infrastructure/payment_service'),
    bookingService = require('../../../core/services/booking_service'),
    trainActions   = require('../../../core/actions/train_actions');

describe("actions/train_actions.js", function() {
  var currentUser, fromStation, toStation, booking, train, signature;

  before(function() {
    currentUser = actions.newUser();
    booking     = actions.newBooking();
    train       = actions.newTrain({bookings: null});
    bookedTrain = actions.newTrain({bookings: [booking]});
    fromStation = actions.newStation({id: 1, code: '1234'});
    toStation   = actions.newStation({id: 2, code: '5678'});
    signature   = helper.signArguments(train.name, train.fromId, train.toId, train.date, train.departure, train.arrival, train.price);
  });

  describe("#getAllStations", function() {
    it("search for all stations in the repository", function() {
      var findAllStations = sinon.spy(stations, 'findAll');
      trainActions.getAllStations();
      expect(findAllStations.called).to.eql(true);
      stations.findAll.restore();
    });
  });

  describe("#bookTrain", function() {
    beforeEach(function() {
      sinon.stub(trainService, 'findOrCreateTrain').returns(P.resolve(train));
      sinon.stub(bookingService, 'bookTrain').withArgs(currentUser, train).returns(P.resolve(bookedTrain));
      sinon.stub(users, 'findOneById').withArgs(currentUser.id).returns(P.resolve(currentUser));
    });

    afterEach(function() {
      trainService.findOrCreateTrain.restore();
      bookingService.bookTrain.restore();
      users.findOneById.restore();
    });

    it("creates the train if it doesn't exists", function(done) {
      trainActions.bookTrain(currentUser.id, train.name, train.fromId, train.toId, train.date, train.departure, train.arrival, train.price, signature).then(function(result) {
        expect(trainService.findOrCreateTrain.calledWith(train.name, train.fromId, train.toId, train.date, train.departure, train.arrival, train.price, signature)).to.eql(true);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it("searchs for the user", function(done) {
      trainActions.bookTrain(currentUser.id, train.name, train.fromId, train.toId, train.date, train.departure, train.arrival, train.price, signature).then(function(booking) {
        expect(users.findOneById.calledWith(currentUser.id)).to.eql(true);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it("creates the booking", function(done) {
      trainActions.bookTrain(currentUser.id, train.name, train.fromId, train.toId, train.date, train.departure, train.arrival, train.price, signature).then(function(booking) {
         expect(bookingService.bookTrain.calledWith(currentUser, train)).to.eql(true);
         done();
      }).catch(function(err) {
        done(err);
      });
    });
  });

  describe("#searchTrains", function() {
    var findStation, date, renfeTrains, localTrains, bookings;

    beforeEach(function() {
      renfeTrains = [actions.newRenfeTrain(), actions.newRenfeTrain({name: 'Other AVE'})];
      localTrains = [actions.newTrain()];
      bookings    = [actions.newBooking()];
      findStation = sinon.stub(stations, 'findOneById');
      findStation.withArgs(fromStation.id).returns(fromStation);
      findStation.withArgs(toStation.id).returns(toStation);
      sinon.stub(trainService,   'searchAtRenfe').returns(P.resolve(renfeTrains));
      sinon.stub(trainService,   'searchAtLocal').returns(P.resolve(localTrains));
      date = '12/03/2015';
    });

    afterEach(function() {
      findStation.restore();
      trainService.searchAtRenfe.restore();
      trainService.searchAtLocal.restore();
    });

    it("retrieves the stations", function(done) {
      trainActions.searchTrains(currentUser.id, fromStation.id, toStation.id, date).then(function(results) {
        expect(findStation.withArgs(fromStation.id).calledOnce).to.eql(true);
        expect(findStation.withArgs(toStation.id).calledOnce).to.eql(true);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it("retrieves the trains from Renfe", function(done) {
      trainActions.searchTrains(currentUser.id, fromStation.id, toStation.id, date).then(function(results) {
        expect(trainService.searchAtRenfe.calledWith(fromStation, toStation, date)).to.eql(true);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it("retrieves the trains from local", function(done) {
      trainActions.searchTrains(currentUser.id, fromStation.id, toStation.id, date).then(function(results) {
        expect(trainService.searchAtLocal.calledWith(fromStation, toStation, date)).to.eql(true);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it("resolves with all information included", function(done) {
      trainActions.searchTrains(currentUser.id, fromStation.id, toStation.id, date).then(function(results) {
        expect(results.from).to.eql(fromStation.toJSON());
        expect(results.to).to.eql(toStation.toJSON());
        expect(results.trains[0].name).to.eql(renfeTrains[0].name);
        expect(results.trains[0].booked).to.eql(true);
        expect(results.trains[0].bookings).to.eql(1);
        expect(results.trains[1].name).to.eql(renfeTrains[1].name);
        expect(results.trains[1].booked).to.eql(false);
        expect(results.trains[1].bookings).to.eql(0);
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });

  describe("#trainsBookedByUser", function() {
    var user, train;

    before(function() {
      user = actions.newUser();
      train = actions.newTrain();
      sinon.stub(users, 'findOneById').withArgs(user.id).returns(P.resolve(user));
      sinon.stub(trains, 'findByBookingUserId').withArgs(user.id).returns(P.resolve([train]));
    });

    after(function() {
      users.findOneById.restore();
      trains.findByBookingUserId.restore();
    });

    it("retrieves the trains booked by the user", function(done) {
      trainActions.trainsBookedByUser(user.id).then(function(results) {
        expect(results.trains[0].id).to.eql(train.id);
        expect(results.trains[0].name).to.eql(train.name);
        expect(results.trains[0].bookings).to.eql(1);
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });

  describe("#chargeBooking", function() {
    var user     = actions.newUser(),
        token    = 'testtoken',
        chargeId = 'ch_15WVEk2eZvKYlo2CWVCmsrm3',
        chargedBookingTrain = actions.newTrain({bookings: [actions.newBooking().toJSON()]}),
        train = actions.newTrain({bookings: [actions.newBooking({chargeId: null, paidAt: null}).toJSON()]});

    beforeEach(function() {
      sinon.stub(trains, 'findOneByIdAndUserBooking').withArgs(train.id, user.id).returns(P.resolve(train));
      sinon.stub(users,  'findOneById').withArgs(user.id).returns(P.resolve(user));
      sinon.stub(paymentService, 'createBlockedCharge').returns(P.resolve(chargeId));
      sinon.stub(bookingService, 'chargeBooking').returns(P.resolve(train));
    });

    afterEach(function() {
      trains.findOneByIdAndUserBooking.restore();
      users.findOneById.restore();
      paymentService.createBlockedCharge.restore();
      bookingService.chargeBooking.restore();
    });

    it("finds the train and the user", function(done) {
      trainActions.chargeBooking(user.id, train.id, token).then(function(result) {
        expect(users.findOneById.called).to.eql(true);
        expect(trains.findOneByIdAndUserBooking.called).to.eql(true);
        expect(users.findOneById.getCall(0).args[0]).to.eql(user.id);
        expect(trains.findOneByIdAndUserBooking.getCall(0).args[0]).to.eql(train.id);
        expect(trains.findOneByIdAndUserBooking.getCall(0).args[1]).to.eql(user.id);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it("rejects the promise if the train is not booked by the user", function(done) {
      trains.findOneByIdAndUserBooking.restore();
      sinon.stub(trains, 'findOneByIdAndUserBooking').withArgs(train.id, user.id).returns(P.resolve(null));
      trainActions.chargeBooking(user.id, train.id, token).then(function(result) {
        done("Promise not rejected");
      }).catch(function(err) {
        expect(err).to.eql("Booking not found for user");
        done();
      });
    });

    it("rejects the promise if the booking is already charged", function(done) {
      trains.findOneByIdAndUserBooking.restore();
      sinon.stub(trains, 'findOneByIdAndUserBooking').withArgs(train.id, user.id).returns(P.resolve(chargedBookingTrain));
      trainActions.chargeBooking(user.id, train.id, token).then(function(result) {
        done("Promise not rejected");
      }).catch(function(err) {
        expect(err).to.eql("Booking is already charged");
        done();
      });
    });

    it("creates the non-captured charge using the token", function(done) {
      trainActions.chargeBooking(user.id, train.id, token).then(function(result) {
        expect(paymentService.createBlockedCharge.called).to.eql(true);
        expect(paymentService.createBlockedCharge.getCall(0).args[0]).to.eql(token);
        expect(paymentService.createBlockedCharge.getCall(0).args[1]).to.eql(train.price);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it("rejects the promise with stripe error if charge cannot be created", function(done) {
      paymentService.createBlockedCharge.restore();
      sinon.stub(paymentService, 'createBlockedCharge').returns(P.reject('Stripe error'));
      trainActions.chargeBooking(user.id, train.id, token).then(function(result) {
        done('Promise should be rejected');
      }).catch(function(err) {
        expect(err).to.eql('Stripe error');
        done();
      });
    });

    it("stores the created chargeId in the booking if it was not charged before", function(done) {
      trainActions.chargeBooking(user.id, train.id, token).then(function(result) {
        expect(bookingService.chargeBooking.called).to.eql(true);
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });
});
