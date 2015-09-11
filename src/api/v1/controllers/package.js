var packageStub = {
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
		"dependencies": ["basic-site"]
	}]
};

var status = require('http-status');

function PackageController() {/* this space intentionally left blank */}

PackageController.prototype.list = function (req, res) {
	res.status(status.OK).send([packageStub, packageStub, packageStub]);
};

PackageController.prototype.get = function (req, res) {
	res.status(status.OK).send(packageStub);
};

PackageController.prototype.post = function (req, res) {
	res.status(status.OK).send(packageStub);
};

PackageController.prototype.delete = function (req, res) {
	res.status(status.NO_CONTENT).send();
};

module.exports = new PackageController();
