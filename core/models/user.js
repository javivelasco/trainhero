var Model  = require("./model"),
    helper = require("../helper");

var User = Model.extend({
	attributes: ['id', 'name', 'lastname', 'email'],

	constructor: function() {
		Model.prototype.constructor.call(this, arguments[0]);
	},

	constraints: {
		email: { presence: true, email: true },
    name:  { presence: true }
	}
});

module.exports = User;
