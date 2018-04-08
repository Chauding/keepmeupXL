var express = require('express');
var router = express.Router();
var ejs = require('ejs');
var twit = require('../twit.js');
//get homgpage
router.get('/', function(req, res){
  res.render('pages/index');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/login');
	}
}
module.exports = router;
