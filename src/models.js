const mongoose = require('mongoose');

module.exports = function(dbUri) {
  mongoose.connect(dbUri);

  return {
    Urls: mongoose.model('Url', require('./url-schema'), 'urls'),
    closeConnection: function() {
      mongoose.connection.close();
    }
  };
};
