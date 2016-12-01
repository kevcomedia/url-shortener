const mongoose = require('mongoose');

const dbUri = 'mongodb://localhost:27017/test';
mongoose.connect(dbUri);

mongoose.connection.on('connected', function() {
  console.log(`Connected to ${dbUri}`);
});

mongoose.connection.on('error', function(err) {
  console.error(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', function() {
  console.log('Mongoose connection disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log('App termination: Mongoose disconnected.');
    process.exit(0);
  });
});

const Url = mongoose.model('Url', require('./url-schema'));

module.exports.Url = Url;
