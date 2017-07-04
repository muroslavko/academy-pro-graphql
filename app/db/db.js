const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var dbConfig = {
	dbname: 'posts-academy',
	uri: 'mongodb://localhost/posts-academy',
	opts: {
		server: { 
			auto_reconnect: true
		}
	}
};

const db = () => {
	console.log("db ini");
	mongoose.connect(dbConfig.uri);

	mongoose.set('debug', true);
	
	mongoose.connection.once('open',  () => {
		this.state = 'connected';
			console.log('Mongoose default connection open to ' + dbConfig.uri);
	});

	mongoose.connection.on('error', (err) => {
		this.state = 'disconnected';
		console.log('Mongoose default connection error: ' + err);
	});

	mongoose.connection.on('disconnected',  () => {
		this.state = 'disconnected';
		console.log('Mongoose default connection disconnected');
	});

	process.on('SIGINT', () => {
		mongoose.connection.close( () => {
			this.state = 'disconnected';
			console.log('Mongoose default connection disconnected through app termination');
			process.exit(0);
		});
	});

}

module.exports = db;
