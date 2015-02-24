var P              = require('bluebird'),
    path           = require('path'),
    actions        = require('../test/actions'),
    dummies        = require('../test/dummies'),
    templatesDir   = path.resolve(__dirname, '../core/infrastructure/email-templates');
    emailTemplates = P.promisify(require('email-templates'));

var email = {
	welcomePreview: function (req, res) {
		var locals = { user: actions.newUser() };
		previewEmailHTML('welcome', locals).then(function(html) {
			res.send(html);
		});
	},

  confirmBooking: function(req, res) {
    var locals = {
      user:  actions.newUser(),
      train: actions.newTrain(),
      from:  actions.newStation(),
      to:    actions.newStation(dummies.dummyStation2())
    }
    previewEmailHTML('confirm-booking', locals).then(function(html) {
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
