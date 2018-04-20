var express = require('express');
var router = express.Router();
var ejs = require('ejs');
var twit = require('twit');
var ig = require('instagram-node').instagram();
//Include body-parser for middleware
var bodyParser = require( 'body-parser' )
//This sets bodyParser to act as middleware and go over all requests sent to your server
router.use( bodyParser.json() );
router.use(express.urlencoded());
var config = require ('../config.js');
var twitterAPI = new twit(config);

ig.use({ access_token: '12930071.4771b68.7c3097a46b484a63aaf31632aca9cb65' });
ig.use({ client_id: 'cdba839f56bc4d17a663a5e94d6ef5a4',
         client_secret: '625b44ef32824f25882c89c56880d965' });
//get based on search term, count, location, etc
router.post('/', function (req, res) {
    var search = req.body.search;
    console.log('search ****');
    console.log(search);

    twitterAPI.get('search/tweets', { q: search, count: 50}, function(err, data, response) {
      var tweets = data.statuses;
      // console.log(tweets);
      res.render('pages/twitterColumn',{tweets:tweets});
    });
});


module.exports = router;
