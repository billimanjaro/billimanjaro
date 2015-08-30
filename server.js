var cluster = require('cluster');
var path = require('path');
var log = require('util').debuglog('master');

function getWorkerType(worker) {
	if(!(worker.id in workers)) {
		log('Tried to find the type of worker id ' + worker.id + ' but it did not exist!');
		return 'unknown';
	}
	return workers[worker.id];
}

function startWorker(type) {
	var worker = cluster.fork({
		script: path.join('src', type, 'index.js'),
		port: process.env['npm_package_config_' + type + '_port'],
		static_root: process.env['npm_package_config_' + type + '_root']
	});
	workers[worker.id] = type;
}

if(cluster.isMaster) {
	cluster.setupMaster();

	var workers = {};

	cluster.on('exit', function(worker) {
		var type = getWorkerType(worker);

		if(worker.suicide !== true) {		
			log('Server ' + type + ' ended ungracefully!');

			startWorker(type);
			delete workers[worker.id];
		} else {
			log('Server ' + type + ' ended gracefully.');
		}
	});

	cluster.on('online', function(worker) {
		var type = getWorkerType(worker);
		log('Started ' + type + ' server');
	});

	log('Starting workers');
	// start the api server
	startWorker('api');

	// start the account zone server
	startWorker('account');

	// start the admin zone server
	startWorker('admin');

	process.on('SIGINT', function () {
		// cleanly exit workers
		log('Caught signal, killing workers');
		for(var id in cluster.workers) {
			cluster.workers[id].kill();
		}
	});
} else {
	require(path.join(__dirname, process.env.script));
}
