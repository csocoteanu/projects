var httpModule = require('http');
var urlModule  = require('url');

var serverPort = 9999;

var readApi   = require('./rest/readProjectIssues.js');
var createApi = require('./rest/createProjectIssue.js');
var updateApi = require('./rest/updateProjectIssue.js');
var deleteApi = require('./rest/deleteProjectIssue.js');

/**
 * Creates a server that listens for HTTP requests
 *
 */
function startServer() {
    console.log('Starting server on port:', serverPort);
    httpModule.createServer(handleRequest)
              .listen(serverPort);
}

/**
 * Handles a HTTP request
 *
 */
function handleRequest(request, response) {
    console.log("Received new request", request.method, request.url);

    var url      = urlModule.parse(request.url, true);
    var path     = url.pathname;
    var urlquery = url.query;

    var httpStatus = 404;
    var message = '{"error": "Not Found"}';

    if (path == '/jiraManagement') {
        switch (request.method) {
            case 'GET':
                readApi.process(urlquery.id, function(message) {
                    setResponseCode(200, message, response);
                });
                return;
            case 'POST':
                var body = {
                        "projectId": urlquery.projectId,
                        "summary": urlquery.summary
                };
                createApi.process(body, function(message) {
                    setResponseCode(200, message, response);
                });
                return;
            case 'PUT':
                var body = {
                        "id": urlquery.id,
                        "summary": urlquery.summary,
                        "issuetype": urlquery.issuetype
                };
                updateApi.process(body, function(message) {
                    setResponseCode(200, message, response);
                });
                return;
            case 'DELETE':
                deleteApi.process(urlquery.id, function(message) { 
                    setResponseCode(200, message, response);
                });
                return;
        }
    }

    setResponseCode(httpStatus, message, response);
}

/**
 * Sets the message response on a HTTP request
 *
 */
function setResponseCode(httpCode, message, response) {
    console.log("Closing connection", response.connection.remoteAddress, response.connection.remotePort);
    response.writeHead(httpCode);
    response.end(message);
}

startServer();