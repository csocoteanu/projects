var _logger = null;
var _config = null;

var constants     = require('./constants.js').constants;
var fsModule      = require('fs');
var winstonLogger = require('winston');

/**
 * Parses the config.json file
 *
 * @param filePath Path For Configuration settings File
 * @param onParseCallback Callback to be executed on successful parsing of the file
 */
function parseServerConfig(filePath, onParseCallback) {

    fsModule.readFile(filePath, 'utf8', function(err, data) {
        if (err) {
            throw new Error('Cannot find the configuration file.');
        }

        // set the config object
        _config = tryParseJSON(data);
        exports.config = _config;

        // instantiate the logger
        _logger = _instantiateLogger(_config);
        _logger.log('info', 'Configuration successfully loaded.');

        exports.logger = _logger;

        onParseCallback(_config);
    });
}

/**
 * Log message with appropriate log-level and also all additional arguments passed to the function
 *
 * @param level The module name to be displayed as a tag
 * @param moduleName The module name to be displayed as a tag
 * @param message    The message to displayed in log
 * @param arguments  Secondary message arguments to be logged
 */
function log(level, moduleName, message, arguments) {

    if (!_logger) {

        return;
    }

    var loggerLevel = constants.logging.level[_logger.level];
    var currentLevel = constants.logging.level[level];

    if (currentLevel > loggerLevel) {

        return;
    }

    var formattedMessage = _getFormattedMessage(moduleName, message, arguments);

    switch (currentLevel) {

        case constants.logging.level["info"] :
            _logger.info(formattedMessage);
            break;
        case constants.logging.level["debug"] :
            _logger.debug(formattedMessage);
            break;
        case constants.logging.level["warn"] :
            _logger.warn(formattedMessage);
            break;
        case constants.logging.level["error"] :
            _logger.error(formattedMessage);
            break;
    }
}

/**
 * Returns JSON object or false,
 * if input string is null or is in an invalid format
 *
 * @param jsonString The files from the HTTP multipart request
 */
function tryParseJSON (jsonString) {

    try {
        var o = null;
        if (jsonString) {
            o = JSON.parse(jsonString);
        }

        if (o && typeof o === "object" && o !== null) {
            return o;
        }
    } catch (e) {
    }

    return false;
}

/**
 * Get POST request parameters
 *
 * @param url URL where the HTTP(S) call is made
 * @param isHttps HTTPS or not
 * @param isMultipart Whether the request made is multipart or not
 */
function getPostParams(url, isHttps, isMultipart) {

    var postParams = {
        method: 'POST',
        url: url
    };

    if (isHttps) {
        postParams.rejectUnauthorized = false;
        postParams.requestCert = true;
        postParams.agent = false;
    }

    if (isMultipart) {
        postParams.headers = { 'Content-Type': 'multipart/form-data' };
        postParams.formData = { };
    }

    return postParams;
}

/**
 * Returns the file contents, encoded with utf8.
 * @param filePath The path to the file to be read.
 */
function getFileContents(filePath) {

    return fsModule.readFileSync(filePath, 'utf8');
}

/**
 * Recursive sequential run, stop at first error when bstopaterr is set to true,
 * return the last function data and error
 *
 * @param fcts: array of functions with prototype: ( data, cbk)
 * @param data: data that is passed along the callbacks
 * @param cbk: callback prototype: ( err, data )
 * @param bstopaterr: if true, stops the execution engine,
 *                    when encountering an error
 * @param nfct: index of the callback to be executed
 * @param err: error to be displayed, when engine stops
 * @param type:
 */
function sequenceRun(fcts, data, cbk, bstopaterr, nfct, err, type) {

    if (!nfct) {
        nfct = 0;
    }

    if (!err) {
        err = 0;
    }

    if (( !err || !bstopaterr ) && fcts &&
        ( nfct >= 0 ) && ( nfct < fcts.length )) {
        fcts[nfct](data, function (err, data) {
            sequenceRun(fcts, data, cbk, bstopaterr, nfct + 1, err, type);
        }, type);
    } else {
        cbk(err, data);
    }
}

function foreachRun ( fct, data, cbk, arr ) {
    var i = 0,
        count = 0,
        n = 0;
    for( i in arr ) n++;
    if( n > 0 )
        for( i in arr ) fct( data, i, function( err, data ) { count++; if( count == n ) cbk( err, data ); } );
    else
        cbk( 0, data );
}

/**
 * Instantiates the logger using the configured settings
 *
 * @param config Configuration settings
 */
function _instantiateLogger(config) {

    var loggers = [
        new winstonLogger.transports.File(
            {
                filename: config.logging.logFile,
                maxsize : config.logging.maxSize,
                maxFiles: config.logging.maxFiles
            })
    ];

    if (config.logging.logToStdout) {
        loggers.push(new winstonLogger.transports.Console( ));
    }

    return new (winstonLogger.Logger)(
        {
            level: config.logging.level,
            transports: loggers
        });
}

/**
 * Format the message, by adding timestamp, server name and all additional arguments
 *
 * @param moduleName The module name to be displayed as a tag
 * @param message    The message to be logged
 * @param arguments  Secondary message arguments to be logged
 */
function _getFormattedMessage(moduleName, message, arguments) {

    var timestamp = new Date();
    var auxMessage = '';

    if (arguments && arguments.length > 1) {

        var formattedArguments = [];
        for (var key in arguments) {
            if (key > 0) {
                formattedArguments.push(arguments[key]);
            }
        }

        auxMessage = ': ' + formattedArguments.join(", ");
    }

    return '[' + timestamp + '][' + moduleName + ']: ' + message + auxMessage + '...';
}

function randomString(length) {

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

exports.getPostParams                   = getPostParams;
exports.parseServerConfig               = parseServerConfig;
exports.log                             = log;
exports.tryParseJSON                    = tryParseJSON;
exports.getFileContents                 = getFileContents;
exports.sequenceRun                     = sequenceRun;
exports.foreachRun                      = foreachRun;
exports.randomString                    = randomString;
