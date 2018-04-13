var express = require('express');
var router = express.Router();
var ejs = require('ejs');
var twit = require('twit');
//Include body-parser for middleware
var bodyParser = require( 'body-parser' )
//This sets bodyParser to act as middleware and go over all requests sent to your server
router.use( bodyParser.json() );
var config = require ('../config.js');
var T = new twit(config);

//get based on search term, count, location, etc
router.post('/api', function (req, res) {
    var search = req.body.search;
    T.get('search/tweets', { q: search, count: 100}, function(err, data, response) {
    res.send(data);
  });
});

module.exports = router;
