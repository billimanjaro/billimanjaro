var express = require('express');
var route = module.exports = express.Router();

var accountStub = {
	"id": "abc123",
	"owner": {
		"name": "Some Dude",
		"email": "test@example.com",
		"phone": "555-555-2424"
	},
	"disabled": false,
	"packages": [{
		"name": "Simple Webhosting",
		"id": "webhost-1",
		"visible": false,
		"interval": [
			{ "type": "month", "duration": 1, "price": 29.95 },
			{ "type": "year", "duration": 2, "price": 650.99 }
		],
		"features": [{
			"name": "Basic site",
			"id": "basic-site-no-frills",
			"class": "basic-site",
			"visible": false,
			"interval": [
				{ "type": "day", "duration": 1, "price": 1.5 },
				{ "type": "month", "duration": 1, "price": 29.95 },
				{ "type": "year", "duration": 1, "price": 350 }
			],
			"dependencies": ["basic-site"]
		}]
	}],
	"features": [{
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
	}, {
		"name": "Even moar users",
		"id": "user-increase-x2",
		"class": "users",
		"visible": true,
		"interval": [
			{ "type": "day", "duration": 1, "price": 1.5 },
			{ "type": "month", "duration": 1, "price": 29.95 },
			{ "type": "year", "duration": 1, "price": 350 }
		],
		"dependencies": ["basic-site"]
	}]
};

route.get('/', function (req, res) {
	res.status(200).send([accountStub, accountStub]);
});

route.get('/:id', function (req, res) {
	res.status(200).send(accountStub);
});

route.put('/:id', function (req, res) {
	res.status(200).send(accountStub);
});

route.post('/', function (req, res) {
	res.status(200).send(accountStub);
});

route.delete('/', function (req, res) {
	res.status(204).send();
});
