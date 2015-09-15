module.exports = Storage;

function Storage() {
	/* This space intentionally left blank */
}

// Implementation notes:
// - list should return an empty array if there is nothing
// - add should fail when the entity already exists
// - update should fail when the entity does not exist
// - there is no delete method

Storage.prototype.list = function () {
	throw new Error('Must be implemented by a subclass!');
};

Storage.prototype.get = function () {
	throw new Error('Must be implemented by a subclass!');
};

Storage.prototype.add = function () {
	throw new Error('Must be implemented by a subclass!');
};

Storage.prototype.update = function () {
	throw new Error('Must be implemented by a subclass!');
};
