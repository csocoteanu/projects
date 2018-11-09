
exports.toRedisString = function(id, fileMetadataObject) {

    var fileRelationString = '';
    if (fileMetadataObject.file_relations) {

        for (var i in  fileMetadataObject.file_relations) {

            if (!fileMetadataObject.file_relations[i].external_id) {
                continue;
            }
            if (!fileMetadataObject.file_relations[i].type) {
                continue;
            }

            fileRelationString += fileMetadataObject.file_relations[i].external_id + ':' + fileMetadataObject.file_relations[i].type + ':';
        }
    }

    return id + ':' +
        fileMetadataObject.name + ':' +
        fileMetadataObject.platform + ':' +
        fileMetadataObject.date + ':' +
        fileRelationString;
};

exports.toFileMetadataObject = function(redisString) {

    if (!redisString) {
        return null;
    }

    var parts = redisString.split(':');
    if (parts.length == 0 || parts.length < 4) {
        return null;
    }

    var fileRelations = [];
    if (parts.length > 4) {

        for (var i = 4; i < parts.length; i += 2) {

            if (!parts[i] || parts[i] == '') {
                continue;
            }
            if (!parts[i + 1] || parts[i + 1] == '') {
                continue;
            }

            fileRelations.push({
                external_id : parts[i],
                type        : parts[i + 1]
            });
        }
    }

    return {
        id             : parts[0],
        name           : parts[1],
        platform       : parts[2],
        date           : parts[3],
        file_relations : fileRelations
    }
};

exports.toFileMetadataObjects = function(redisObjects) {

    var results = [];

    for (var i = 0; i < redisObjects.length; i++) {

        var fileMetadataObject = this.toFileMetadataObject(redisObjects[i]);
        results.push(fileMetadataObject);
    }

    return results;
};
