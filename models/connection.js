var path = require('path');
var nconf = require('nconf');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
nconf.argv().env().file({file: path.join(__dirname, '..', 'config.json')});
var mongoConfig = nconf.get('development').mongoConfig;

var connect = new Promise((resolve, reject) => {
	MongoClient.connect(mongoConfig.url, {useNewUrlParser: true}, function(err, client) {
		assert.equal(null, err);
		console.log("Connected successfully to Mlab Database Server");
		resolve(client.db(mongoConfig.dbName));
		//client.close();
	});
});

module.exports = connect;