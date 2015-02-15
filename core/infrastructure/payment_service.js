var config = require('../../config/config'),
    _      = require('lodash'),
    stripe = require('stripe')(config.stripeSecretKey);

function PaymentService() {}

_.extend(PaymentService.prototype, {
  createBlockedCharge: function(stripeToken, amount, description, metadata) {
    var charge = {
      amount:      amount*100,
      card:        stripeToken,
      description: description,
      metadata:    metadata,
      capture:     false,
      currency:    'eur',
    };

    return stripe.charges.create(charge).then(function(charge) {
      P.resolve(charge.id);
    });
  }
});

module.exports = new PaymentService();
