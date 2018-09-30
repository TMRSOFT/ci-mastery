var supertest = require("supertest");
var should = require("should");
var assert = require('assert');
var path = require('path');
var nconf = require('nconf');
nconf.argv().env().file({ file: path.join(__dirname, '..', 'config.json') });

// UNIT test begin


describe('Acceptance testing', function () {

	var serverUrl = "";
	var server = null;

	before(function () {
		console.log("Executing test cases of Acceptance testing.");
	});

	after(function () {
		console.log("Finished test cases of Acceptance testing.");
	});

	beforeEach(function () {
		serverUrl = `http://localhost:${nconf.get('development').port}`;
		server = supertest.agent(serverUrl);
	});

	afterEach(function () {
		serverUrl = "";
		server = null;
	});

	describe("GET Request to home page of the web app", function () {
		it("should return home page", function (done) {
			server
				.get("/")
				.expect("Content-type", /text/)
				.expect(200)
				.end(function (err, res) {
					res.status.should.equal(200);
					done();
				});
		});
	});
});

describe('Unit testing', function () {

	var serverUrl = "";
	var server = null;
	var testId = null;

	before(function () {
		console.log("Executing test cases of Unit testing.");
	});

	after(function () {
		console.log("Finished test cases of Unit testing.");
	});

	beforeEach(function () {
		serverUrl = `http://localhost:${nconf.get('development').port}`;
		server = supertest.agent(serverUrl);
	});

	afterEach(function () {
		serverUrl = "";
		server = null;
	});

	describe("POST Request to Person API to insert a new person", function () {
		it("should return person object", function (done) {
			server
				.post('/api')
				.send({ name: "Name Test", lastName: "Last Name Test", birthday: new Date() })
				.expect(201)
				.expect('Content-Type', /json/)
				.end(function (err, res) {
					res.status.should.equal(201);
					if (err) done(err);
					res.body.should.have.property('data');
					res.body.should.have.property('message');
					res.body.should.have.property('success');
					res.body.data.should.have.property('_id');
					res.body.data.should.have.property('name');
					res.body.data.should.have.property('lastName');
					res.body.data.should.have.property('birthday');
					testId = res.body.data._id;
					done();
				});
		});
	});

	describe("GET Request to Person API to retrieve a person object", function () {
		it("should return person object", function (done) {
			server
				.get(`/api/${testId}`)
				.expect(200)
				.expect('Content-Type', /json/)
				.end(function (err, res) {
					res.status.should.equal(200);
					if (err) done(err);
					res.body.should.have.property('data');
					res.body.should.have.property('message');
					res.body.should.have.property('success');
					res.body.data.should.have.property('_id');
					res.body.data.should.have.property('name');
					res.body.data.should.have.property('lastName');
					res.body.data.should.have.property('birthday');
					done();
				});
		});
	});

	describe("PUT Request to Person API to update the inserted person", function () {
		it("should return the person object updated", function (done) {
			var testData = { 
				id: testId,
				name: "Name Test Updated",
				lastName: "Last Name Test Updated",
				birthday: new Date(2018, 11, 24)
			}
			server
				.put('/api')
				.send(testData)
				.expect(202)
				.expect('Content-Type', /json/)
				.end(function (err, res) {
					res.status.should.equal(202);
					if (err) done(err);
					res.body.should.have.property('data');
					res.body.should.have.property('message');
					res.body.should.have.property('success');
					res.body.data.should.have.property('_id');
					res.body.data.should.have.property('name');
					res.body.data.should.have.property('lastName');
					res.body.data.should.have.property('birthday');
					assert.equal(testData.id, res.body.data._id);
					assert.equal(testData.name, res.body.data.name);
					assert.equal(testData.lastName, res.body.data.lastName);
					assert.equal(testData.birthday.toISOString(), res.body.data.birthday);
					done();
				});
		});
	});

	describe("DELETE Request to Person API to delete the inserted person", function () {
		it("should return object with success parameter equal true", function (done) {
			var testData = { 
				id: testId,
			}
			server
				.delete('/api')
				.send(testData)
				.expect(202)
				.expect('Content-Type', /json/)
				.end(function (err, res) {
					res.status.should.equal(202);
					if (err) done(err);
					res.body.should.have.property('data');
					res.body.should.have.property('message');
					res.body.should.have.property('success');
					assert.equal(true, res.body.data.success);
					done();
				});
		});
	});
});

