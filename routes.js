'use strict'

var express = require('express');
var router  = express.Router();

var renfe   = require('./core/services/renfe_service');

// Route middleware that will happen on every request
router.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});

router.get('/search', function (req, res) {
  res.render('search', {stations: renfe.getAllStations()});
});

router.post('/search', function (req, res) {
  var fromId        = req.body.fromId;
  var toId          = req.body.toId;
  var departureDate = req.body.departureDate;

  renfe.search(fromId, toId, departureDate, function(trains) {
    res.render('index', {trains: trains});
  });
});

module.exports = router;
