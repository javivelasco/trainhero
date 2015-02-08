var nodemailer = require('nodemailer'),
    P          = require('bluebird'),
    config     = require('./config');

var transporter = nodemailer.createTransport({
		host: config.mailer.host,
		port: config.mailer.port,
		auth: {
				user: config.mailer.username,
				pass: config.mailer.password
		}
});

module.exports = P.promisifyAll(transporter);
