var express = require('express');
var router = express.Router();
var ejs = require('ejs');
var twit = require('twit');
var config = require ('../config.js');
var ig = require('instagram-node').instagram();
var T = new twit(config);
var twitterParams = {
    q: '#rainbow',
    count: 50
};
router.get('/', function (req, res) {
  // this was to get the search term from the url and set it to the q: val in Params
  // but I took a different approach to demonstrate client and sever side skills
  // if(req.query.q == null || req.query.q == ' '){
  //   twitterParams.q =  '#rainbow';
  //   console.log('params.q 1 '+ twitterParams.q);
  // }else if(twitterParams.q == '#rainbow') {
  //   // params.q = req.query.q;
  //   twitterParams.q =  '#poo';
  //   console.log('params.q 2 '+ req.params);
  // }

  T.get('search/tweets', twitterParams, function(err, data, response) {
    ig.tag_search('query', function(err, result, remaining, limit) {
      console.log("hello "+result);
    });
    tweets = data.statuses;
    res.render('pages/index',{tweets:tweets});
  });
});


function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/login');
	};
};
module.exports = router;
