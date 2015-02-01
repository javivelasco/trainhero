var Model  = require("./model"),
    moment = require("moment");

var Booking = Model.extend({
  attributes: ['userId', 'createdAt'],

  constructor: function() {
    Model.prototype.constructor.call(this, arguments[0]);
    defaults(this);
  },

  constraints: {
    userId:  { presence: true }
  }
});

function defaults(self) {
  if (!self.createdAt) self.createdAt = moment().toDate();
};

module.exports = Booking;
