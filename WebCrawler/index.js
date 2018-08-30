var crawlerModule = require('./modules/crawler.js');
var utilsModule  = require('./utils/utils.js');


/**
 * Start servers / manage workers.
 *
 * @param config: Portal config file.
 */
function startCrawler (config) {

    var crawler = crawlerModule.create(config);
    crawler.start();
}

/**
 * Entry point for the internal Node JS server
 *
 */
utilsModule.parseServerConfig('config.json', startCrawler);
