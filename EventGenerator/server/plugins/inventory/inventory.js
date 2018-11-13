var nutanixPluginModule  = require('../nutanixPlugin.js');
var constantsModule      = require('../../../utils/constants.js').constants;

var clusterTemplate      = require('./templates/cluster.js');
var hostsTemplate        = require('./templates/host.js');
var vmsTemplate          = require('./templates/vm.js');
var topology             = require('./topology.js').topology;

var fileSystem           = require('fs');
var big_json             = require('big-json');

function inventory() {

    var _me = this;

    /**
     *
     * @type {{/api/nutanix/v3/clusters/list: *, /api/nutanix/v2.0/hosts: *, /api/nutanix/v1/vms: *}}
     * @private
     */
    this._urlsToEntityType = {
        '/api/nutanix/v3/clusters/list' : 'clusters',
        '/api/nutanix/v2.0/hosts'       : 'hosts',
        '/api/nutanix/v1/vms'           : 'vms'
    };

    /**
     *
     * @type {{}}
     * @private
     */
    this._entities = {
        'clusters': { entities: [] },
        'hosts': { entities: [] },
        'vms': { entities: [] }
    };

    this.init = function (serverInstance) {

        _me._emitTopology(_me._writeTopologyToFiles);
        serverInstance.topology = _me._entities;
    };

    this.shouldHandleRequest = function (data) {

        return _me._urlsToEntityType.hasOwnProperty(data.urlpath);
    };

    this.process = function (data, callback) {

        var entityType = _me._urlsToEntityType[data.urlpath];
        var entityValues = _me._entities[entityType];

        if (entityValues) {

            data.server.logDebug('Returning elements for', entityType, entityValues.entities.length);

            data.server.updateResponseData(data, constantsModule.httpErrorCodes.OK, entityType + '.json', false);
            return callback(0, data);
        }

        return callback(1, data);
    };

    this._emitUuid = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };

    this._emitIp = function() {
        return (Math.floor(Math.random() * 255) + 1) + "." +
            (Math.floor(Math.random() * 255) + 0) + "." +
            (Math.floor(Math.random() * 255) + 0) + "." +
            (Math.floor(Math.random() * 255) + 0);
    };

    this.emitMac = function (){

        // from https://stackoverflow.com/questions/24621721/how-would-one-generate-a-mac-address-in-javascript
        var hexDigits = "0123456789ABCDEF";
        var macAddress = "";
        for (var i = 0; i < 6; i++) {

            macAddress+=hexDigits.charAt(Math.round(Math.random() * 15));
            macAddress+=hexDigits.charAt(Math.round(Math.random() * 15));

            if (i != 5) macAddress += ":";
        }

        return macAddress;
    };

    this._emitTopology = function (callback) {

        for (var i = 0; i < topology.clusters.count; i++) {

            var clusterName = topology.clusters.name + '-' + (i + 1);
            var clusterUuid = _me._emitUuid();
            var cluster     = clusterTemplate.newCluster(clusterName, clusterUuid, _me._emitIp());

            _me._entities['clusters'].entities.push(cluster);

            for (var j = 0; j < topology.clusters.hosts.count; j++) {

                var hostName = topology.clusters.hosts.name + '-' + (j + 1);
                var hostUuid = _me._emitUuid();
                var host     = hostsTemplate.newHost(hostName, clusterUuid, hostUuid, _me._emitIp());

                _me._entities['hosts'].entities.push(host);

                for (var k = 0; k < topology.clusters.hosts.vms.count; k++) {
                    var vmName = topology.clusters.hosts.vms.name + '-' + (k + 1);
                    var vm     = vmsTemplate.newVm(vmName, hostUuid, clusterUuid, _me._emitUuid(), _me._emitIp(), _me.emitMac());

                    _me._entities['vms'].entities.push(vm);
                }
            }
        }

        return callback();
    };

    this._writeTopologyToFiles = function() {

        var clusterStream = fileSystem.createWriteStream('clusters.json', {flags: 'w'});
        var hostStream = fileSystem.createWriteStream('hosts.json', {flags: 'w'});
        var vmStream = fileSystem.createWriteStream('vms.json', {flags: 'w'});

        const clusterStringifyStream = big_json.createStringifyStream({
            body:  _me._entities['clusters']
        });

        clusterStringifyStream.on('data', function(strChunk) {
            clusterStream.write(strChunk);
        });

        const hostStringifyStream = big_json.createStringifyStream({
            body: _me._entities['hosts']
        });

        hostStringifyStream.on('data', function(strChunk) {
            hostStream.write(strChunk);
        });

        const vmStringifyStream = big_json.createStringifyStream({
            body: _me._entities['vms']
        });

        vmStringifyStream.on('data', function(strChunk) {
            vmStream.write(strChunk);
        });
    }
}

inventory.prototype = new nutanixPluginModule.nutanixPlugin();

exports.create = function() {
    return new inventory();
};