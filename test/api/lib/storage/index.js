var assert = require('assert');

describe('Storage API', function () {
	context('Basic Interface', function () {
		var Storage = require('../../../../src/api/lib/storage');
		var instance = new Storage();

		it('should throw an exception for the list method', function () {
			assert.throws(function () {
				instance.list();
			}, Error, /Must be implemented/);
		});

		it('should throw an exception for the get method', function () {
			assert.throws(function () {
				instance.get();
			}, Error, /Must be implemented/);
		});

		it('should throw an exception for the add method', function () {
			assert.throws(function () {
				instance.add();
			}, Error, /Must be implemented/);
		});

		it('should throw an exception for the update method', function () {
			assert.throws(function () {
				instance.update();
			}, Error, /Must be implemented/);
		});
	});
});
