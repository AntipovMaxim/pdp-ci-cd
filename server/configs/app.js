const argv = require('../util/argv');

module.exports = {
  port: parseInt(argv.port || process.env.PORT || '3000', 10),
  dbHost: 'mongodb://localhost:27017/ci-cd-products'
};
