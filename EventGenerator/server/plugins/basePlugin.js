function basePlugin() {

    this.init = function(serverInstance) { };

    this.shouldHandleRequest = function (data) { return true; };

    this.process = function (data, callback) {

    }
}

exports.basePlugin = basePlugin;
