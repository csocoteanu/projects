var httpModule                = require('http');
var httpsModule               = require('https');
var requestModule             = require('request');
var fsModule                  = require('fs');
var urlModule                 = require('url');
var os                        = require('os');

var constantsModule           = require('../utils/constants.js').constants;
var utilsModule               = require('../utils/utils.js');

/**
 * Common server.
 *
 * @param config: The Server config JSON Object
 */

function server(config) {

    this._port = config.port;
    this._isHttps = config.isHttps;
    this._certificates = config.certificates;
    this._hostname = os.hostname();

    this._pluginNames = config.pluginNames;
    this._plugins = { };

    var _me = this;

    /**
     * Create an HTTP/HTTPS server listening for requests on url + port.
     *
     */
    this.start = function () {

        _me._createServer();
        _me._loadPlugins();

        _me.logInfo('Server is listening for requests on port', _me._port);
    };

    /**
     * Sends a custom HTTP request, and handles success and failure of the request
     *
     * @param requestOptions The HTTP request options
     * @param successCB The callback that is executed if the request is successful
     * @param failureCB The callback that is executed if the request has failed
     */
    this.sendRequest = function(requestOptions, successCB, failureCB) {

        return requestModule(requestOptions, function(error, response, body) {
            if (error) {
                _me.logError('Error encountered while request was sent: ', error);

                if (failureCB) {
                    failureCB(error);
                }
            } else {
                _me.logInfo('Request send succesfully!');

                if (successCB) {
                    successCB(response, body);
                }
            }
        });
    };

    /**
     * Sets the error response on a HTTP request
     *
     * @param httpCode The HTTP status code. E.G. 400
     * @param message The message to be given to the requester
     * @param response The HTTP response object
     */
    this.setResponseCode = function(httpCode, message, response) {

        try {
            _me.logInfo("Closing connection", response.connection.remoteAddress, response.connection.remotePort);


            if (message.indexOf('.json') < 0) {

                _me.logInfo("Sending computed response");
                response.writeHead(httpCode);
                response.end(message);
            } else {

                _me.logInfo("Sending response from file:", message);
                var data = fsModule.createReadStream(message, {flags: 'r'});
                response.writeHead(httpCode);
                data.pipe(response);
            }
        } catch (e) {
            _me.logError('Error while closing connection', e);
        }
    };

    /**
     * Log error message and also all additional arguments passed to the function
     *
     * @param message The message to displayed in log
     */
    this.logError = function(message) {
        utilsModule.log("error",_me._moduleName, message, arguments);
    };

    /**
     * Log info message and also all additional arguments passed to the function
     *
     * @param message The message to displayed in log
     */
    this.logInfo = function(message) {
        utilsModule.log("info",_me._moduleName, message, arguments);
    };

    /**
     * Log warning message and also all additional arguments passed to the function
     *
     * @param message The message to displayed in log
     */
    this.logWarning = function(message) {
        utilsModule.log("warn",_me._moduleName, message, arguments);
    };

    /**
     * Log debug message and also all additional arguments passed to the function
     *
     * @param message The message to displayed in log
     */
    this.logDebug = function(message) {
        utilsModule.log("debug",_me._moduleName, message, arguments);
    };

    this.updateResponseData = function(data, code, message, hasErrors) {

        data.resd.httpCode = code;
        data.resd.httpMessage = message;
        data.resd.hasErrors = hasErrors;
    };

    this._createServer = function() {

        var instance = null;

        if (_me._isHttps) {
            var cert_options = {
                key: fsModule.readFileSync(_me._certificates.key),
                cert: fsModule.readFileSync(_me._certificates.crt)
            };

            instance = httpsModule.createServer(cert_options, _me._handleRequest);
        } else {
            instance = httpModule.createServer(_me._handleRequest);
        }

        instance.listen(_me._port, null, _me._backlogSize);

        return instance;
    };

    this._loadPlugins = function() {

        _me._pluginNames.forEach(function(pluginName) {

            var pluginPath = './plugins/' + pluginName + '.js';
            var plugin     = new require(pluginPath).create();

            plugin.init(_me);

            _me._plugins[pluginName] = plugin;
        });
    };

    /**
     * Handles a request.
     *
     * @param request: The request data.
     * @param response: The response
     */
    this._handleRequest = function(request, response) {

        _me.logInfo("Received new request", request.connection.remoteAddress, request.connection.remotePort, request.method, request.url);

        var data = _me._createRequestData(request, response);

        _me._pluginNames.forEach(function(pluginName) {

            if (_me._plugins[pluginName].shouldHandleRequest(data)) {

                return _me._plugins[pluginName].process(data, _me._processDone);
            }
        });
    };

    /**
     * Function to call when sequence run finishes.
     *
     * @param err: Error passed in the sequence run (0 if no error).
     * @param data: The data used in the sequence run.
     */
    this._processDone = function(err, data) {

        if (err != 0 || data.resd.hasErrors) {
            _me.logError("Error while handling request", data.resd.httpMessage, data.reqq.headers['x-forwarded-for'], data.reqq.connection.remotePort, data.reqq.url);
        } else {
            _me.logInfo("Finished processing request!", data.reqq.headers['x-forwarded-for'], data.reqq.connection.remotePort, data.reqq.url);
        }

        _me.setResponseCode(
            data.resd.httpCode,
            data.resd.httpMessage,
            data.resq
        );

        data = null;
    };

    this._createRequestData = function(request, response) {

        var url = urlModule.parse(request.url, true);

        return {
            server: _me,
            urlpath: url.pathname,
            urlquery: url.query,
            resq:   response, // response object
            reqq:   request,  // request object
            resd:   {         // response data
                httpCode:     constantsModule.httpErrorCodes.OK,
                httpMessage:  constantsModule.httpErrorMessages.OK,
                hasErrors:    false
            },
            reqd:   { }      // request data
        };
    };
}

/**
 * Used to call the constructor from another server when extending.
 *
 * @param config: The server that is extending common server.
 */
exports.create = function(config) {
    return new server(config);
};
