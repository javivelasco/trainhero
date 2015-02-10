var Model  = require("./model"),
    moment = require("moment");

var Booking = Model.extend({
  attributes: ['userId', 'createdAt', 'paymentId', 'paidAt'],

  constructor: function() {
    Model.prototype.constructor.call(this, arguments[0]);
    defaults(this);
  },

  constraints: {
    userId:  { presence: true },
    paidAt:  { datetime: true }
  },

  setPayment: function(paymentId) {
    this.paymentId = paymentId;
    this.paidAt = moment().toDate();
  },

  isPaid: function() {
    return !!this.paymentId;
  }
});

function defaults(self) {
  if (self.paidAt === undefined) self.paidAt = null;
  if (self.paymentToken === undefined) self.paymentToken = null;
  if (!self.createdAt) self.createdAt = moment().toDate();
}

module.exports = Booking;
