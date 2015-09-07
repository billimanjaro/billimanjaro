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

function FeatureController() {/* this space intentionally left blank */}

FeatureController.prototype.list = function (req, res) {
	res.status(200).send([featureStub, featureStub, featureStub, featureStub, featureStub]);
};

FeatureController.prototype.get = function (req, res) {
	res.status(200).send(featureStub);
};

FeatureController.prototype.post = function (req, res) {
	res.status(200).send(featureStub);
};

FeatureController.prototype.delete = function (req, res) {
	res.status(204).send();
};

module.exports = new FeatureController();
