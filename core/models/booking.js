var Model  = require("./model");

var Booking = Model.extend({
  attributes: ['id', 'trainId', 'userId'],

  constructor: function() {
    Model.prototype.constructor.call(this, arguments[0]);
    defaults(this);
  },

  constraints: {
    userId:  { presence: true },
    trainId: { presence: true }
  }
});

var defaults = function(self) {
  if (!self.id) self.id = self.userId + '_' + self.trainId;
};

module.exports = Booking;
