var express = require('express');
var route = module.exports = express.Router();

var invoiceStub = {};

route.get('/', function (req, res) {
	res.status(200).send([invoiceStub, invoiceStub, invoiceStub, invoiceStub]);
});

route.get('/:id', function (req, res) {
	res.status(200).send(invoiceStub);
});
