var express = require('express');
var router = express.Router();
var ejs = require('ejs');
var twit = require('twit');
var config = require ('../config.js');
var T = new twit(config);
var params = {
    q: '#gayandproud',
    count: 50
};
router.get('/', function (req, res) {
  res.render('pages/index',{tweets:tweets});
});

T.get('search/tweets', params, gotData);

function gotData(err, data, response) {
    tweets = data.statuses;
   for (var i = 0; i<tweets.length; i++){
     console.log('Tweet number : ' + i);
     console.log('created at: ' + tweets[i].created_at);
     console.log('created by @'+tweets[i].user.screen_name);
     console.log(tweets[i].text);
    }
};

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/login');
	};
};
module.exports = router;
