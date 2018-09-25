var express = require('express');
var router = express.Router();
var modelPerson = require('../models/person');
var pug = require('pug');

var returnRouter = function (io) {
	/* GET home page. */
	router.get('/', function (req, res, next) {
		modelPerson.select().then((people) => {
			res.render('person/index', {
				title: 'Person',
				people: people
			});
		});
	});

	router.post('/', function (req, res, next) {
		modelPerson.insert({
			name: req.body.name,
			lastName: req.body.lastName,
			birthday: req.body.birthday
		}).then((person) => {
			res.status(201);
			res.location(`${req.protocol}://${req.get("host")}${req.originalUrl}/${person._id}`);
			res.send({
				data: person,
				message: `New person inserted.`,
				success: true
			})
		});
	});

	io.on('connection', function (socket) {
        socket.on('insert', function(data) {
            modelPerson.insert(data).then((person) => {
				var fn = pug.compileFile('./views/person/row.pug');
				io.emit('inserted', {
					id: person._id,
					html: fn({person: person})
				});
			});
		});
		socket.on('update', function(data) {
            modelPerson.update(data).then((person) => {
				var fn = pug.compileFile('./views/person/row.pug');
				io.emit('updated', {
					id: person._id,
					html: fn({person: person})
				});
			});
		});
		socket.on('remove', function(data) {
            modelPerson.remove(data.id).then((id) => {
				io.emit('removed', {
					id: id,
				});
			});
        });
    });
	return router;
};

module.exports = returnRouter;
