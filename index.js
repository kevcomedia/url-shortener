const express = require('express');
const app = express();
const models = require('./models')(process.env.MLAB_URI);
const api = require('./api')(models);

app.use('/', express.static('public'), api);

app.listen(8080, function() {
  console.log('App is live at 8080');
});
