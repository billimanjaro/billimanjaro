var featureStub = {
	"name": "More users",
	"id": "user-increase",
	"class": "users",
	"visible": true,
	"dependencies": ["basic-site"]
};

var status = require('http-status');

function FeatureController() {/* this space intentionally left blank */}

FeatureController.prototype.list = function (req, res) {
	res.status(status.OK).send([featureStub, featureStub, featureStub, featureStub, featureStub]);
};

FeatureController.prototype.get = function (req, res) {
	res.status(status.OK).send(featureStub);
};

FeatureController.prototype.post = function (req, res) {
	res.status(status.OK).send(featureStub);
};

FeatureController.prototype.delete = function (req, res) {
	res.status(status.NO_CONTENT).send();
};

module.exports = new FeatureController();
