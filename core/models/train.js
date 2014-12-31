var Model  = require("./model");

var Train = Model.extend({
  attributes: ['id', 'name', 'fromId', 'toId', 'departure', 'arrival', 'date'],

  constructor: function() {
    Model.prototype.constructor.call(this, arguments[0]);
  },

  constraints: {
    fromId:    { presence: true },
    toId:      { presence: true },
    arrival:   { presence: true, hour: true },
    departure: { presence: true, hour: true },
    date:      { presence: true, date: true }
  }
});

module.exports = Train;
