const mongoose = require('mongoose');

module.exports = function(dbUri) {
  mongoose.connect(dbUri);

  return {
    Url: mongoose.model('Url', require('./url-schema')),
    closeConnection: function() {
      mongoose.connection.close();
    }
  };
};
