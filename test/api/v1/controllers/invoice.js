var assert = require('assert');
var spy = require('bondjs');
var proxyquire = require('proxyquire').noCallThru();

describe('v1 invoice api controller', function () {
	describe('list action', function () {
		it('should send a 200 with a list of invoices', function () {
			var sendMock = spy();
			var statusMock = spy().return({ 'send': sendMock });

			var requestMock = {};
			var responseMock = { status: statusMock };

			var controller = proxyquire('../../../../src/api/v1/controllers/invoice', {});

			controller.list(requestMock, responseMock);

			assert.equal(1, statusMock.called, 'status not called');
			assert.equal(true, statusMock.calledWith(200), 'status called with wrong code');
			assert.equal(1, sendMock.called, 'send not called');
			assert.equal(true, Array.isArray(sendMock.calledArgs[0]));
		});
	});
	describe('get action', function () {
		it('should send a 200 with a single invoice', function () {
			var sendMock = spy();
			var statusMock = spy().return({ 'send': sendMock });

			var requestMock = {};
			var responseMock = { status: statusMock };

			var controller = proxyquire('../../../../src/api/v1/controllers/invoice', {});

			controller.get(requestMock, responseMock);

			assert.equal(1, statusMock.called, 'status not called');
			assert.equal(true, statusMock.calledWith(200), 'status called with wrong code');
			assert.equal(1, sendMock.called, 'send not called');
			assert.equal(false, Array.isArray(sendMock.calledArgs[0][0]));
		});
	});
});
