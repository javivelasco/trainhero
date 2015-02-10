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

  getBookingFor: function(userId) {
    var index = _.findIndex(this.bookings, function(booking) {
      return booking.userId === userId;
    });
    return index === -1 ? null : this.bookings[index];
  },

  createBookingFor: function(userId) {
    var booking = this.getBookingFor(userId);
    if (booking === null) {
      booking = new Booking({userId: userId});
      this.bookings.push(booking);
      return booking;
    }
  }
});

var defaults = function(self) {
  if (!self.id) self.id = self.generateId();
};

module.exports = Train;
