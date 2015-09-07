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
		"interval": [
			{ "type": "day", "duration": 1, "price": 1.5 },
			{ "type": "month", "duration": 1, "price": 29.95 },
			{ "type": "year", "duration": 1, "price": 350 }
		],
		"dependencies": ["basic-site"]
	}]
};

function PackageController() {/* this space intentionally left blank */}

PackageController.prototype.list = function (req, res) {
	res.status(200).send([packageStub, packageStub, packageStub]);
};

PackageController.prototype.get = function (req, res) {
	res.status(200).send(packageStub);
};

PackageController.prototype.post = function (req, res) {
	res.status(200).send(packageStub);
};

PackageController.prototype.delete = function (req, res) {
	res.status(204).send();
};

module.exports = new PackageController();
