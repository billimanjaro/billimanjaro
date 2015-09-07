var log = require('util').debuglog('api');
var express = require('express');
var morgan = require('morgan');

var app = module.exports = express();
app.use(morgan('dev'));

app.use('/v1', require('./v1/routes'));

log('Starting api server on port ' + process.env.port);
app.listen(process.env.port);
