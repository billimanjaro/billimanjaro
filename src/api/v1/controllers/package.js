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

var proto = PackageController.prototype;

proto.list = function (req, res) {
	res.status(200).send([packageStub, packageStub, packageStub]);
};

proto.get = function (req, res) {
	res.status(200).send(packageStub);
};

proto.post = function (req, res) {
	res.status(200).send(packageStub);
};

proto.delete = function (req, res) {
	res.status(204).send();
};

module.exports = new PackageController();
