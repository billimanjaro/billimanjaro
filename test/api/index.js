var assert = require('assert');
var spy = require('bondjs');
var proxyquire = require('proxyquire').noCallThru();

describe('API module', function () {
	it('should export the app object and listen on the specified port', function () {
		var expressStub = { 'use': spy(), 'listen': spy() };
		var app = proxyquire('../../src/api', {
			'express': function () { return expressStub; },
			'./v1/routes': spy(),
			'morgan': spy()
		});
		assert.equal(true, !!app, 'app object was false');
		process.env.port = Math.random();
		assert.equal(1, app.listen.called, 'listen not called');
		delete process.env.port;
	});

	it('should have a /v1 base route', function () {
		var expressStub = { 'use': spy(), 'listen': spy()  };
		var v1Stub = spy();

		proxyquire('../../src/api', {
			'express': function () { return expressStub; },
			'./v1/routes': v1Stub
		});

		assert.equal(true, expressStub.use.calledWith('/v1', v1Stub), 'v1 route not exported');
	});
});
