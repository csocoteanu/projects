'use strict';

var redisHelper = require('../helpers/redisHelper.js').create();

module.exports = {
    createFileMetadata: createFileMetadata,
    updateFileMetadata: updateFileMetadata,
    getFileMetadata   : getFileMetadata,
    deleteFileMetadata : deleteFileMetadata,
    getLinkedFileMetadata: getLinkedFileMetadata
};

function getFileMetadata(req, res) {

    if (req.swagger.params.file_id && req.swagger.params.file_id.value) {

        var fileMetadataId = req.swagger.params.file_id.value;

        console.error('==================> GET: ', fileMetadataId);
        redisHelper.getFileMetadata(fileMetadataId, function(result) {

            res.json(JSON.stringify(result));
        });

        return;
    }

    if (req.swagger.params.platform.value && req.swagger.params.type.value) {

        var platform = req.swagger.params.platform.value;
        var type     = req.swagger.params.type.value;

        console.error('==================> GET: ', platform, type);
        redisHelper.getFileMetadataByPlatformAndType(platform, type, function(result) {

            res.json(JSON.stringify(result));
        });

        return;
    }

    res.json('{}');
}

function createFileMetadata(req, res) {

    var fileMetdataBody = req.body;

    console.error('==================> POST: ', fileMetdataBody);

    redisHelper.addFileMetadata(fileMetdataBody, function(result) {

        res.json(JSON.stringify(result));
    });
}

function updateFileMetadata(req, res) {

    var fileMetadataId = req.swagger.params.file_id.value;
    var fileMetdataBody = req.body;

    console.error('==================>PUT: ', fileMetadataId, fileMetdataBody);

    redisHelper.updateFileMetadata(fileMetadataId, fileMetdataBody, function(result) {

        res.json(JSON.stringify(result));
    });
}

function deleteFileMetadata(req, res) {

    var fileMetadataId = req.swagger.params.file_id.value;

    console.error('==================>DELETE: ', fileMetadataId);

    redisHelper.deleteFileMetadata(fileMetadataId, function(result) {

        res.json(JSON.stringify(result));
    });
}

function getLinkedFileMetadata(req, res) {

    if (req.swagger.params.target_file_id.value && req.swagger.params.type.value) {

        var target_file_id = req.swagger.params.target_file_id.value;
        var type     = req.swagger.params.type.value;

        console.error('==================> GET: ', target_file_id, type);
        redisHelper.getFileMetadataByTypeAndTargetFile(target_file_id, type, function(result) {

            res.json(JSON.stringify(result));
        });

        return;
    }

    res.json('{}');
}