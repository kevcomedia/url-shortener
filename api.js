const express = require('express');

module.exports = function(models) {
  const api = express.Router();

  /*
    Stores a new URL to the database, and returns a shortened URL.
    If the URL is already stored, just look it up and return. 
   */
  api.get(/^\/new\/https?:\/\/.+/, function(req, res) {
    const original = /https?:\/\/.+/.exec(req.url)[0];

    const query = { original: original };
    const projection = { original: 1, shortened: 1, _id: 0 };
    models.Url.findOne(query, projection, function(err, doc) {
      if (err) {
        console.error(`Error finding doc with original URL '${original}'`);
        throw err;
      }

      if (!doc) {
        models.Url.count({}, function(err, count) {
          if (err) {
            console.error('Error counting docs');
            throw err;
          }

          const newUrl = {
            original: original,
            shortened: (count + 1).toString(36)
          };
          models.Url.create(newUrl, function(err, doc) {
            if (err) {
              console.error('Error creating new doc');
              throw err;
            }

            res.json(Object.assign({}, newUrl, { shortened: `${req.hostname}/${newUrl.shortened}` }));
          });
        });
      }
      else {
        res.json({
          original: doc.original,
          shortened: `${req.hostname}/${doc.shortened}`
        });
      }
    });
  });

  /*
    Returns an error message if `/new/` is followed by anything else.
   */
  api.get('/new/*', function(req, res) {
    res.status(400).json({ error: 'Your URL is invalid' });
  });

  /*
    Looks up the shortened URL in the database and redirects to the original if found.
   */
  api.get('/:shortened', function(req, res) {
    models.Url.findOne({ shortened: req.params.shortened }, function(err, url) {
      if (err) throw err;
      if (url) {
        res.redirect(302, url.original);
      }
      else {
        res.status(404).json({ error: 'Not found' });
      }
    });
  });

  return api;
};
