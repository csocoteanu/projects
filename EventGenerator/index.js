var serverModule = require('./server/server.js');
var utilsModule  = require('./utils/utils.js');


/**
 * Start servers / manage workers.
 *
 * @param config: Portal config file.
 */
function startServer (config) {

    var server = serverModule.create(config.server);
    server.start();
}

/**
 * Entry point for the internal Node JS server
 *
 */
utilsModule.parseServerConfig('config.json', startServer);
