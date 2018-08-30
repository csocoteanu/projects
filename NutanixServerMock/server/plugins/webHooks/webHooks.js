var nutanixPluginModule  = require('../nutanixPlugin.js');
var constantsModule      = require('../../../utils/constants.js').constants;
var webHookTemplate      = require('./templates/webHook.js');
var requestModule        = require('request');
var utilsModule          = require('../../../utils/utils.js');
var httpModule           = require('https');
var eventsConfigurationModule   = require('./webhookEvents.js');

function webHooks() {

    var _me = this;

    _me._webHookInstances = {};
    _me._httpAgent = false;

    this.init = function () {

        _me._httpAgent = new httpModule.Agent({
            keepAlive: true,
            maxSockets: 1,
            maxFreeSockets: 1,
            timeout: 600000,
            keepAliveTimeout: 30000 // free socket keepalive for 30 seconds
        });
    };

    this.shouldHandleRequest = function (data) {

        return data.urlpath.indexOf('/api/nutanix/v3/webhooks') >= 0;
    };

    this.process = function (data, callback) {

        // process POST requests
        if (data.reqq.method == "POST") {

            return _me._processPostRequest(data, function (data)  {

                // should add the generate events method here
                if (data.startEventGeneration) {

                    setTimeout(function(){

                            _me._generateEvents(data);

                    }, eventsConfigurationModule.SEND_EVENTS_DELAY);
                }

                return callback(0, data);
            });
        }

        // process DELETE requests
        if (data.reqq.method == "DELETE") {

            return this._processDeleteRequest(data, callback);
        }

        // fallback
        data.server.updateResponseData(data, constantsModule.httpErrorCodes.OK, JSON.stringify({entities:[]}), false);
        return callback(0, data);
    };

    this._emitUuid = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };

    this._processPostRequest = function (data, callback) {

        var body = "";
        data.reqq.on("data", function(chunk){
            body += chunk;
        });

        // here the POST body is finished
        data.reqq.on("end", function(){
            body = JSON.parse(body);

            // listing webhooks
            if (data.urlpath.indexOf('webhooks/list') >= 0) {

                // extract filter
                var filter = body.filter ? body.filter : null;

                data.server.logDebug('[webhooks] Returning elements for filter', filter);

                // get the webHooks
                data.server.updateResponseData(data, constantsModule.httpErrorCodes.OK, JSON.stringify(_me._getWebHooksResponse(filter)), false);

            // creating webhooks
            } else if (body.spec) {

                // generate uuid
                var uuid = _me._emitUuid();

                data.server.logDebug('[webhooks] Creating new webhook with uuid', uuid);

                // generate web hook
                _me._webHookInstances[uuid] = webHookTemplate.newWebHook(uuid, body.spec.name, body.spec.description, body.spec.resources.post_url, body.spec.resources.events_filter_list);

                // notify to start event generation
                data.startEventGeneration = true;

                // set the web hook to be returned
                data.server.updateResponseData(data, constantsModule.httpErrorCodes.OK, JSON.stringify(_me._webHookInstances[uuid]), false);

            // fallback
            } else {

                data.server.logDebug('[webhooks] Returning blank response for unhandled case');

                data.server.updateResponseData(data, constantsModule.httpErrorCodes.OK, JSON.stringify({entities: []}), false);
            }

            return callback(data);
        });
    };

    this._getWebHooksResponse = function(filter) {

        var allWebHooks = {
            "api_version": "3.0",
            "metadata": {
                "total_matches": 0,
                "kind": "webhook",
                "length": 0,
                "offset": 0
            },
            "entities": []
        };

        // get name filter
        var filterValue = (filter) ? filter.split("==")[1] : null;

        // loop webhooks and return the needed ones
        for (var uuid in _me._webHookInstances) {

            if (!filterValue || ( filterValue && _me._webHookInstances[uuid].spec.name.indexOf(filterValue) >= 0)) {

                allWebHooks.entities.push(_me._webHookInstances[uuid]);
                allWebHooks.metadata.total_matches++;
                allWebHooks.metadata.length++;
            }
        }

        return allWebHooks;
    };

    this._processDeleteRequest = function (data, callback) {

        var urlParts = data.urlpath.split('/');
        var uuid = urlParts.pop();

        data.server.logDebug('[webhooks] Removing a webhook with uuid', uuid);
        delete _me._webHookInstances[uuid];

        data.server.updateResponseData(data, constantsModule.httpErrorCodes.OK, JSON.stringify({}), false);
        return callback(0, data);
    };

    this._cleanUp = function(topology, eventType, vmIndex) {

        switch (eventType) {
            case eventsConfigurationModule.EVENT_TYPE_VM_DELETE:
                topology['vms']['entities'].splice(vmIndex, 1);
                break;
            case eventsConfigurationModule.EVENT_TYPE_POWER_STATE_CHANGE:
                break;
        }

    },

    this._sendEvent = function(data, webHookIndex, callback) {

        var uri =  _me._webHookInstances[webHookIndex].spec.resources.post_url;
        var params = {
            method  : 'POST',
            uri     : uri,
            json    : data.event,
            headers : { 'content-type': 'application/json' },
            agent   : _me._httpAgent
        };

        // ignore errors for self signed certs
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

        data.server.logDebug('[webhooks] sending event type ',data.currentEventType, ' to url ', uri);
        requestModule(params, function(error, response, body) {

            if (error) {

                data.server.logDebug('[webhooks] Received ERROR for event', error.message);
            }else if (response && response.statusCode == 200) {

                data.server.logDebug('[webhooks] Received response for event with status', 200);

            } else {

                data.server.logDebug('[webhooks] Received response for event with status', response.statusCode);
            }

         });

        return callback(0, data);
    };

    this._generateEvent = function(data, callback) {

        var randomIndex = Math.floor((Math.random() * data.server.topology['vms']['entities'].length));
        var vm = data.server.topology['vms']['entities'][randomIndex];

        data.event   = eventsConfigurationModule.generateEvent(data.currentEventType, vm);
        data.vmIndex = randomIndex;

        return callback(0, data);

    };

    this._sendEvents = function(data, callback) {

        var cbk = function(error, data) {

            var vmIndex   = data.vmIndex;
            var eventType = data.currentEventType;

            _me._cleanUp(data.server.topology, eventType, vmIndex);

            return callback(0,data);
        };

        utilsModule.foreachRun(_me._sendEvent, data, cbk, _me._webHookInstances);
    };

    this._generateEvents = function (data) {

        var eventData = {
            server: data.server,
            topology: data.server.topology,
            currentEventIndex: null,
            currentEvent: null
        };

        var callback = function (error, data) {

            data.server.logDebug("[webhooks] finished sending events");
        };

        utilsModule.foreachRun(function(data, eventIndex, callback){

            data.currentEventType = eventsConfigurationModule.events[eventIndex].type;

            var vmsCount = eventsConfigurationModule.events[eventIndex].count;
            var index = 0;

            while (index < vmsCount) {

                utilsModule.sequenceRun([_me._generateEvent, _me._sendEvents], data, callback);
                index++;
            }

        }, eventData, callback, eventsConfigurationModule.events)
    };
}

webHooks.prototype = new nutanixPluginModule.nutanixPlugin();

exports.create = function() {
    return new webHooks();
};