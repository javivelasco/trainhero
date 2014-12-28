var _       = require('lodash');

function Helper () {};

_.extend(Helper.prototype, {
	trimSpacesAndNewlines: function(string) {
		return string.replace(/(\r\n|\n|\r)/gm,"")
         	       .replace(/^\s\s*/, '')
					       .replace(/\s\s*$/, '')
								 .replace(/\s/g, ' ');
	},

	parseHour: function(hour) {
		return hour.replace(/\./, ':');
	}
});

module.exports = new Helper();
