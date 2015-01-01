var renfeService = require('../core/services/renfe_service');

var search = {
	search: function (req, res) {
		var fromId        = req.body.fromId;
		var toId          = req.body.toId;
		var departureDate = req.body.departureDate;

		renfeService.search(fromId, toId, departureDate, function(trains) {
			res.render('search/results', { trains: trains });
		});
	},

	searchPage: function (req, res) {
		res.render('search/search', {
			user: req.user,
			stations: renfeService.getAllStations()
		});
	}
};

module.exports = search;
