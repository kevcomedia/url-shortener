const mongoose = require('mongoose');

const dbUri = 'mongodb://localhost:27017/test';
mongoose.connect(dbUri);

process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});

const Url = mongoose.model('Url', require('./url-schema'));

module.exports.Url = Url;
module.exports.closeConnection = function() {
  mongoose.connection.close();
};
