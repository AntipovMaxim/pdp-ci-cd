const { Schema } = require('mongoose');

const productSchema = new Schema({
  name: String,
}, {
  timestamps: true,
});

module.exports = productSchema;
