var fsModule   = require('fs');
var pathModule = require('path');

function writer(config) {

    var _me = this;

    /**
     * TODO: use async / sequence_run
     * @param filePath
     * @returns {boolean}
     * @private
     */
    this._tryMkdirSync = function(filePath) {

        var dirname = pathModule.dirname(filePath);
        if (fsModule.existsSync(dirname)) {
            return true;
        }

        fsModule.mkdirSync(dirname);
    };

    this.dumpData = function(data, callback) {

        var filePath = pathModule.join(_me._config.destination, data.fileInfo.fileName);
        _me._tryMkdirSync(filePath);

        fsModule.writeFile(filePath, data.fileInfo.content, "binary", function(err) {

            if (err) {
                throw 'error dumping file: ' + err;
            }

            console.log('===> Succesfully dumped...', data.fileInfo.fileName);

            return callback(0, data);
        });
    };

    this._config = config;
}

exports.create = function (config) { return new writer(config); };