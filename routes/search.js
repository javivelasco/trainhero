var fs           = require('fs'),
    P            = require('bluebird'),
    sinon        = require('sinon'),
    trainService = require('../core/services/train_service'),
    userActions  = require('../core/actions/user_actions');

var search = {
	searchPage: function (req, res) {
		res.render('search/search', {
			user: req.user,
			stations: trainService.allStations()
		});
	},

	search: function (req, res) {
		var fromId = req.body.fromId,
		    toId   = req.body.toId,
		    date   = req.body.departureDate;

		userActions.searchTrains(req.user.id, fromId, toId, date).then(function(results) {
			res.render('search/results', {
        user:   req.user,
				from:   results.from,
				to:     results.to,
        date:   date,
				trains: results.trains,
			});
		}).catch(function(err) {
			res.render('search/error', {err: err});
		});
	}
};

module.exports = search;

// Stub helper to avoid repetitive requests to Renfe
var stubSearch = function() {
	var results = JSON.parse(fs.readFileSync(__dirname + "/../trains_search.json", 'UTF8'));
	sinon.stub(userActions, 'searchTrains').returns(P.resolve(results));
};

stubSearch();
