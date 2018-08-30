var fs = require('fs');
var path = require('path');
var request = require('request');
var http = require("http");
var process = require('process');
var async = require('async');
var utilsModule = require('../utils/utils.js');

function client(config) {

    var me = this;

    this.keepAliveAgent = new http.Agent({
            keepAlive: true,
            maxSockets: 1,
            maxFreeSockets: 1,
            timeout: 60000,
            keepAliveTimeout: 30000 // free socket keepalive for 30 seconds
    });

    this.getParams = function(url) {

        var params = {
            method: 'GET',
            url: url
        };

        if (url.indexOf('https') >= 0) {
            params.rejectUnauthorized = false;
            params.requestCert = true;
            params.agent = false;
        }

        return params;
    };


    this.sendGet = function(data, callback) {

        var params = me.getParams(data.link);

        console.log('====> GET', params);

        request(params, function(error, response, body) {

            if (me.config.debug) {
                utilsModule.log('Received GET response', (error) ? 404 : response.statusCode);
            }
            if (error) {
                utilsModule.log('Error during GET', error);
            }

            data.fileInfo.content = body;

            return callback(0, data);
        });
    };

    this.config = config;
    this.url = config.url;

    console.log('Creating client!', this.url);
}

exports.create = function(config) { return new client(config); };
