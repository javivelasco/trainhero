function Config() {
  this.mongo_url = process.env.MONGO_URL || 'mongodb://localhost/trains_test';
  this.redis_url = process.env.REDIS_URL || 'redis://localhost:6379/0';
};

module.exports = new Config();
