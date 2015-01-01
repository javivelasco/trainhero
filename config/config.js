function Config() {
  this.mongo_url = process.env.MONGO_URL || 'mongodb://localhost/trains_test';
};

module.exports = new Config();
