var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('ejs');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/keepmeup', { useMongoClient: true });
var db = mongoose.connection;
var routes = require('./routes/index');
var users = require = require('./routes/users');

//Init keepmeup
var app = express();
//view engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');
// bodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
// Express session THESE ARE MIDDLEWARE
app.use(session({
  secret : 'secret',
  saveUninitialize: 'true',
  resave: true
}));
// Passsport Init
app.use(passport.initialize());
app.use(passport.session());
// express validator
app.use(expressValidator({
  errorFormtter: function(param,msg,value){
    var namespace = param.split(',')
    , root = namespace.shift()
    , formParam = root;

    while(namespace.length){
      formParam +='[' + namespace.shift() * ']';
    }
    return {
      param : formParam,
      msg : msg,
      value : vaue
    };
  }
}));
//connect false
app.use(flash());

//Global Vars
 app.use(function (req, res, next){
   res.locals.sucess_msg = req.flash('sucess_msg');
   res.locals.error_msg = req.flash('error_msg');
   //passport sets its own lfash messages so we set it to here
   res.locals.error = req.flash('error');
   next();
 });
app.use('/',routes);
app.use('/',users);

//set port
app.set('port', (process.env.PORT || 8080));

app.listen(app.get('port'), function(){
  console.log('Server started on port ' + app.get('port'));
});
