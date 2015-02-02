var _       = require("lodash"),
    Model   = require("./model"),
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
  },

  createBookingFor: function(userId) {
    var index = _.findIndex(this.bookings, function(booking) {
      return booking.userId === userId;
    });

    if (index === -1) {
      booking = new Booking({userId: userId});
      this.bookings.push(booking);
      return booking;
    };
  }
});

var defaults = function(self) {
  if (!self.id) self.id = self.generateId();
};

module.exports = Train;
