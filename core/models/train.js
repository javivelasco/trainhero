var Model   = require("./model"),
    Booking = require("./booking");

var Train = Model.extend({
  attributes: ['id', 'name', 'fromId', 'toId', 'departure', 'arrival', 'bookings'],
  embebbed:   { bookings: [Booking] },

  constructor: function() {
    Model.prototype.constructor.call(this, arguments[0]);
    defaults(this);
  },

  constraints: {
    name:      { presence: true },
    fromId:    { presence: true },
    toId:      { presence: true },
    arrival:   { presence: true, datetime: true },
    departure: { presence: true, datetime: true }
  }
});

var defaults = function(self) {
  if (!self.id) self.id = self.generateId();
};

module.exports = Train;
