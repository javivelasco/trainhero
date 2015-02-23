var trainActions = require('../core/actions/train_actions');

var booking = {
	create: function (req, res) {
		var train = req.body.train;
		var user  = req.user;

		trainActions.bookTrain(user.id, train.name, train.fromId, train.toId, train.date, train.departure, train.arrival, train.price, train.signature).then(function() {
			res.redirect('/bookings');
		}).catch(function(err) {
			console.log(err);
			res.redirect('/search');
		});
	},

	getAll: function(req, res) {
		var user = req.user;

		trainActions.trainsBookedByUser(user.id).then(function(result) {
			res.render('booking/index', {
				user: req.user,
				trains: result.trains
			});
		});
	}
};

module.exports = booking;
