const express = require('express');
const app = express();

app.use('/', express.static('public'));

app.use('/', require('./api')(require('./models')));

app.listen(8080, function() {
  console.log('App is live at 8080');
});
