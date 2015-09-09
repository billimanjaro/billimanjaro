var assert = require('assert');
var spy = require('bondjs');
var proxyquire = require('proxyquire').noCallThru();

describe('v1 package api controller', function () {
	describe('list action', function () {
		it('should send a 200 with a list of packages', function () {
			var sendMock = spy();
			var statusMock = spy().return({ 'send': sendMock });

			var requestMock = {};
			var responseMock = { status: statusMock };

			var controller = proxyquire('../../../../src/api/v1/controllers/package', {});

			controller.list(requestMock, responseMock);

			assert.equal(1, statusMock.called, 'status not called');
			assert.equal(true, statusMock.calledWith(200), 'status called with wrong code');
			assert.equal(1, sendMock.called, 'send not called');
			assert.equal(true, Array.isArray(sendMock.calledArgs[0]));
		});
	});
	describe('get action', function () {
		it('should send a 200 with a single package', function () {
			var sendMock = spy();
			var statusMock = spy().return({ 'send': sendMock });

			var requestMock = {};
			var responseMock = { status: statusMock };

			var controller = proxyquire('../../../../src/api/v1/controllers/package', {});

			controller.get(requestMock, responseMock);

			assert.equal(1, statusMock.called, 'status not called');
			assert.equal(true, statusMock.calledWith(200), 'status called with wrong code');
			assert.equal(1, sendMock.called, 'send not called');
			assert.equal(false, Array.isArray(sendMock.calledArgs[0][0]));
		});
	});
	describe('post action', function () {
		it('should send a 200 with the new package', function () {
			var sendMock = spy();
			var statusMock = spy().return({ 'send': sendMock });

			var requestMock = {};
			var responseMock = { status: statusMock };

			var controller = proxyquire('../../../../src/api/v1/controllers/package', {});

			controller.post(requestMock, responseMock);

			assert.equal(1, statusMock.called, 'status not called');
			assert.equal(true, statusMock.calledWith(200), 'status called with wrong code');
			assert.equal(1, sendMock.called, 'send not called');
			assert.equal(false, Array.isArray(sendMock.calledArgs[0][0]));
		});
	});
	describe('delete action', function () {
		context('when successful', function () {
			var sendMock = spy();
			var statusMock = spy().return({ 'send': sendMock });

			var requestMock = {};
			var responseMock = { status: statusMock };

			var controller = proxyquire('../../../../src/api/v1/controllers/package', {});

			controller.delete(requestMock, responseMock);

			it('should send a 204', function() {
				assert.equal(1, statusMock.called, 'status not called');
				assert.equal(true, statusMock.calledWith(204), 'status called with wrong code');
			});

			it('should have no content', function () {
				assert.equal(1, sendMock.called, 'send not called');
				assert.equal(undefined, sendMock.calledArgs[0][0]);
			});
		});
		context('when unsuccessful', function () {
			it('should respond with a 404 for not found');
			it('should respond with a 520 for all other cases');
		});
	});
});
