var express = require('express');
var router = express.Router();
var ejs = require('ejs');
var twit = require('twit');
var config = require ('../config.js');
var T = new twit(config);

var params = {
    q: '#gaypride',
    count: 50
};
router.get('/', function (req, res) {
  params.q = req.query.q;
  T.get('search/tweets', params, function(err, data, response) {
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
