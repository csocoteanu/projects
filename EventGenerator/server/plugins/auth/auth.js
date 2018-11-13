var nutanixPluginModule  = require('../nutanixPlugin.js');
var userInfoTemplate     = require('./templates/userInfo.js').userInfo;
var constantsModule      = require('../../../utils/constants.js').constants;

function auth() {

    this.init = function () { };

    this.shouldHandleRequest = function (data) {

        return data.urlpath == '/api/nutanix/v3/users/me';
    };

    this.process = function (data, callback) {

        data.server.logInfo('Hello Auth');

        data.server.updateResponseData(data, constantsModule.httpErrorCodes.OK, JSON.stringify(userInfoTemplate), false);
        return callback(0, data);
    }
}

auth.prototype = new nutanixPluginModule.nutanixPlugin();

exports.create = function() {
    return new auth();
};
