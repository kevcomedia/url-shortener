const express = require('express');
const app = express();
const models = require('./models')(process.env.MLAB_URI);
const api = require('./api')(models);

app.use('/', express.static(__dirname + '/public'), api);

const port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log(`App is live at ${port}`);
});
