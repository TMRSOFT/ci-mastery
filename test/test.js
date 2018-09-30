var supertest = require("supertest");
var should = require("should");
var assert = require('assert');

// This agent refers to PORT where the program is running.

var server = supertest.agent("http://localhost:9000");

// UNIT test begin

describe('Array', function () {
	describe('#indexOf()', function () {
		it('should return -1 when the value is not present', function () {
			assert.equal([1, 2, 3].indexOf(4), -1);
		});
	});
});

describe('Two plus 2', function () {
	describe('#plus()', function () {
		it('should return 4 when 2 plus 2', function () {
			assert.equal(2 + 2, 4);
		});
	});
});

describe("SAMPLE unit test", function () {

	// #1 should return home page
	it("should return home page", function (done) {
		// calling home page
		server
			.get("/")
			.expect("Content-type", /text/)
			.expect(200) // THis is HTTP response
			.end(function (err, res) {
				// HTTP status should be 200
				res.status.should.equal(200);
				done();
			});
	});

});