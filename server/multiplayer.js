const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080 });

class Client {
	constructor(socket) {
		this.socket = socket;
		this.room = "lobby";
		this.color = "#ff0000";
		this.id = randomString();
		this.posn = {x: 0, y: 0};

		var parent = this;
		this.socket.on("message", function(message) {
			parent.message(message.split(" "));
		});

		this.socket.on("close", function() {
			parent.close();
		});
	}

	close() {
		var index = 0;
		var parent = this;
		clients.forEach(function(client, idx) {
			if (client == parent) {
				index = idx;
				return;
			}
		});
		clients.splice(index, 1);
		console.log(clients);
	}

	message(message) {
		// console.log(message);

		if (message[0] == "CONFIG") {
			this.room = message[1];
			this.color = message[2];

			this.socket.send(`CONFIG ${this.id}`);
		}

		if (message[0] == "UPDATE") {
			this.posn.x = parseInt(message[1]);
			this.posn.y = parseInt(message[2]);

			var members = getMembers(this.room);
			var memberString = "";

			members.forEach(function(member, idx) {
				if (idx != 0) memberString += "|"
				memberString += `${member.id},${member.posn.x},${member.posn.y},${member.color}`;
			});

			this.socket.send(`UPDATE ${memberString}`);
		}
	}
}

function getMembers(room) {
	var members = [];
	clients.forEach(function(client) {
		if (client.room == room) members.push(client);
	});
	return members;
}

function randomString() {
	var s1 = Math.random().toString(36).substring(2, 15);
	var s2 = Math.random().toString(36).substring(2, 15);
	return s1 + s2
}

var clients = [];

server.on("connection", function connection(ws) {
	client = new Client(ws);
	clients.push(client);
});
