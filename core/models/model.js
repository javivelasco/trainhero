var _        = require('lodash'),
    moment   = require('moment'),
    validate = require("../validators");

function Model() {
  var self   = this;
  var values = arguments[0] || {};

  // Public attributes
  self.attributes || (self.attributes = []);

  for (var i=0; i<self.attributes.length; i++) {
    key = self.attributes[i]
    self[key] = values[key];
  };

  self.validate();
};

_.extend(Model.prototype, {
  validate: function() {
    this.errors = validate(this, this.constraints);
  },

  isValid: function() {
    return this.errors == undefined
  },

  toJSON: function() {
    var json = {};
    for (var i=0; i<this.attributes.length; i++) {
      key = this.attributes[i]
      json[key] = this[key]
    };
    return json;
  }
});

Model.extend   = require('simple-extend');
module.exports = Model;
