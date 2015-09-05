var route = require('express').Router();

['account', 'feature', 'invoice', 'package'].forEach(function (resource) {
	route.use('/' + resource, require('./' + resource));
});

module.exports = route;