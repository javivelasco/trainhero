var _ = require('lodash');

function TestHelper () {};

_.extend(TestHelper.prototype, {
	generateCursorWithResult: function(num, docs) {
		return {
			countAsync: function() {
				return {
					then: function(cb) {
						return cb(num);
					}
				}
			},
			toArrayAsync: function() {
				return {
					then: function(cb) {
						return cb(docs);
					}
				}
			}
		};
	}
});

module.exports = new TestHelper();
