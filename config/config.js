function Config() {
  this.mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/trains_test';
  this.redisUrl = process.env.REDIS_URL || 'redis://localhost:6379/0';
  this.mailer = {
    host: process.env.SMTP_HOST || '127.0.0.1',
    port: process.env.SMTP_PORT ||  1025,
    username: process.env.SMTP_USERNAME,
    password: process.env.SMTP_PASSWORD
  }
};

module.exports = new Config();
