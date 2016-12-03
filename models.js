const mongoose = require('mongoose');

module.exports = function(dbUri) {
  mongoose.connect(dbUri);

  process.on('SIGINT', function() {
    mongoose.connection.close(function() {
      console.log('Mongoose disconnected through app termination');
      process.exit(0);
    });
  });

  return {
    Url: mongoose.model('Url', require('./url-schema')),
    closeConnection: function() {
      mongoose.connection.close();
    }
  };
};
