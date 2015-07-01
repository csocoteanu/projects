var express    = require('express');
var bodyParser = require("body-parser");
var morgan     = require('morgan');

var app    = express();
var server = { }
var PORT   = process.env.PORT || 9090

app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

var cors = require('cors')

var app = express()
app.use(cors())

require('./routes.js')(app);

server = app.listen(PORT, '127.0.0.1', function () { } );

module.exports = server