var trainService = require('../core/services/train_service');

var search = {
	search: function (req, res) {
		var fromId        = req.body.fromId,
		    toId          = req.body.toId,
		    departureDate = req.body.departureDate;

		trainService.searchAtRenfe(fromId, toId, departureDate, function(trains) {
			res.render('search/results', { trains: trains });
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
