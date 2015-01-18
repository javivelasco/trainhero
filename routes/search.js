var trainService = require('../core/services/train_service');

var search = {
	search: function (req, res) {
		var fromId        = req.body.fromId,
		    toId          = req.body.toId,
		    departureDate = req.body.departureDate;

		trainService.searchAtRenfe(fromId, toId, departureDate).then(function(trains) {
			res.render('search/results', { trains: trains });
		}).catch(function(err) {
			console.log(err);
			res.render('search/error', {err: err});
		});
	},

	searchPage: function (req, res) {
		res.render('search/search', {
			user: req.user,
			stations: trainService.allStations()
		});
	}
};

module.exports = search;
