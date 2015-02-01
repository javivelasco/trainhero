var _      = require('lodash'),
    moment = require('moment'),
    md5    = require("blueimp-md5").md5;

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
	},

  renfeDatetimeToDate: function(date, hour) {
    var datetime = moment(date + ' ' + hour, "DD/MM/YYYY HH:mm");
    if (!datetime.isValid()) return false;
    return datetime.toDate();
  },

  isArray: function(value) {
    return {}.toString.call(value) === '[object Array]';
  }
});

module.exports = new Helper();
