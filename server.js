/**
 * @author Nils Dehl <mail@nils-dehl.de>
 */
var http = require('http'),
		sys  = require('sys'),
		fs   = require('fs'),
		io   = require('socket.io');
var Connect = require('connect');

var server = Connect.createServer(
	Connect.logger(), // Log responses to the terminal using Common Log Format.
	//Connect.responseTime(), // Add a special header with timing information.
	Connect.conditionalGet(), // Add HTTP 304 responses to save even more bandwidth.
	Connect.cache(), // Add a short-term ram-cache to improve performance.
	Connect.gzip(), // Gzip the output stream when the browser wants it.
	Connect.staticProvider(__dirname) // Serve all static files in the current dir.
);

var socket = io.listen(server);

socket.on('connection', function(client) {

	var user;

	client.on('message', function(message) {
		if (!user) {
			user = message;
			client.send({ message: 'Welcome, ' + user.nickname + '!', nickname: 'server', gravatar: '' });
			return;
		}
		var response = {
			'nickname': user.nickname,
			'gravatar': user.gravatar,
			'message': message.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
		};
		socket.broadcast(response);
	});

});

server.listen(4000);