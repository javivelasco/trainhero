var validate = require('validate.js');

validate.validators.datetime = function(value, options, key, attributes) {
	if (!(value instanceof Date) && value !== null) return "Invalid Date object";
};

var originalPresenceValidator = validate.validators.presence;
validate.validators.presence = function(value, options, key, attributes) {
	if (!(value instanceof Date)) return originalPresenceValidator(value, {});
};

module.exports = validate;
