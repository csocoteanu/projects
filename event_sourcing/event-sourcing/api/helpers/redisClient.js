var redis_lib = require('ioredis');

function redisClient(masterName, sentinelsConfig) {

    let me = this;

    this._masterName       = masterName;
    this._sentinelsConfig  = sentinelsConfig;
    this._connection       = null;
    this._pubSubConnection = null;

    this.connect = function() {

        me._connection = me._createConnection('Main Connection');

        me._testConnection();
    };

    this.subscribe = function(channelName, callback) {
        console.log('[Redis] Subscribing to ', channelName);

        me._pubSubConnection = me._createConnection('Pub/Sub Connection');

        me._pubSubConnection
            .subscribe(channelName)
            .then(function(args) {
                console.log('[Redis] Succesfully subscribed: ', channelName, args);
            });

        me._pubSubConnection
            .on('message',function (channel, message) {
               console.log('[Redis] Received message: ', channel, message);

                if (callback) {
                    callback(message);
                }
            });
    };

    this.publish = function(channelName, message) {
        console.log('[Redis] Publishing message on channel', channelName, message);

        me._connection.publish(channelName, message);
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

    this._testConnection = function() {
        console.log('[Redis] Pinging Redis Server:', JSON.stringify(me._sentinelsConfig), me._connection.status);

        me._connection.ping().then(function(pong) {
            console.log('[Redis] Reply from Redis Server:', JSON.stringify(me._sentinelsConfig), pong, me._connection.status);
        });
    };

    this._createConnection = function (description) {
        var redisConnection = new redis_lib(
            {
                name        : me._masterName,
                sentinels   : me._sentinelsConfig,
                description : description
            });

        redisConnection.description = description;

        redisConnection.on('error', function(errArgs) {
            console.error('[Redis] Encountered Redis error', errArgs, redisConnection.description);
        }).on('connect', function() {
            console.error('[Redis][Connect Event]', redisConnection.description);
        }).on('close', function() {
            console.warn('[Redis][Close Event]', redisConnection.description);
        });

        return redisConnection;
    };
}

exports.create = function (masterName, sentinelsConfig) {
    console.log('[Redis] Creating redis client: ', masterName, JSON.stringify(sentinelsConfig));

    return new redisClient(masterName, sentinelsConfig);
};
