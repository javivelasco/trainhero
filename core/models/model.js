var _        = require('lodash'),
    moment   = require('moment'),
    validate = require("../validators");

function Model() {
  var self   = this;
  var values = arguments[0] || {};

  self.attributes = self.attributes || [];
  setAttributes(self, values);
  setEmbebbedModels(self, values);
  self.validate();
}

_.extend(Model.prototype, {
  validate: function() {
    this.errors = validate(this, this.constraints);
    validateEmbebbedModels(this);
  },

  isValid: function() {
    return (this.errors === undefined);
  },

  toJSON: function() {
    var self = this, json = {};

    _.forEach(self.attributes, function(key) {
      json[key] = self[key];
    });

    _.forIn(self.embebbed, function(model, key) {
      if (self[key]) json[key] = self[key].toJSON();
    });

    return json;
  }
});

function setAttributes(self, values) {
  for (var i=0; i<self.attributes.length; i++) {
    key = self.attributes[i];
    self[key] = values[key];
  }
}

function setEmbebbedModels(self, values) {
  _.forIn(self.embebbed, function(Model, key) {
    value = values[key];
    self[key] = value ? new Model(value) : null;
  });
}

function validateEmbebbedModels(self) {
  var model;

  _.forIn(self.embebbed, function(model, key) {
    model = self[key];
    if (model) {
      model.validate();
      if (!model.isValid()) {
        self.errors = self.errors || {};
        self.errors[key] = model.errors;
      }
    }
  });
}

Model.extend   = require('simple-extend');
module.exports = Model;
