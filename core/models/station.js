var Model = require("./model");

var Station = Model.extend({
  attributes: ['id', 'name', 'code'],

  constructor: function() {
    Model.prototype.constructor.call(this, arguments[0]);

    if (!this.name) throw new Error("Invalid station name");
    if (!this.code) throw new Error("Invalid station code");
  }
});

module.exports = Station;
