var invoiceStub = {};

function InvoiceController() {/* this space intentionally left blank */}

var proto = InvoiceController.prototype;

proto.list = function (req, res) {
	res.status(200).send([invoiceStub, invoiceStub, invoiceStub, invoiceStub]);
};

proto.get = function (req, res) {
	res.status(200).send([invoiceStub, invoiceStub, invoiceStub, invoiceStub]);
};

module.exports = new InvoiceController();
