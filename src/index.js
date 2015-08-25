var express = require('express');

var app = module.exports = express();

app.listen(process.env.npm_package_config_port);
