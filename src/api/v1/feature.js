var express = require('express');
var route = module.exports = express.Router();

var featureStub = {
	"name": "More users",
	"id": "user-increase",
	"class": "users",
	"visible": true,
	"interval": [
		{ "type": "day", "duration": 1, "price": 1.5 },
		{ "type": "month", "duration": 1, "price": 29.95 },
		{ "type": "year", "duration": 1, "price": 350 }
	],
	"dependencies": ["basic-site"]
};

route.get('/', function (req, res) {
	res.send(200).send([featureStub, featureStub, featureStub, featureStub, featureStub]);
});

route.get('/:id', function (req, res) {
	res.send(200).send(featureStub);
});

route.post('/', function (req, res) {
	res.send(200).send(featureStub);
});

route.delete('/', function (req, res) {
	res.send(204).send();
});
