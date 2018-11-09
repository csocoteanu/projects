var redis_lib = require('ioredis');

function redisClient(masterName, sentinelsConfig) {

    var me = this;

    this._masterName       = masterName;
    this._sentinelsConfig  = sentinelsConfig;
    this._connection       = null;

    this.connect = function() {

        me._connection = me._createConnection();

        me._testConnection();
    };

    this.flushall = function() {

        me._connection.call('flushall', function() { console.log('EMPTYING REDIS'); });
    };

    this.get = function(key, callback) {

        console.log('[REDIS ]Starting GET', key);

        me._connection.call('get', key).then(function(value) {
            console.log('[REDIS] GET done', key);

            if (callback) {
                callback(value);
            }
        });
    };

    this.set = function(key, value, callback) {

        console.log('[REDIS] Starting SET', key);

        me._connection.call('set', key, value).then(function(result) {
            console.log('[REDIS] SET done', key);

            if (callback) {
                callback(result);
            }
        });
    };

    this.addToSet = function(list, value, callback) {

        console.log('[REDIS] Starting SADD', list);

        me._connection.call('SADD', list, value).then(function(result) {
            console.log('[REDIS] SADD done', result);

            if (callback) {
                callback(result);
            }
        });
    };

    this.lookupSetWithPattern = function(list, startIndex, pattern, callback) {

        console.log('[REDIS] Starting sscan', list, pattern);

        me._connection.call('SSCAN', list, startIndex, 'match', pattern).then(function(result) {
            console.log('[REDIS] SSCAN done', result);

            if (callback) {
                callback(result);
            }
        });
    };

    this.removeItemFromSet = function(list, item, callback) {

        console.log('[REDIS] Starting SREM', list);

        me._connection.call('SREM', list, item).then(function(result) {
            console.log('[REDIS] SREM done', result);

            if (callback) {
                callback(result);
            }
        });
    };

    this.setItemInList = function(list, index, value, callback) {

        console.log('[REDIS] Starting LSET', list);

        me._connection.call('lset', list, index, value).then(function(result) {
            console.log('[REDIS] LSET done', result);

            if (callback) {
                callback(result);
            }
        });
    };

    this.getAllListItems = function(list, callback) {

        console.log('[REDIS] Starting LRANGE', list);

        me._connection.call('lrange', list, 0, -1).then(function(result) {
            console.log('[REDIS] LRANGE done');

            if (callback) {
                callback(result);
            }
        });
    };

    this._testConnection = function() {

        console.log('[Redis] Pinging Redis Server:', JSON.stringify(me._sentinelsConfig), me._connection.status);

        me._connection.ping().then(function(pong) {
            console.log('[Redis] Reply from Redis Server:', JSON.stringify(me._sentinelsConfig), pong, me._connection.status);
        });
    };

    this._createConnection = function () {

        var redisConnection = new redis_lib(
            {
                name        : me._masterName,
                sentinels   : me._sentinelsConfig
            });

        redisConnection.on('error', function(errArgs) {
            console.error('[Redis] Encountered Redis error', errArgs);
        }).on('connect', function() {
            console.error('[Redis][Connect Event]');
        }).on('close', function() {
            console.warn('[Redis][Close Event]');
        });

        return redisConnection;
    };
}

exports.create = function (masterName, sentinelsConfig) {

    console.log('[Redis] Creating redis client: ', masterName, JSON.stringify(sentinelsConfig));

    return new redisClient(masterName, sentinelsConfig);
};
