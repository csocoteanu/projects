var redisClient  = require('./redisClient.js');
var utilsModule  = require('./utils.js');
var configModule = require('../../config/config.js');
var async        = require('async');

var __helper_instance__ = null;

function redisHelper() {

    var me = this;

    this._redisClient  = null;

    this._allFilesListName = 'ALL_FILES';
    this._inFileIds        = 'FILE_IN';
    this._outFileIds       = 'FILE_OUT';
    this._currentIndex     = 0;

    this.initialize = function() {

        me._redisClient = new redisClient.create(
            configModule.config.redis.master_name,
            configModule.config.redis.sentinels
        );

        me._redisClient.connect();
        me._redisClient.flushall();
    };

    this.addFileMetadata = function(fileMetadata, callback) {

        var redisString = utilsModule.toRedisString(me._currentIndex, fileMetadata);
        me._redisClient.addToSet(me._allFilesListName, redisString, function() {

            fileMetadata.id = me._currentIndex;
            me._currentIndex++;

            return callback(fileMetadata);
        });
    };

    this.getFileMetadata = function(id, callback) {

        me._redisClient.lookupSetWithPattern(me._allFilesListName, 0, id + ':*', function(result) {

            if (result.length < 2 ||
                result[1].length == 0
            ) {
                return callback({});
            }

            var redisObject        = result[1][0];
            var fileMetadataObject = utilsModule.toFileMetadataObject(redisObject);
            return callback(fileMetadataObject);
        });
    };

    this.getFileMetadataByPlatformAndType = function(platform, type, callback) {

        var pattern = '*:' + platform + ':*' + type + '*:*';
        me._redisClient.lookupSetWithPattern(me._allFilesListName, 0, pattern, function(result) {

            if (result.length < 2 ||
                result[1].length == 0
            ) {
                return callback({});
            }

            var redisObjects = utilsModule.toFileMetadataObjects(result[1]);

            return callback({ results: redisObjects });
        });
    };

    this.getFileMetadataByTypeAndTargetFile = function(target_file_id, type, callback) {

        var pattern = '*:' + target_file_id + ':*' + type + '*:*';
        me._redisClient.lookupSetWithPattern(me._allFilesListName, 0, pattern, function(result) {

            if (result.length < 2 ||
                result[1].length == 0
            ) {
                return callback({});
            }

            var redisObjects = utilsModule.toFileMetadataObjects(result[1]);

            return callback({ results: redisObjects });
        });
    };

    this.deleteFileMetadata = function(id,callback) {

        me._redisClient.lookupSetWithPattern(me._allFilesListName, 0, id + ':*', function(result) {

            if (result.length < 2 ||
                result[1].length == 0
            ) {
                return callback({});
            }

            var currentRedisString = result[1][0];
            me._redisClient.removeItemFromSet(me._allFilesListName, currentRedisString, function(result) {

                return callback({deleted: true});
            });
        });
    };

    this.updateFileMetadata = function(id, updatedFileMetadata, callback) {

        me._redisClient.lookupSetWithPattern(me._allFilesListName, 0, id + ':*', function(result) {

            if (result.length < 2 ||
                result[1].length == 0
            ) {
                return callback({});
            }

            var currentRedisString = result[1][0];
            me._redisClient.removeItemFromSet(me._allFilesListName, currentRedisString, function(result) {

                var currentFileMetadataObject = utilsModule.toFileMetadataObject(currentRedisString);
                updatedFileMetadata.date = currentFileMetadataObject.date;

                var updatedRedisString = utilsModule.toRedisString(currentFileMetadataObject.id, updatedFileMetadata);

                me._redisClient.addToSet(me._allFilesListName, updatedRedisString, function() {

                    updatedFileMetadata.id = currentFileMetadataObject.id;

                    return callback(updatedFileMetadata);
                });
            });
        });
    };
}

exports.create = function () {

    if (!__helper_instance__) {
        __helper_instance__ = new redisHelper();
        __helper_instance__.initialize();
    }

    return __helper_instance__;
};
