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

  setCharge: function(chargeId) {
    this.chargeId = chargeId;
    this.paidAt   = null;
  },

  setChargeCaptured: function() {
    this.paidAt = moment().toDate();
  },

  isCharged: function() {
    return !!this.chargeId;
  },

  isChargeCaptured: function() {
    return !!this.paidAt;
  }
});

function defaults(self) {
  if (self.paidAt === undefined) self.paidAt = null;
  if (self.chargeId === undefined) self.chargeId = null;
  if (!self.createdAt) self.createdAt = moment().toDate();
}

module.exports = Booking;
