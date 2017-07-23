var requestModule = require('request');

function getAuthorizationToken() {
    var username = 'csocoteanu';
    var password = 'tech2017';
    return 'Basic ' + new Buffer(username + ':' + password).toString('base64');
}

function process(requestBody, callback) {
    var updateIssueBody = {  
        "update": {  
            "summary": [  
                {  
                    "set": requestBody.summary
                }
            ],
            "labels":[  
                {  
                    "add": "triaged"
                }
            ]
        },
        "fields": {
            "issuetype":{
                "id": requestBody.issuetype
            }
        }
    };

    var requestOptions = {
        method: 'PUT',
        url: 'http://127.0.0.1:8080/rest/api/2/issue/' + requestBody.id,
        headers: {
            'Authorization': getAuthorizationToken(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateIssueBody)
    };

    requestModule(requestOptions, function(error, response, body) {
        if (error) {
            console.error('Error encountered while request was sent: ', error, JSON.stringify(error));
        } else {
            console.log('Request send succesfully! Received: ', response.statusCode, 'http://127.0.0.1:8080/rest/api/2/issue/' + requestBody.id);
            callback(body);
        }
    });
}

exports.process = process;