const express = require('express');
const app = express();
const models = require('./models')(process.env.MLAB_URI);

app.use('/', express.static('public'));

app.use('/', require('./api')(models));

app.listen(8080, function() {
  console.log('App is live at 8080');
});
