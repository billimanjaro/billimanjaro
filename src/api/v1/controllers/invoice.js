var invoiceStub = {};

var status = require('http-status');

function InvoiceController() {/* this space intentionally left blank */}

InvoiceController.prototype.list = function (req, res) {
	res.status(status.OK).send([invoiceStub, invoiceStub, invoiceStub, invoiceStub]);
};

InvoiceController.prototype.get = function (req, res) {
	res.status(status.OK).send(invoiceStub);
};

module.exports = new InvoiceController();
