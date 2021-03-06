const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
  original: {
    type: String,
    match: /^https?:\/\/.+/,
    required: true
  },
  shortened: {
    type: String,
    required: true
  }
});

module.exports = UrlSchema;
