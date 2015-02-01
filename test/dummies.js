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
    departureDateString: '20/12/2013',
    arrivalDateString:   '20/12/2013',
    departureHourString: '11:35',
    arrivalHourString:   '14:22'
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
    departure: helper.renfeDatetimeToDate(t.departureDateString, t.departureHourString),
    arrival:   helper.renfeDatetimeToDate(t.arrivalDateString,   t.arrivalHourString),
    fromId:    dummies.dummyStation().id,
    toId:      dummies.dummyStation2().id
  };
};

dummies.dummyBooking = function() {
  return {
    userId:    dummies.dummyUser().id,
    createdAt: moment('01/02/2015 12:34', "DD/MM/YYYY HH:mm").toDate()
  }
};


module.exports = dummies;
