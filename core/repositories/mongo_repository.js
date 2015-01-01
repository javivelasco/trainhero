var _         = require('lodash'),
    Promise   = require("bluebird"),
    mongoskin = require('mongoskin'),
    db        = require('../../mongo').db;

function MongoRepository() {
  var self = this;
  self._collection = db.collection(self.collection);
  self._model      = self.model;
};

_.extend(MongoRepository.prototype, {
  findOneBy: function(args) {
    var instance = this;
    return this._collection.findOneAsync(args).then(function(result) {
      return Promise.resolve(build(result, instance));
    });
  },

  findOneById: function(id) {
    return this.findOneBy({_id: mongoskin.ObjectID(id)})
  },

  put: function(item) {
    var instance   = this,
        attributes = item.toJSON();
    delete attributes['id'];

    return instance._collection.findAsync({_id: item.id}).then(function(result) {
      Promise.promisifyAll(result);
      return result.countAsync().then(function(result) {
        if (result === 0) {
          return createRecord(item.id, attributes, instance);
        } else {
          return updateRecord(item.id, attributes, instance);
        };
      });
    });
  }
});

var createRecord = function(id, attributes, instance) {
  if (id)  attributes['_id'] = id;
  return instance._collection.insertAsync(attributes).then(function(result) {
    return Promise.resolve(build(result[0], instance));
  });
};

var updateRecord = function(id, attributes, instance) {
  return instance._collection.updateAsync({_id: id}, {$set: attributes}).then(function(result) {
    attributes['_id'] = id
    return Promise.resolve(build(attributes, instance));
  });
};

var build = function(record, instance) {
  if (record == null) return null;
  record['id'] = record['_id'];
  delete record['_id'];
  return new instance._model(record);
};

MongoRepository.extend = require('simple-extend');
module.exports         = MongoRepository;
