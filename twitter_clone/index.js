var express = require('express');
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');


var app = express();
var server = { }
var PORT = process.env.PORT || 8080

var DB_URL = "mongodb://127.0.0.1:27017"
console.log("===> DB URL: " + DB_URL);
mongoose.connect(DB_URL);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./routes.js')(app, passport);
require('./login')(passport); 

server = app.listen(PORT, '127.0.0.1',function () { } );

module.exports = server
