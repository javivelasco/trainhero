var config = require('./config'),
    stripe = require('stripe')(config.stripeSecretKey);

module.exports = stripe;
