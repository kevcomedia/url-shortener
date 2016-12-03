module.exports = function(models) {
  const api = require('express').Router();
  const Urls = models.Urls;

  /*
    Stores a new URL to the database, and returns a shortened URL.
    If the URL is already stored, just look it up and return. 
   */
  api.get(/^\/new\/https?:\/\/.+/, function(req, res) {
    function respondWithShortened(doc) {
      res.json({
        original: doc.original,
        shortened: `https://${req.hostname}/${doc.shortened}`
      });
    }

    const original = /https?:\/\/.+/.exec(req.url)[0];
    Urls.findOne({
      original: original
    }, function(err, doc) {
      if (err) {
        console.error(`Error finding doc with original URL '${original}'`);
        throw err;
      }

      if (doc) {
        respondWithShortened(doc);
        return;
      }

      Urls.count({}, function(err, count) {
        if (err) {
          console.error('Error counting docs');
          throw err;
        }

        const newUrl = {
          original: original,
          shortened: (count + 1).toString(36)
        };
        Urls.create(newUrl, function(err, doc) {
          if (err) {
            console.error('Error creating new doc');
            throw err;
          }

          respondWithShortened(doc);
        });
      });
    });
  });

  /*
    Returns an error message if `/new/` is followed by anything else.
   */
  api.get('/new/*', function(req, res) {
    res.status(400).json({
      error: 'Your URL is invalid'
    });
  });

  /*
    Looks up the shortened URL in the database and redirects to the original if found.
   */
  api.get('/:shortened', function(req, res) {
    Urls.findOne({
      shortened: req.params.shortened
    }, function(err, doc) {
      if (err) {
        console.error(`Error finding doc with shortened URL '${req.params.shortened}'`);
        throw err;
      }

      if (doc) {
        res.redirect(302, doc.original);
      }
      else {
        res.status(404).json({
          error: 'Not found'
        });
      }
    });
  });

  return api;
};
