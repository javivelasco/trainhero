var Model  = require("./model");

var Booking = Model.extend({
  attributes: ['trainId', 'userId'],
  constraints: {
    userId:  { presence: true },
    trainId: { presence: true }
  }
});

module.exports = Booking;
