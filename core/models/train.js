var Model  = require("./model");

var Train = Model.extend({
  attributes: ['id', 'name', 'fromId', 'toId', 'departure', 'arrival'],

  constructor: function() {
    Model.prototype.constructor.call(this, arguments[0]);
  },

  constraints: {
    name:      { presence: true },
    fromId:    { presence: true },
    toId:      { presence: true },
    arrival:   { presence: true, datetime: true },
    departure: { presence: true, datetime: true }
  }
});

module.exports = Train;
