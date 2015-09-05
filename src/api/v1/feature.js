var express = require('express');
var route = module.exports = express.Router();

route.get('/', function (req, res) {
	res.send(200).send([]);
});

route.get('/:id', function (req, res) {
	res.send(200).send({});
});

route.post('/', function (req, res) {
	res.send(200).send({});
});

route.delete('/', function (req, res) {
	res.send(204).send();
});
