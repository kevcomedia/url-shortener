const express = require('express');
const superagent = require('superagent');
const expect = require('chai').expect;
const assert = require('chai').assert;

describe('URL Shortener API', function() {
  var server;
  var Urls;

  before(function() {
    const app = express();
    const models = require('./models');
    app.use(require('./api')(models));

    server = app.listen(8081);
    Urls = models.Url;
  });

  after(function() {
    server.close();
  });

  beforeEach(function(done) {
    Urls.remove({}, function(err) {
      assert.ifError(err);
      done();
    });
  });

  it('should save a new URL', function(done) {
    const original = 'https://example.com';
    superagent.get(`localhost:8081/new/${original}`, function(err, res) {
      assert.ifError(err);
      var result;
      assert.doesNotThrow(function() {
        result = JSON.parse(res.text);
      });
      assert.isOk(result);
      expect(result.original).to.equal(original);
      expect(result.shortened).to.equal('localhost/1');
      done();
    });
  });

  it('should retrieve a saved URL if already stored', function(done) {
    const original = 'https://example.com';
    Urls.create({
      original: original,
      shortened: '1'
    }, function(err, doc) {
      assert.ifError(err);
      superagent.get(`localhost:8081/new/${original}`, function(err, res) {
        assert.ifError(err);
        var result;
        assert.doesNotThrow(function() {
          result = JSON.parse(res.text);
        });
        assert.isOk(result);
        expect(result.shortened).to.equal('localhost/1');
        done();
      });
    });
  });

  it('should return the original URL and the shortened URL', function(done) {
    const original = 'https://example.com';
    superagent.get(`localhost:8081/new/${original}`, function(err, res) {
      assert.ifError(err);
      var result;
      assert.doesNotThrow(function() {
        result = JSON.parse(res.text);
      });
      assert.ok(result);
      expect(result.original).to.equal(original);
      expect(result.shortened).to.equal('localhost/1');
      done();
    });
  });

  it('should return an error JSON if original URL is invalid', function(done) {
    superagent.get('localhost:8081/new/invalid', function(err, res) {
      try {
        assert.ifError(err);
      }
      catch (e) {
        var result;
        assert.doesNotThrow(function() {
          result = JSON.parse(res.text);
        });
        assert.isOk(result);
        expect(result.error).to.equal('Your URL is invalid');
        done();
      }
    });
  });

  it('should return an error JSON if shortened URL is not found', function(done) {
    superagent.get('localhost:8081/0', function(err, res) {
      try {
        assert.ifError(err);
      }
      catch (e) {
        var result;
        assert.doesNotThrow(function() {
          result = JSON.parse(res.text);
        });
        assert.isOk(result);
        expect(result.error).to.equal('Not found');
        done();
      }
    });
  });
});
