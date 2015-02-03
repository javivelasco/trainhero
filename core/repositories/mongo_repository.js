var _         = require('lodash'),
    P         = require("bluebird"),
    moment    = require("moment"),
    mongoskin = require('mongoskin'),
    db        = require('../../config/mongo').db;

function MongoRepository() {
  var self = this;
  self._collection  = db.collection(self.collection);
  self._model       = self.model;
  self._timestamped = self.timestamped;
}

_.extend(MongoRepository.prototype, {
  find: function(args) {
    var instance = this;
    return this._collection.findAsync(args).then(function(cursor) {
      P.promisifyAll(cursor);
      return cursor.toArrayAsync().then(function(result) {
        return P.resolve(_.map(result, function(item) {
          return build(item, instance);
        }));
      });
    });
  },

  findOneBy: function(args) {
    var instance = this;
    return this._collection.findOneAsync(args).then(function(result) {
      return P.resolve(build(result, instance));
    });
  },

  findOneById: function(id) {
    return this.findOneBy({_id: id});
  },

  put: function(item) {
    var instance   = this,
        attributes = prepareAttributes(item, instance);

    return instance._collection.findAsync({_id: item.id}).then(function(result) {
      P.promisifyAll(result);
      return result.countAsync().then(function(result) {
        if (result === 0) {
          return createRecord(item.id, attributes, instance);
        } else {
          return updateRecord(item.id, attributes, instance);
        }
      });
    });
  },

  clear: function() {
    return this._collection.removeAsync();
  }
});

var createRecord = function(id, attributes, instance) {
  if (id) attributes._id = id;
  return instance._collection.insertAsync(attributes).then(function(result) {
    return P.resolve(build(result[0], instance));
  });
};

var updateRecord = function(id, attributes, instance) {
  return instance._collection.updateAsync({_id: id}, {$set: attributes}).then(function(result) {
    attributes._id = id;
    return P.resolve(build(attributes, instance));
  });
};

var prepareAttributes = function(item, instance) {
  var attributes = item.toJSON();
  delete attributes.id;
  if (instance._timestamped) addTimestamps(attributes);
  return attributes;
};

var addTimestamps = function(attributes) {
  attributes.createdAt = attributes.createdAt || moment().toDate();
  attributes.updatedAt = moment().toDate();
};

var build = function(record, instance) {
  if (record === null) return null;
  record.id = record._id;
  delete record._id;
  return new instance._model(record);
};

MongoRepository.extend = require('simple-extend');
module.exports         = MongoRepository;
