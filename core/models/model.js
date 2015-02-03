var _        = require('lodash'),
    moment   = require('moment'),
    shortId  = require('shortid'),
    helper   = require('../helper'),
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
  generateId: function() {
    return shortId.generate();
  },

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
    addEmbebbedModelsJSON(self, json);
    return json;
  }
});

function addEmbebbedModelsJSON(self, json) {
  _.forIn(self.embebbed, function(embebbedValue, attribute) {
    if (helper.isArray(self[attribute])) {
      addArrayOfEmbebbedModelsJSON(self, json, attribute);
    } else {
      if (self[attribute]) json[attribute] = self[attribute].toJSON();
    }
  });
}

function addArrayOfEmbebbedModelsJSON(self, json, attribute) {
  json[attribute] = [];
  _.forEach(self[attribute], function(embebbedInstance) {
    json[attribute].push(embebbedInstance.toJSON());
  });
}

function setAttributes(self, values) {
  for (var i=0; i<self.attributes.length; i++) {
    key = self.attributes[i];
    self[key] = values[key];
  }
}

function setEmbebbedModels(self, values) {
  var instanceValue;

  _.forIn(self.embebbed, function(embebbedValue, attribute) {
    instanceValue = values[attribute];
    if (helper.isArray(embebbedValue)) {
      setArrayOfEmbebbedModels(self, attribute, embebbedValue, instanceValue);
    } else {
      self[attribute] = instanceValue ? new embebbedValue(instanceValue) : null;
    }
  });
}

function setArrayOfEmbebbedModels(self, attribute, embebbedValue, instanceValues) {
  var embebbedModel = embebbedValue[0];
  self[attribute] = [];
  _.forEach(instanceValues, function(instanceValue) {
    self[attribute].push(instanceValue ? new embebbedModel(instanceValue) : null);
  });
}

function validateEmbebbedModels(self) {
  var embebbedValue;

  _.forIn(self.embebbed, function(embebbedValue, attribute) {
    embebbedInstance = self[attribute];
    if (helper.isArray(embebbedInstance)) {
      validateArrayOfEmbebbedInstances(self, attribute, embebbedInstance);
    } else {
      validateEmbebbedInstance(self, attribute, embebbedInstance);
    }
  });
}

function validateArrayOfEmbebbedInstances(self, attribute, array) {
  _.forEach(array, function(model) {
    validateEmbebbedInstance(self, attribute, model);
  });
}

function validateEmbebbedInstance(self, attribute, modelInstance) {
  if (modelInstance) {
    modelInstance.validate();
    if (!modelInstance.isValid()) {
      self.errors = self.errors || {};
      self.errors[attribute] = modelInstance.errors;
    }
  }
}

Model.extend   = require('simple-extend');
module.exports = Model;
