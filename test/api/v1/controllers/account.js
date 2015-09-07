var assert = require('assert');
var spy = require('bondjs');
var proxyquire = require('proxyquire').noCallThru();

describe('v1 account api controller', function () {
	describe('list action', function () {
		it('should send a 200 with a list of accounts', function () {
			var sendMock = spy();
			var statusMock = spy().return({ 'send': sendMock });

			var requestMock = {};
			var responseMock = { status: statusMock };

			var controller = proxyquire('../../../../src/api/v1/controllers/account', {});

			controller.list(requestMock, responseMock);

			assert.equal(1, statusMock.called, 'status not called');
			assert.equal(true, statusMock.calledWith(200), 'status called with wrong code');
			assert.equal(1, sendMock.called, 'send not called');
			assert.equal(true, Array.isArray(sendMock.calledArgs[0]));
		});
	});
	describe('get action', function () {
		it('should send a 200 with a single account', function () {
			var sendMock = spy();
			var statusMock = spy().return({ 'send': sendMock });

			var requestMock = {};
			var responseMock = { status: statusMock };

			var controller = proxyquire('../../../../src/api/v1/controllers/account', {});

			controller.get(requestMock, responseMock);

			assert.equal(1, statusMock.called, 'status not called');
			assert.equal(true, statusMock.calledWith(200), 'status called with wrong code');
			assert.equal(1, sendMock.called, 'send not called');
			assert.equal(false, Array.isArray(sendMock.calledArgs[0][0]));
		});
	});
	describe('put action', function () {
		it('should send a 200 with the updated account', function () {
			var sendMock = spy();
			var statusMock = spy().return({ 'send': sendMock });

			var requestMock = {};
			var responseMock = { status: statusMock };

			var controller = proxyquire('../../../../src/api/v1/controllers/account', {});

			controller.put(requestMock, responseMock);

			assert.equal(1, statusMock.called, 'status not called');
			assert.equal(true, statusMock.calledWith(200), 'status called with wrong code');
			assert.equal(1, sendMock.called, 'send not called');
			assert.equal(false, Array.isArray(sendMock.calledArgs[0][0]));
		});
	});
	describe('post action', function () {
		it('should send a 200 with the new account', function () {
			var sendMock = spy();
			var statusMock = spy().return({ 'send': sendMock });

			var requestMock = {};
			var responseMock = { status: statusMock };

			var controller = proxyquire('../../../../src/api/v1/controllers/account', {});

			controller.post(requestMock, responseMock);

			assert.equal(1, statusMock.called, 'status not called');
			assert.equal(true, statusMock.calledWith(200), 'status called with wrong code');
			assert.equal(1, sendMock.called, 'send not called');
			assert.equal(false, Array.isArray(sendMock.calledArgs[0][0]));
		});
	});
	describe('delete action', function () {
		it('should send a 204 with no content', function () {
			var sendMock = spy();
			var statusMock = spy().return({ 'send': sendMock });

			var requestMock = {};
			var responseMock = { status: statusMock };

			var controller = proxyquire('../../../../src/api/v1/controllers/account', {});

			controller.delete(requestMock, responseMock);

			assert.equal(1, statusMock.called, 'status not called');
			assert.equal(true, statusMock.calledWith(204), 'status called with wrong code');
			assert.equal(1, sendMock.called, 'send not called');
			assert.equal(undefined, sendMock.calledArgs[0][0]);
		});
	});
});
