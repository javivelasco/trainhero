var _       = require('lodash'),
    Promise = require("bluebird"),
    db      = require('../../mongo').db;

function MongoRepository() {
  var self = this;

  self._collection = db.collection(self.collection);
  self._model      = self.model;
};

_.extend(MongoRepository.prototype, {
  findOneById: function(id, callback) {
    var instance = this;
    this._collection.findOne({_id: id}, function(err, result) {
      if (err) return callback(err);
      if (result) result = build(result, instance)
      callback(null, result);
    });
  },

  put: function(item, callback) {
    var instance   = this;
    var attributes = item.toJSON()
    delete attributes['id']

    instance._collection.find({_id: item.id}, function(err, result) {
      if (err) return callback(err);
      result.count(function(err, result) {
        if (err) return callback(err);
        if (result === 0) {
          createRecord(item.id, attributes, instance, callback);
        } else {
          updateRecord(item.id, attributes, instance, callback);
        };
      });
    });
  }
});

var createRecord = function(id, attributes, instance, callback) {
  if (id)  attributes['_id'] = id;
  instance._collection.insert(attributes, function(err, result) {
    err ? callback(err) : callback(null, build(result[0], instance))
  });
};

var updateRecord = function(id, attributes, instance, callback) {
  instance._collection.update({_id: id}, {$set: attributes}, function(err, result, item) {
    attributes['_id'] = id
    err ? callback(err) : callback(null, build(attributes, instance))
  });
};

var build = function(record, instance) {
  record['id'] = record['_id'];
  delete record['_id'];
  return new instance._model(record);
};

Promise.promisifyAll(MongoRepository.prototype);

MongoRepository.extend = require('simple-extend');
module.exports         = MongoRepository;
