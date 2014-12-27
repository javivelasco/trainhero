var _       = require('lodash');

function Helper () {};

_.extend(Helper.prototype, {
	trimSpacesAndNewlines: function(string) {
		return string.replace(/(\r\n|\n|\r)/gm,"")
         	       .replace(/^\s\s*/, '')
					       .replace(/\s\s*$/, '')
								 .replace(/\s/g, ' ');
	},

	validHour: function(originalHour) {
		var hourArray = originalHour.split(':'),
		hours     = hourArray[0],
		minutes   = hourArray[1];
		return (validHours(hours) && validMinutes(minutes) ? true : false)
	},

	parseHour: function(hour) {
		return hour.replace(/\./, ':');
	}
});

function validHours(hours) {
	if (parseInt(hours) < 0 || parseInt(hours) >= 24)
	return false
	return true
}

function validMinutes(minutes) {
	if (parseInt(minutes) < 0 || parseInt(minutes) >= 60)
		return false
	return true
}

module.exports = new Helper();
