var invoiceStub = {};

function InvoiceController() {/* this space intentionally left blank */}

InvoiceController.prototype.list = function (req, res) {
	res.status(200).send([invoiceStub, invoiceStub, invoiceStub, invoiceStub]);
};

InvoiceController.prototype.get = function (req, res) {
	res.status(200).send(invoiceStub);
};

module.exports = new InvoiceController();
