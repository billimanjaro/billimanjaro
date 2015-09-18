var assert = require('assert');
var proxyquire = require('proxyquire').noCallThru();
var spy = require('bondjs');

describe('Storage API', function () {
	context('Consul Backend', function () {

		context('configuration', function () {
			var consulSpy = spy();
			var ConsulBackend = proxyquire('../../../../../src/api/lib/storage/backends/consul', {
				'consul': consulSpy
			});

			it('should allow configuring the key prefix', function () {
				var instance = new ConsulBackend({ prefix: 'stuff here' });
				assert.equal('stuff here', instance._prefix, 'prefix not equal');
			});

			it('should default the key prefix to "billimanjaro"', function () {
				var instance = new ConsulBackend();
				assert.equal('billimanjaro', instance._prefix, 'prefix not equal');
			});

			it('should pass all other options (without the prefix) to the consul client', function () {
				var options = { other: 'options', here: 'stuff', prefix: 'whatever' };
				var expectedOptions = { other: 'options', here: 'stuff' };
				new ConsulBackend(options);
				assert.equal(true, consulSpy.calledWith(expectedOptions), 'not called with expected options');
			});
		});

		context('list method', function () {
			var consulClient = { kv: { keys: null } };

			var ConsulBackend = proxyquire('../../../../../src/api/lib/storage/backends/consul', {
				'consul': function () { return consulClient; }
			});

			var instance = new ConsulBackend({ prefix: 'list' });

			it('should ask the consul client for the keys based on the entity and prefix', function (done) {
				spy(consulClient.kv, 'keys').asyncReturn(null, null, {statusCode: 200});
				function listCallback() {
					done();
				}

				instance.list('entity1', listCallback);

				assert.equal(1, consulClient.kv.keys.called, 'keys method not called');
				assert.equal('list/entity1/', consulClient.kv.keys.calledArgs[0][0], 'keys method called with wrong path');
			});

			it('should return an empty array if there are no results', function (done) {
				var expected = [];
				spy(consulClient.kv, 'keys').asyncReturn(null, expected, {statusCode: 200});
				function listCallback2(err, result) {
					assert.equal(expected, result, 'did not return empty array');
					done();
				}

				instance.list('entity2', listCallback2);

				assert.equal(1, consulClient.kv.keys.called, 'keys method not called');
				assert.equal('list/entity2/', consulClient.kv.keys.calledArgs[0][0], 'keys method called with wrong path');
			});

			it('should never forward a 404 from the consul client and return an empty array instead', function (done) {
				spy(consulClient.kv, 'keys').asyncReturn(null, null, {statusCode: 404});
				function listCallback3(err, result) {
					assert.equal(true, Array.isArray(result), 'keys method did not return an array');
					assert.equal(0, result.length);
					done();
				}

				instance.list('entity3', listCallback3);

				assert.equal(1, consulClient.kv.keys.called, 'keys method not called');
				assert.equal('list/entity3/', consulClient.kv.keys.calledArgs[0][0], 'keys method called with wrong path');
			});
		});

		context('get method', function () {
			var consulClient = { kv: { get: null } };

			var ConsulBackend = proxyquire('../../../../../src/api/lib/storage/backends/consul', {
				'consul': function () { return consulClient; }
			});

			var instance = new ConsulBackend({ prefix: 'get' });

			it('should hand back the result from the consul client', function (done) {
				var expected = { stuff: 'here', other: 'more' };
				spy(consulClient.kv, 'get').asyncReturn(null, expected, {statusCode: 200});
				function getCallback(err, result) {
					assert.equal(expected, result, 'get method returned wrong object');
					done();
				}

				instance.get('thing', '1', getCallback);

				assert.equal(1, consulClient.kv.get.called, 'get method not called');
				assert.equal('get/thing/1', consulClient.kv.get.calledArgs[0][0].key, 'get method called with wrong path');
			});

			it('should forward a 404 from the consul client as a null', function (done) {
				spy(consulClient.kv, 'get').asyncReturn(null, {}, {statusCode: 404});
				function getCallback(err, result) {
					assert.equal(null, result, 'get method returned wrong object');
					done();
				}

				instance.get('other', '2', getCallback);

				assert.equal(1, consulClient.kv.get.called, 'get method not called');
				assert.equal('get/other/2', consulClient.kv.get.calledArgs[0][0].key, 'get method called with wrong path');
			});
		});

		context('add method', function () {
			var consulClient = { kv: { set: null, get: null } };

			var ConsulBackend = proxyquire('../../../../../src/api/lib/storage/backends/consul', {
				'consul': function () { return consulClient; }
			});

			var instance = new ConsulBackend({ prefix: 'add' });

			it('should iterate every property and array entry and send them to the consul client with the right path', function (done) {
				spy(consulClient.kv, 'set').asyncReturn(null, {}, {statusCode: 200});
				spy(consulClient.kv, 'get').asyncReturn(null, {}, {statusCode: 200});

				var input = { stuff: 'specifically', goes: { here: [ 'ok?' ] } };
				instance.add('user', input, function () {
					var calls = consulClient.kv.set.calledArgs;

					assert.equal('add/user/' + input.id + '/stuff', calls[0][0]);
					assert.equal('specifically', calls[0][1]);

					assert.equal('add/user/' + input.id + '/goes/here/0', calls[1][0]);
					assert.equal('ok?', calls[1][1]);

					assert.equal('add/user/' + input.id + '/id', calls[2][0]);
					assert.equal(input.id, calls[2][1]);

					done();
				});

				assert.equal(3, consulClient.kv.set.called);
			});

			it('should generate a new id for the object', function () {
				var a = {};
				var b = {};

				instance.add('user', a, function () {});
				instance.add('user', b, function () {});

				assert.notEqual(a.id, b.id);
			});

			it('should never use the id if one exists on the object', function () {
				var a = { id: 123 };
				instance.add('user', a, function () {});
				assert.notEqual(123, a.id);
			});

			it('should fail if any call to set fails with an error', function (done) {
				var error = new Error('stuff and things');
				spy(consulClient.kv, 'set').asyncReturn(error, {}, {statusCode: 404});
				spy(consulClient.kv, 'get').asyncReturn(null, {}, {statusCode: 200});

				var input = { stuff: 'specifically', goes: { here: [ 'ok?' ] } };
				instance.add('user', input, function (err) {
					var calls = consulClient.kv.set.calledArgs;

					assert.equal(err, error);
					assert.equal('add/user/' + input.id + '/stuff', calls[0][0]);
					assert.equal('specifically', calls[0][1]);

					assert.equal(3, consulClient.kv.set.called);
					done();
				});
			});

			it('should fail if any call to set fails with a message from consul', function (done) {
				spy(consulClient.kv, 'set').asyncReturn(null, {}, {statusCode: 404});
				spy(consulClient.kv, 'get').asyncReturn(null, {}, {statusCode: 200});

				var input = { stuff: 'specifically', goes: { here: [ 'ok?' ] } };
				instance.add('user', input, function (err) {
					var calls = consulClient.kv.set.calledArgs;

					assert.equal(err instanceof Error, true);
					assert.equal('add/user/' + input.id + '/stuff', calls[0][0]);
					assert.equal('specifically', calls[0][1]);

					assert.equal(3, consulClient.kv.set.called);
					done();
				});
			});

			it('should fail if you try to save a null object', function (done) {
				instance.add('user', null, function (err) {
					assert.equal(true, err !== null);
					assert.equal(true, err instanceof Error);
					done();
				});
			});

			it('should fail if you try to save something not an object', function (done) {
				instance.add('user', 123, function (err) {
					assert.equal(true, err !== null);
					assert.equal(true, err instanceof Error);
					done();
				});
			});

			it('should fail if you try to save an empty object', function (done) {
				instance.add('user', {}, function (err) {
					assert.equal(true, err !== null);
					assert.equal(true, err instanceof Error);
					done();
				});
			});
		});

		context('update method', function () {
			var consulClient = { kv: { set: null, get: null } };

			var ConsulBackend = proxyquire('../../../../../src/api/lib/storage/backends/consul', {
				'consul': function () { return consulClient; }
			});

			var instance = new ConsulBackend({ prefix: 'update' });

			it('should iterate every property and array entry and send them to the consul client with the right path', function (done) {
				spy(consulClient.kv, 'set').asyncReturn(null, {}, {statusCode: 200});
				spy(consulClient.kv, 'get').asyncReturn(null, {}, {statusCode: 200});

				var input = { id: 'abc123', stuff: 'specifically', goes: { here: [ 'ok?' ] } };
				instance.update('user', input, function () {
					var calls = consulClient.kv.set.calledArgs;

					assert.equal('update/user/abc123/id', calls[0][0]);
					assert.equal('abc123', calls[0][1]);

					assert.equal('update/user/abc123/stuff', calls[1][0]);
					assert.equal('specifically', calls[1][1]);

					assert.equal('update/user/abc123/goes/here/0', calls[2][0]);
					assert.equal('ok?', calls[2][1]);

					assert.equal(3, consulClient.kv.set.called);
					done();
				});

				assert.equal(1, consulClient.kv.get.called);
			});

			it('should fail if any call to set fails with an error', function (done) {
				var error = new Error('stuff and things');
				spy(consulClient.kv, 'set').asyncReturn(error, {}, {statusCode: 404});
				spy(consulClient.kv, 'get').asyncReturn(null, {}, {statusCode: 200});

				var input = { id: 'abc123', stuff: 'specifically', goes: { here: [ 'ok?' ] } };
				instance.update('user', input, function (err) {
					var calls = consulClient.kv.set.calledArgs;

					assert.equal(err, error);
					assert.equal('update/user/abc123/id', calls[0][0]);
					assert.equal('abc123', calls[0][1]);

					assert.equal(3, consulClient.kv.set.called);
					done();
				});

				assert.equal(1, consulClient.kv.get.called);
			});

			it('should fail if any call to set fails with a message from consul', function (done) {
				spy(consulClient.kv, 'set').asyncReturn(null, {}, {statusCode: 404});
				spy(consulClient.kv, 'get').asyncReturn(null, {}, {statusCode: 200});

				var input = { id: 'abc123', stuff: 'specifically', goes: { here: [ 'ok?' ] } };
				instance.update('user', input, function (err) {
					var calls = consulClient.kv.set.calledArgs;

					assert.equal(err instanceof Error, true);
					assert.equal('update/user/abc123/id', calls[0][0]);
					assert.equal('abc123', calls[0][1]);

					assert.equal(3, consulClient.kv.set.called);
					done();
				});

				assert.equal(1, consulClient.kv.get.called);
			});

			it('should fail if you try to save a null object', function (done) {
				instance.update('user', null, function (err) {
					assert.equal(true, err !== null);
					assert.equal(true, err instanceof Error);
					done();
				});
			});

			it('should fail if you try to save something not an object', function (done) {
				instance.update('user', 123, function (err) {
					assert.equal(true, err !== null);
					assert.equal(true, err instanceof Error);
					done();
				});
			});

			it('should fail if you try to save an empty object', function (done) {
				instance.update('user', {}, function (err) {
					assert.equal(true, err !== null);
					assert.equal(true, err instanceof Error);
					done();
				});
			});

			it('should fail if you try to save an object without an id', function (done) {
				instance.update('user', { abc: '123' }, function (err) {
					assert.equal(true, err !== null);
					assert.equal(true, err instanceof Error);
					done();
				});
			});

			it('should fail if the entity does not already exist', function () {
				var error = new Error();
				spy(consulClient.kv, 'get').asyncReturn(error, {}, {statusCode: 404});

				instance.update('user', { id: 'abc123' }, function (err, result) {
					assert.equal(null, result);
					assert.equal(error, err);
				});

				assert.equal(1, consulClient.kv.get.called);
			});
		});
	});
});