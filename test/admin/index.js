var assert = require('assert');

describe('Admin module', function () {
	it('should export the app object', function () {
		process.env.static_root = 'static/admin/';
		var app = require('../../src/admin');
		assert.equal(true, !!app);
	});
});
