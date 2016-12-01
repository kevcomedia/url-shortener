const express = require('express');
const app = express();

app.use('/', require('./api')(require('./models')));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(8080, function() {
  console.log('App is live at 8080');
});
