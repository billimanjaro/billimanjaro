var assert = require('assert');

describe('Account module', function () {
	it('should export the app object', function () {
		process.env.static_root = 'static/account/';
		var app = require('../../src/account');
		assert.equal(true, !!app);
	});
});
