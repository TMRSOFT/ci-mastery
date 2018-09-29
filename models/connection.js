var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://ci-mastery-user:ci-mastery-password-6@ds213183.mlab.com:13183/ci-mastery';
var dbName = 'ci-mastery';

var connect = new Promise((resolve, reject) => {
	MongoClient.connect(url, {useNewUrlParser: true}, function(err, client) {
		assert.equal(null, err);
		console.log("Connected successfully to Mlab Database Server");
		resolve(client.db(dbName));
		//client.close();
	});
});

module.exports = connect;