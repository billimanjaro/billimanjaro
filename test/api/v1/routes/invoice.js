var assert = require('assert');
var spy = require('bondjs');
var proxyquire = require('proxyquire').noCallThru();

describe('v1 invoice api routes', function () {
	it('should export itself with a list and a get action tied to the right controller functions', function () {
		var controller = { 'list': 'abc', 'get': 'def', 'put': 'ghi', 'post': 'jkl', 'delete': 'mno' };
		var routerMock = { 'get': spy(), 'put': spy(), 'post': spy(), 'delete': spy() };

		var route = proxyquire('../../../../src/api/v1/routes/invoice', {
			'express': { Router: function () { return routerMock; } },
			'../controllers/invoice': controller
		});

		assert.equal(route, routerMock, 'invoice routes not exported');

		assert.equal(2, routerMock.get.called, 'get not called');

		assert.equal(true, routerMock.get.calledWith('/', controller.list), 'list not hooked up');
		assert.equal(true, routerMock.get.calledWith('/:id', controller.get), 'get not hooked up');
	});
});
