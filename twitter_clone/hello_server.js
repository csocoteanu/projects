var http = require('http')

function handleRequests(request, response) {
	response.writeHead(200, { 'Content-Type': 'text/plain' });
	response.write('Hello!');
	response.end();
}

var server = http.createServer(handleRequests)
server.listen(3000, '127.0.0.1');

module.exports = server
