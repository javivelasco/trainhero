var dummies = {}

dummies.dummyStation = function() {
  return {
    id:   1,
    name: 'Mordor',
    code: '123456'
  };
};

dummies.dummyStation2 = function() {
  return {
    id:   2,
    name: 'Gondor',
    code: '789123'
  };
};

dummies.dummyTrain = function() {
  return {
    id:        1,
    name:      'AVE Hobbiton',
    date:      new Date('2013/12/20'),
    departure: '18:30',
    arrival:   '20:34',
    fromId:    dummies.dummyStation().id,
    toId:      dummies.dummyStation2().id
  };
};

dummies.dummyUser = function() {
  return {
    id:       1,
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

dummies.dummyBooking = function() {
  return {
    id:      1,
    userId:  dummies.dummyUser().id,
    trainId: dummies.dummyTrain().id
  }
};

module.exports = dummies;
