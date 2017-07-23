var requestModule = require('request');

function getAuthorizationToken() {
	var username = 'csocoteanu';
	var password = 'tech2017';
	return 'Basic ' + new Buffer(username + ':' + password).toString('base64');
}

function process (projectId, callback) {
	var jiraUrl = 'http://127.0.0.1:8080/rest/api/2/search?jql=project="' + projectId + '"';

	var requestOptions = {
		method: 'GET',
		url: jiraUrl,
		headers: {
			'Authorization': getAuthorizationToken()
		}
	};

	console.log('Sending JIRA query', jiraUrl);

	requestModule(requestOptions, function(error, response, body) {
	    if (error) {
	        console.error('Error encountered while request was sent: ', error);
	    } else {
	    	var issues = [];
	    	var bodyJson = JSON.parse(body);
        	for (var i = 0; i < bodyJson.total; i++) {
        		issues.push(
	        		{
		        		summary: bodyJson.issues[i].fields.summary,
		        		reporter: bodyJson.issues[i].fields.creator.name,
		        		issueType: bodyJson.issues[i].fields.issuetype.name,
		        		labels: bodyJson.issues[i].fields.labels,
		        		key: bodyJson.issues[i].key,
		        		id: bodyJson.issues[i].id
		        	}
	        	);
        	}

        	console.log('Request send succesfully! Received: ', response.statusCode, issues, bodyJson.total);

        	callback(JSON.stringify(issues));
	    }
	});
}

exports.process = process;