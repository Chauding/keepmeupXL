var express = require('express');
var router = express.Router();
var ejs = require('ejs');
var twit = require('twit');
//Include body-parser for middleware
var bodyParser = require( 'body-parser' )
//This sets bodyParser to act as middleware and go over all requests sent to your server
router.use( bodyParser.json() );
router.use(express.urlencoded());
var config = require ('../config.js');
var twitterAPI = new twit(config);

//get based on search term, count, location, etc
router.post('/', function (req, res) {
    var search = req.body.search;
    console.log('search ****');
    console.log(search);
      console.log('search ****');
    twitterAPI.get('search/tweets', { q: search, count: 2}, function(err, data, response) {
      res.send(search);
      var tweets = data.statuses;
      console.log(tweets);
    });
});

module.exports = router;
