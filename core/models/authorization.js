var Model  = require("./model");

var Authorization = Model.extend({
	attributes: ['uid', 'token', 'provider'],

	constructor: function() {
		Model.prototype.constructor.call(this, arguments[0]);
	},

	constraints: {
		uid:      { presence: true },
		token:    { presence: true },
		provider: { inclusion: { within: ['facebook'] }}
	}
});

module.exports = Authorization;