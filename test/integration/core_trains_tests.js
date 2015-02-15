var expect      = require('chai').expect,
    sinon       = require('sinon'),
    fs          = require('fs'),
    P           = require('bluebird'),
    dummies     = require('../dummies'),
    actions     = require('../actions'),
    userActions = require('../../core/actions/user_actions'),
    users       = require('../../core/repositories/user_repository'),
    trains      = require('../../core/repositories/train_repository'),
    stations    = require('../../core/repositories/station_repository'),
    request     = require('../../config/request'),
    sandbox     = sinon.sandbox.create();

describe("Booking trains", function() {
  var renfeSearchPage = fs.readFileSync(__dirname + "/../fixtures/renfe_search_results.html", 'UTF8'),
      madridStation   = stations.findOneById(1179),
      cordobaStation  = stations.findOneById(590),
      currentUser     = actions.newUser(),
      otherUser       = actions.newUser({id: "u2"}),
      date            = '19/12/2014',
      searchedTrain   = null;

  before(function(done) {
    sandbox.stub(request, 'get').returns(P.resolve("Renfe main page content"));
    sandbox.stub(request, 'post').returns(P.resolve(renfeSearchPage));
    users.put(currentUser).then(function(user) { done(); });
  });

  after(function() {
    sandbox.restore();
    users.clear();
    trains.clear();
  });

  it("creates a booking when there are no other bookings", function(done) {
    userActions.searchTrains(currentUser.id, madridStation.id, cordobaStation.id, date).then(function(results) {
      searchedTrain = results.trains[0];
      userActions.bookTrain(currentUser.id, searchedTrain.name, madridStation.id, cordobaStation.id, date, searchedTrain.departure, searchedTrain.arrival, searchedTrain.price, searchedTrain.signature).then(function(result) {
        expect(result.id).to.exist();
        expect(result.name).to.eql(searchedTrain.name);
        expect(result.fromId).to.eql(madridStation.id);
        expect(result.toId).to.eql(cordobaStation.id);
        expect(result.departure).to.be.an.instanceof(Date);
        expect(result.arrival).to.be.an.instanceof(Date);
        expect(result.bookings.length).to.eql(1);
        done();
      });
    });
  });
});
