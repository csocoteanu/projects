var requestModule = require('request');

function getAuthorizationToken() {
    var username = 'csocoteanu';
    var password = 'tech2017';
    return 'Basic ' + new Buffer(username + ':' + password).toString('base64');
}

function process(requestBody, callback) {
    var createIssueBody = {
          "fields": {
            "project": {
                "id": requestBody.projectId
            },
            "summary": requestBody.summary,
            "issuetype": {
                "id": "10000"
            },
             "assignee": {
                "name": "csocoteanu"
            },
            "reporter": {
                "name": "csocoteanu"
            },
            "labels": [
                "blitz",
                "krieg"
            ],
            "customfield_10002": "10000"
          }
    };

    var requestOptions = {
        method: 'POST',
        url: 'http://127.0.0.1:8080/rest/api/2/issue',
        headers: {
            'Authorization': getAuthorizationToken(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(createIssueBody)
    };

    requestModule(requestOptions, function(error, response, body) {
        if (error) {
            console.error('Error encountered while request was sent: ', error, JSON.stringify(error));
        } else {
            console.log('Request send succesfully! Received: ', response.statusCode, body, response.statusMessage, response.headers);
            callback(body);
        }
    });
}

exports.process = process;