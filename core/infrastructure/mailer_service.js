var dotenv = require('dotenv').load(),
		_      = require('lodash'),
		P      = require('bluebird'),
		path   = require('path'),
		mailer = require("../../config/mailer"),
		emailTemplates = P.promisify(require('email-templates')),
	  templatesDir   = path.resolve(__dirname, 'email-templates');

function MailerService () {}

_.extend(MailerService.prototype, {
	sendWelcomeEmail: function(toEmail, name) {
		var fromEmail = "hi@trening.es",
		    subject   = "Welcome to Trening!",
				template  = "welcome";
		return sendEmail(fromEmail, toEmail, subject, template, { name: name });
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
