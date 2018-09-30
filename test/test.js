var supertest = require("supertest");
var should = require("should");
var assert = require('assert');
var path = require('path');
var nconf = require('nconf');
var assert = require('assert');
nconf.argv().env().file({ file: path.join(__dirname, '..', 'config.json') });

// UNIT test begin


describe('Acceptance testing', function () {

	var server = "";

	before(function () {
		console.log("Executing test cases of Acceptance testing.");
	});

	after(function () {
		console.log("Finished test cases of Acceptance testing.");
	});

	beforeEach(function () {
		server = supertest.agent(`http://localhost:${nconf.get('development').port}`);
	});

	afterEach(function () {
		server = "";
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

	var server = ""

	before(function () {
		console.log("Executing test cases of Unit testing.");
	});

	after(function () {
		console.log("Finished test cases of Unit testing.");
	});

	beforeEach(function () {
		server = supertest.agent(`http://localhost:${nconf.get('development').port}`);
	});

	afterEach(function () {
		server = "";
	});

	
});

