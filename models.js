const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test');

const Url = mongoose.model('Url', require('./url-schema'));

module.exports.Url = Url;
