var Model  = require("./model"),
    helper = require("../helper");

var Train = Model.extend({
  attributes: ['id', 'name', 'fromId', 'toId', 'departure', 'arrival', 'date'],

  constructor: function() {
    Model.prototype.constructor.call(this, arguments[0]);
    runValidations(this);
  },

  validate: function() {
    return runValidations(this);
  }
});

function runValidations(train) {
  validateDeparture(train);
  validateArrival(train);
  validateDate(train);
  validateFromStation(train);
  validateToStation(train);
  return train.isValid();
};

function validateFromStation(train) {
  if(!train.fromId)
    train.addError('from', 'Invalid station id')
}

function validateToStation(train) {
  if(!train.toId)
    train.addError('to', 'Invalid station id')
}

function validateDeparture(train) {
  if(!train.departure || !helper.validHour(train.departure))
    train.addError('departure', 'Invalid departure hour');
}

function validateArrival(train) {
  if(!train.arrival || !helper.validHour(train.arrival))
    train.addError('arrival', 'Invalid arrival hour');
}

function validateDate(train) {
  if (!(train.date instanceof Date))
    train.addError('date', 'Invalid date');
}

module.exports = Train;
