const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test');
mongoose.Promise = global.Promise;

const Url = mongoose.model('Url', require('./url-schema'));

module.exports.Url = Url;
