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

dummies.dummyDate = function() {
  return new Date('12/25/2015');
}

dummies.dummyTrain = function() {
  return {
    id:        1,
    name:      'AVE Hobbiton',
    departure: '18:30',
    arrival:   '20:34',
    fromId:    dummies.dummyStation().id,
    toId:      dummies.dummyStation2().id,
    date:      dummies.dummyDate()
  };
}

module.exports = dummies;
