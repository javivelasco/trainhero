var validate = require('validate.js');

function validHours(hours) {
	if (parseInt(hours) < 0 || parseInt(hours) >= 24)
		return false;
	return true;
}

function validMinutes(minutes) {
	if (parseInt(minutes) < 0 || parseInt(minutes) >= 60)
		return false;
	return true;
}

validate.validators.hour = function(value, options, key, attributes) {
	if (value) {
		var hourArray = value.split(':');
		if (hourArray.length != 2)       return "Invalid hour format";
		if (!validHours(hourArray[0]))   return "Invalid hour";
		if (!validMinutes(hourArray[1])) return "Invalid minutes";
	}
};

validate.validators.datetime = function(value, options, key, attributes) {
	if (!(value instanceof Date)) return "Invalid Date object";
}


var originalPresenceValidator = validate.validators.presence;
validate.validators.presence = function(value, options, key, attributes) {
	if (!(value instanceof Date)) return originalPresenceValidator(value, {});
}

module.exports = validate;
