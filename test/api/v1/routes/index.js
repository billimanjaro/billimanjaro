var assert = require('assert');
var spy = require('bondjs');
var proxyquire = require('proxyquire').noCallThru();

describe('v1 index module', function () {
	it('should export the router object tied to the v1 base route', function () {
		var routerMock = { 'use': spy() };
		var v1Api = proxyquire('../../../../src/api/v1/routes', {
			'express': { Router: function () { return routerMock; } },
			'./account': spy(),
			'./feature': spy(),
			'./invoice': spy(),
			'./package': spy()
		});

		assert.equal(routerMock, v1Api, 'v1 routes not exported');
	});

	it('should hook up the account, feature, invoice, and package routes', function () {
		var useSpy = spy();
		var mocks = {
			'express': { Router: function () { return { 'use': useSpy }; } },
			'./account': spy(),
			'./feature': spy(),
			'./invoice': spy(),
			'./package': spy()
		};

		proxyquire('../../../../src/api/v1/routes', mocks);

		assert.equal(4, useSpy.called, 'not all resources attached');
		['account', 'feature', 'invoice', 'package'].forEach(function (resource) {
			assert.equal(true, useSpy.calledWith('/' + resource, mocks['./' + resource]), 'missing ' + resource + ' resource');
		});
	});
});
