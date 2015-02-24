var router         = require('express').Router(),
    authentication = require('./routes/authentication'),
    search         = require('./routes/search'),
    booking        = require('./routes/booking');
    email          = require('./routes/email');

router.get( '/signup', authentication.signupPage);
router.post('/signup', authentication.emailSignup);
router.get( '/login',  authentication.loginPage);
router.post('/login',  authentication.emailLogin);
router.get( '/auth/facebook', authentication.facebookConnect);
router.get( '/auth/facebook/callback', authentication.facebookCallback);
router.get( '/logout',   authentication.logout);
router.get( '/search',   isLoggedIn, search.searchPage);
router.post('/search',   isLoggedIn, search.search);
router.get( '/bookings', isLoggedIn, booking.getAll);
router.post('/bookings', isLoggedIn, booking.create);

// Routes for development
if (process.env.NODE_ENV != 'development') {
  router.get('/emails/welcome', email.welcomePreview);
  router.get('/emails/confirm-booking', email.confirmBooking);
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
};

module.exports = router;
