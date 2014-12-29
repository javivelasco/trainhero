var _ = require('lodash');

function TestHelper () {};

_.extend(TestHelper.prototype, {
	generateCursorWithResult: function(num) {
		return {
			countAsync: function() {
				return {
					then: function(cb) {
						return cb(num);
					}
				}
			}
		};
	}
});

module.exports = new TestHelper();
