var userActions  = require('../core/actions/user_actions');

var booking = {
	create: function (req, res) {
		var train = req.body.train;
		var user  = req.user;

		userActions.bookTrain(user.id, train.name, train.fromId, train.toId, train.date, train.departure, train.arrival, train.signature).then(function() {
			res.render('booking/index');
		}).catch(function(err) {
			res.redirect('/search');
		});
	}
};

module.exports = booking;
