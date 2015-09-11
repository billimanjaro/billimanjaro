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
			{ "type": "month", "duration": 1, "price": 29.95, "selected": true },
			{ "type": "year", "duration": 2, "price": 650.99 }
		],
		"features": [{
			"name": "Basic site",
			"id": "basic-site-no-frills",
			"class": "basic-site",
			"visible": false,
			"dependencies": ["basic-site"]
		}]
	}]
};

var status = require('http-status');

function AccountController() {/* this space intentionally left blank */}

AccountController.prototype.list = function (req, res) {
	res.status(status.OK).send([accountStub, accountStub]);
};

AccountController.prototype.get = function (req, res) {
	res.status(status.OK).send(accountStub);
};

AccountController.prototype.put = function (req, res) {
	res.status(status.OK).send(accountStub);
};

AccountController.prototype.post = function (req, res) {
	res.status(status.OK).send(accountStub);
};

AccountController.prototype.delete = function (req, res) {
	res.status(status.NO_CONTENT).send();
};

module.exports = new AccountController();
