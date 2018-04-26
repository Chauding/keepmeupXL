var express = require('express');
var router = express.Router();
var ejs = require('ejs');
var twit = require('twit');
var config = require ('../config.js');
var ig = require('instagram-node').instagram();
var User = require('../models/user');
var T = new twit(config);
// setting inital twitter search parameters q == query value count == number of data returned
var twitterParams = {
    q: 'RGU',
    count: 50
};
router.get('/',ensureAuthenticated, function (req, res) {
  // this was to get the search term from the url and set it to the q: val in Params
  // but I took a different approach to demonstrate client and sever side skills
  // if(req.query.q == null || req.query.q == ' '){
  //   twitterParams.q =  '#rainbow';
  //   console.log('params.q 1 '+ twitterParams.q);
  // }else if(twitterParams.q == '#rainbow') {
  //   // params.q = req.query.q;
  //   twitterParams.q =  '#RGU';
  //   console.log('params.q 2 '+ req.params);
  // }
console.log(req.user);
    // note that data is an array of objects, not a single object!
    T.get('search/tweets', twitterParams, function(err, data, response) {
      // ig.tag_search('query', function(err, result, remaining, limit) {
      //   console.log("hello "+result);
      // });
      // creates variable, user, to store the requested user data
      user = req.user;
      // creates variable, tweets, that gets the json data from the T.get method above
      tweets = data.statuses;
      res.render('pages/index',{tweets:tweets, user:user});

  });
});
// application-level middleware: to check if the user is logged in beofre entering the site
function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/login');
	};
};
module.exports = router;
