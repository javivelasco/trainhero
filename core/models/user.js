var bcrypt = require('bcrypt-nodejs'),
    Model  = require("./model"),
    helper = require("../helper");

var User = Model.extend({
	attributes: ['id', 'name', 'lastname', 'email', 'password'],

	constructor: function() {
		Model.prototype.constructor.call(this, arguments[0]);
	},

	constraints: {
		email: { presence: true, email: true },
    name:  { presence: true }
	},

  generateHash: function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  },

  validPassword: function(password) {
    return bcrypt.compareSync(password, this.password);
  }
});

module.exports = User;
