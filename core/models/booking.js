var Model  = require("./model"),
    moment = require("moment");

var Booking = Model.extend({
  attributes: ['userId', 'createdAt', 'chargeId', 'paidAt'],

  constructor: function() {
    Model.prototype.constructor.call(this, arguments[0]);
    defaults(this);
  },

  constraints: {
    userId:  { presence: true },
    paidAt:  { datetime: true }
  },

  setCharge: function(chargeId, paidAt) {
    this.chargeId = chargeId;
    this.paidAt   = paidAt ? moment().toDate() : null;
  },

  isCaptured: function() {
    return !!this.paidAt;
  }
});

function defaults(self) {
  if (self.paidAt === undefined) self.paidAt = null;
  if (self.chargeId === undefined) self.chargeId = null;
  if (!self.createdAt) self.createdAt = moment().toDate();
}

module.exports = Booking;
