var dotenv = require('dotenv').load(),
		_      = require('lodash'),
		P      = require('bluebird'),
		path   = require('path'),
		mailer = require("../../config/mailer"),
		emailTemplates = P.promisify(require('email-templates')),
	  templatesDir   = path.resolve(__dirname, 'email-templates');

function MailerService () {}

_.extend(MailerService.prototype, {
	sendWelcome: function(user) {
		var from      = "no-reply@trening.es",
		    subject   = "Welcome to Trening!",
				template  = "welcome";
		return sendEmail(from, user.email, subject, template, { user: user });
	},

	sendConfirmBooking: function(user, train, from, to) {
		var from      = "no-reply@trening.es",
		    subject   = "You can confirm your booking!",
				template  = "confirm-booking";
		return sendEmail(from, user.email, subject, template, { user: user, train: train, from: from, to: to });
	}
});

function sendEmail(from, to, subject, templateName, locals) {
	return emailTemplates(templatesDir).then(function(template) {
		return P.promisify(template)(templateName, locals);
	}).spread(function(html, text) {
		return mailer.sendMailAsync({
			from: from,
			to: to,
			subject: subject,
			text: text,
			html: html
		});
	});
}

module.exports = new MailerService();
