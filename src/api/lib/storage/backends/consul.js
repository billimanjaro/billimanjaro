var Storage = require('../');
var consul = require('consul');
var path = require('path');

module.exports = ConsulBackend;

function ConsulBackend(options) {
	options = options || {};
	this._prefix = options.prefix || 'billimanjaro';
	delete options.prefix;
	this._instance = consul(options);
}

ConsulBackend.prototype = Object.create(Storage.prototype);
ConsulBackend.prototype.constructor = Storage;
ConsulBackend.prototype._idGenerator = function() { return Math.random().toString(36).slice(2); };

function syncEntity(backend, entity, id, object, callback) {
	if(Object.keys(object).length === 0 ||
		(Object.keys(object).length === 1 &&
		Object.keys(object)[0] === 'id')) {
		callback(new Error('Nothing to save!'));
		return;
	}

	var count = 0;
	// TODO this is a bandaid over the result, this needs
	// to be a stack of things to send instead
	var hadError = false;

	function resultCallback(err, result, response) {
		if((err || response.statusCode === 404) && !hadError) {
			hadError = true;
			callback(err || new Error(response.statusMessage));
		} else if(--count === 0 && !hadError) {
			backend.get(entity, id, callback);
		}
	}

	function addChildren(object, prefix) {
		if(Array.isArray(object)) {
			object.forEach(function (element, index) {
				addChildren(element, path.join(prefix, String(index)));
			});
		} else if(typeof object === 'object') {
			Object.keys(object).forEach(function(key) {
				addChildren(object[key], path.join(prefix, String(key)));
			});
		} else {
			count++;
			backend._instance.kv.set(prefix, object, resultCallback);
		}
	}

	addChildren(object, path.join(String(backend._prefix), String(entity), String(id)));
}

function validateObject(object, callback) {
	if(object === null) {
		callback(new TypeError('Expected object, got null'));
		return false;
	} else if(typeof object !== 'object') {
		callback(new TypeError('Expected object, got ' + (typeof object)));
		return false;
	}
	return true;
}

ConsulBackend.prototype.list = function (entity, callback) {
	this._instance.kv.keys(path.join(this._prefix, entity) + '/', function (err, result, response) {
		err = err || (response.statusCode !== 200 ? new Error(response.statusMessage) : null);
		result = err !== null ? [] : result;
		callback(err, response.statusCode === 200 ? result : []);
	});
};

ConsulBackend.prototype.get = function (entity, id, callback) {
	this._instance.kv.get({ key: path.join(this._prefix, entity, id), recurse: true }, function (err, result, response) {
		callback(err, (!err && response.statusCode === 200) ? result : null);
	});
};

ConsulBackend.prototype.add = function (entity, object, callback) {
	if(!validateObject(object, callback)) {
		return;
	}

	// ensure there is no id on the object before processing it
	delete object.id;
	var id = this._idGenerator();
	object.id = id;
	syncEntity(this, entity, id, object, callback);
};

ConsulBackend.prototype.update = function (entity, object, callback) {
	if(!validateObject(object, callback)) {
		return;
	} else if(!object.hasOwnProperty('id')) {
		callback(new Error('Your object must already have an id!'));
		return;
	}

	this.get(entity, object.id, (function (err, result) {
		if(result === null) {
			callback(new Error('Unable to sync entity ' + entity + '(id: ' + object.id + '), entity not found'), null);
		} else {
			syncEntity(this, entity, object.id, object, callback);
		}
	}).bind(this));
};
