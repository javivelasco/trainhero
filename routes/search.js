var fs           = require('fs'),
    P            = require('bluebird'),
    sinon        = require('sinon'),
    trainActions  = require('../core/actions/train_actions');

var search = {
	searchPage: function (req, res) {
		res.render('search/search', {
			user: req.user,
			stations: trainActions.getAllStations()
		});
	},

	search: function (req, res) {
		var fromId = req.body.fromId,
		    toId   = req.body.toId,
		    date   = req.body.departureDate;

		trainActions.searchTrains(req.user.id, fromId, toId, date).then(function(results) {
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
