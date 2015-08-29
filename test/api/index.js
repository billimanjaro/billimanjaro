var assert = require('assert');

describe('API module', function () {
	it('should export the app object', function () {
		var app = require('../../src/api');
		assert.equal(true, !!app);
	});
});
