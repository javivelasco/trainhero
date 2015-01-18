var trainService = require('../core/services/train_service');
var userActions  = require('../core/actions/user_actions');

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
				from:   results.from,
				to:     results.to,
				trains: results.trains,
			});
		}).catch(function(err) {
			res.render('search/error', {err: err});
		});
	}
};

module.exports = search;
