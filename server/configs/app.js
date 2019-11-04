const argv = require('../util/argv');

module.exports = {
  port: parseInt(argv.port || process.env.PORT || '3000', 10),
  dbHost: process.env.MONGO_DB_URI || 'mongodb://localhost:27017/ci-cd-products'
};
