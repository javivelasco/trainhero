var P      = require('bluebird'),
    path   = require('path'),
    templatesDir   = path.resolve(__dirname, '../core/infrastructure/email-templates');
    emailTemplates = P.promisify(require('email-templates'));

var email = {
	welcomePreview: function (req, res) {
		var locals  = {name: "Perico"};
		previewEmailHTML('welcome', locals).then(function(html) {
			res.send(html);
		});
	}
};

function previewEmailHTML(templateName, locals) {
	return emailTemplates(templatesDir).then(function(template) {
		return P.promisify(template)(templateName, locals);
	}).spread(function(html, text) {
		return P.resolve(html);
	});
}

module.exports = email;
