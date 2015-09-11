var assert = require('assert');
var spy = require('bondjs');
var proxyquire = require('proxyquire').noCallThru();

describe('v1 feature api controller', function () {
	describe('list action', function () {
		context('when successful', function () {
			var sendMock = spy();
			var statusMock = spy().return({ 'send': sendMock });

			var requestMock = {};
			var responseMock = { status: statusMock };

			var controller = proxyquire('../../../../src/api/v1/controllers/feature', {});

			controller.list(requestMock, responseMock);

			it('should send a 200', function () {
				assert.equal(1, statusMock.called, 'status not called');
				assert.equal(true, statusMock.calledWith(200), 'status called with wrong code');
			});

			it('should send a list of features', function () {
				assert.equal(1, sendMock.called, 'send not called');
				assert.equal(true, Array.isArray(sendMock.calledArgs[0]));
			});
		});

		context('when none found', function () {
			it('should respond with a 404');
			it('should have no content');
		});

		context('when unsuccessful', function () {
			it('should respond with a 520');
			it('should have an error code (TBD) in the body');
		});
	});
	describe('get action', function () {
		context('when successful', function () {
			var sendMock = spy();
			var statusMock = spy().return({ 'send': sendMock });

			var requestMock = {};
			var responseMock = { status: statusMock };

			var controller = proxyquire('../../../../src/api/v1/controllers/feature', {});

			controller.get(requestMock, responseMock);

			it('should send a 200', function () {
				assert.equal(1, statusMock.called, 'status not called');
				assert.equal(true, statusMock.calledWith(200), 'status called with wrong code');
			});

			it('should send a single feature', function () {
				assert.equal(1, sendMock.called, 'send not called');
				assert.equal(false, Array.isArray(sendMock.calledArgs[0][0]));
			});
		});

		context('when not found', function () {
			it('should respond with a 404');
			it('should have no content');
		});

		context('when unsuccessful', function () {
			it('should respond with a 520');
			it('should have an error code (TBD) in the body');
		});
	});
	describe('post action', function () {
		context('when successful', function () {
			var sendMock = spy();
			var statusMock = spy().return({ 'send': sendMock });

			var requestMock = {};
			var responseMock = { status: statusMock };

			var controller = proxyquire('../../../../src/api/v1/controllers/feature', {});

			controller.post(requestMock, responseMock);

			it('should send a 200', function () {
				assert.equal(1, statusMock.called, 'status not called');
				assert.equal(true, statusMock.calledWith(200), 'status called with wrong code');
			});

			it('should send the new feature', function () {
				assert.equal(1, sendMock.called, 'send not called');
				assert.equal(false, Array.isArray(sendMock.calledArgs[0][0]));
			});
		});

		context('when unsuccessful', function () {
			it('should respond with a 520');
			it('should have an error code (TBD) in the body');
		});
	});
	describe('delete action', function () {
		context('when successful', function () {
			var sendMock = spy();
			var statusMock = spy().return({ 'send': sendMock });

			var requestMock = {};
			var responseMock = { status: statusMock };

			var controller = proxyquire('../../../../src/api/v1/controllers/feature', {});

			controller.delete(requestMock, responseMock);

			it('should send a 204', function () {
				assert.equal(1, statusMock.called, 'status not called');
				assert.equal(true, statusMock.calledWith(204), 'status called with wrong code');
			});

			it('should have no content', function () {
				assert.equal(1, sendMock.called, 'send not called');
				assert.equal(undefined, sendMock.calledArgs[0][0]);
			});
		});

		context('when not found', function () {
			it('should respond with a 404');
			it('should have no content');
		});

		context('when unsuccessful', function () {
			it('should respond with a 520');
			it('should have an error code (TBD) in the body');
		});
	});
});
