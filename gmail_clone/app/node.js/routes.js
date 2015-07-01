var path = require('path')

module.exports = function(app) {

	app.post('/api/login', function(request, response) {
        var email    = request.query.email;
        var password = request.query.password;

        console.log("=========> Login from: " + email + "->" + password);

        if (!email || !password)
        	response.send(404);

        return response.send({ 'tokenId' : email });
    });

    app.get('/api/getEmails', function(request, response) {
    	var tokenId = request.query.tokenId;
    	var emailType = request.query.emailType;

    	console.log("=========> GetEmails from: " + tokenId + " for " + emailType);

    	return response.send({ tokenId : [] });
    });
};