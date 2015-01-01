var Model  = require("./model");

var Authorization = Model.extend({
	attributes: ['uid', 'token', 'provider'],

	constructor: function() {
		Model.prototype.constructor.call(this, arguments[0]);
		defaults(this);
	},

	constraints: {
		uid:      { presence: true },
		provider: { inclusion: { within: ['facebook'] }}
	}
});

var defaults = function(self) {
	self.provider = (self.provider || 'facebook');
};

module.exports = Authorization;
