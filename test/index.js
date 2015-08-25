var assert = require('assert');

describe('Main module', function () {
	it('should export the app object', function () {
		var app = require('../src');
		assert.equal(true, !!app);
	});
});
