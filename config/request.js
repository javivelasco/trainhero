var request = require('request-promise');

module.exports = request.defaults({
  jar: true,
  headers: { 'User-Agent': 'Chrome/38.0.2125.122' }
});
