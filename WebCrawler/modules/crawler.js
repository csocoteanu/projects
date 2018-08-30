var clientModule          = require('./client.js');
var diskWriter            = require('./diskWriter.js');
var domManager            = require('./domManager.js');
var utilsModule           = require('../utils/utils.js');

function crawler(config, httpClient, diskWriter, domManager) {

    var _me     = this;

    this.start = function() {

        console.log('===> Started crawling', _me._config.client.url);

        _me._crawlLink(_me._config.client.url);
    };

    this._crawlLink = function (link) {

        var data     = _me._createDataContext(link);

        _me._client.sendGet(data, _me._onGetCompleted);
    };

    this._onGetCompleted = function(err, data) {

        console.log('===> GET done', data.link);

        var imageLinks = _me._domManager.extractLinks(data.fileInfo.content);

        _me._writer.dumpData(data, function() {});

        if (!data.fileInfo.followLink) {
            return;
        }

        for (var i = 0; i < imageLinks.length; i++) {

            _me._crawlLink(_me._config.client.url + imageLinks[i]);
        }
    };

    this._createDataContext = function (link) {

        var fileInfo = _me._emitFileName(link);

        // TODO: unify these 2 methods
        return {
              fileInfo: fileInfo,
              link: link
        };
    };

    this._emitFileName = function (link) {

        var fileInfo = {};
        var index    = link.lastIndexOf('/');
        var fileName = (index !== -1) ? (link.substring(index + 1)) : (link);

        // TODO: regex
        // TODO: move outside
        if (
            fileName.lastIndexOf('.png')  !== -1 ||
            fileName.lastIndexOf('.img')  !== -1 ||
            fileName.lastIndexOf('.jpg')  !== -1 ||
            fileName.lastIndexOf('.jpeg') !== -1
        ) {
            fileInfo.fileName   = fileName;
            fileInfo.followLink = false;
            fileInfo.content    = null;
        } else {
            fileInfo.fileName   = fileName + '.html';
            fileInfo.followLink = true;
            fileInfo.content    = null;
        }

        return fileInfo;
    };

    this._config                = config;
    this._client                = httpClient;
    this._writer                = diskWriter;
    this._domManager            = domManager;
    this._pendingRequests       = {};
}

exports.create = function(config) {

    return new crawler(
        config,
        new clientModule.create(config.client),
        new diskWriter.create(config.writer),
        new domManager.create()
    );
};
