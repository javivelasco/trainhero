var helper  = require('../core/helper'),
    moment  = require('moment'),
    dummies = {}

dummies.dummyStation = function() {
  return {
    id:   '1',
    name: 'Mordor',
    code: '123456'
  };
};

dummies.dummyStation2 = function() {
  return {
    id:   '2',
    name: 'Gondor',
    code: '789123'
  };
};

dummies.dummyTrainTimes = function() {
  return {
    departureDateString: '19/12/2014',
    arrivalDateString:   '19/12/2014',
    departureHourString: '07:00',
    arrivalHourString:   '08:42'
  }
};

dummies.dummyUser = function() {
  return {
    id:       '1',
    name:     'Omar',
    lastname: 'Little',
    email:    'omarlittle@thewire.com',
    password: 'super-secret',
    facebook: dummies.dummyAuthorization()
  }
};

dummies.dummyAuthorization = function() {
  return {
    uid:      'UIDfromVendor',
    token:    'TokenFromVendor',
    provider: 'facebook'
  }
};

dummies.dummyRenfeTrain = function() {
  return {
    name:      dummies.dummyTrain().name,
    departure: '18:30',
    arrival:   '20:23',
    price:     '19.2',
    signature: 'testsignaturethatdoesntwork'
  }
};

dummies.dummyTrain = function() {
  var t = dummies.dummyTrainTimes();
  return {
    id:        '1',
    name:      'AVE Hobbiton',
    price:     19.2,
    departure: helper.renfeDatetimeToDate(t.departureDateString, t.departureHourString),
    arrival:   helper.renfeDatetimeToDate(t.arrivalDateString,   t.arrivalHourString),
    fromId:    dummies.dummyStation().id,
    toId:      dummies.dummyStation2().id,
    bookings:  [ dummies.dummyBooking() ]
  };
};

dummies.dummyBooking = function() {
  return {
    userId:    dummies.dummyUser().id,
    createdAt: moment('01/02/2015 12:34', "DD/MM/YYYY HH:mm").toDate(),
    chargeId:  'external_charge_id',
    paidAt:    moment('20/02/2015 12:34', "DD/MM/YYYY HH:mm").toDate()
  }
};

module.exports = dummies;
