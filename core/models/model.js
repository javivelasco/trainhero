var _ = require('lodash');

function Model() {
  var self   = this;
  var values = arguments[0] || {};

  // Public attributes
  self.attributes || (self.attributes = []);
  self.errors = [];

  for (var i=0; i<self.attributes.length; i++) {
    key = self.attributes[i]
    self[key] = values[key];
  };
};

_.extend(Model.prototype, {
  addError: function(attribute, message) {
    this.errors.push({
      attribute: attribute,
      message: message
    });
  },

  isValid: function() {
    return this.errors.length == 0
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
