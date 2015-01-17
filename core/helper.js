var _   = require('lodash'),
    md5 = require("blueimp-md5").md5;

function Helper () {}

_.extend(Helper.prototype, {
	trimSpacesAndNewlines: function(string) {
		return string.replace(/(\r\n|\n|\r)/gm,"")
         	       .replace(/^\s\s*/, '')
					       .replace(/\s\s*$/, '')
								 .replace(/\s/g, ' ')
								 .replace(/,/g, '.');
	},

	parseHour: function(hour) {
		return hour.replace(/\./, ':');
	},

	signArguments: function() {
		return md5(_.reduce(arguments, function(result, item) {
			return result + item;
		}, process.env.MD5SECRET));
	}
});

module.exports = new Helper();
