let configModule  = require('../../../config/config.js');
let redisModule   = require('../../../api/helpers/redisClient.js');
let processModule = require('process');

console.log('---> Starting test!');
console.log('---> Creating redis client');

let redisClient = redisModule.create(
    configModule.config.redis.master_name,
    configModule.config.redis.sentinels
);

let pidTopic = 'Microservices_PIDS';
let archInfo = {
    pid  : processModule.pid,
    os   : processModule.platform,
    arch :  processModule.arch
};

console.log('---> Connecting to redis server');
redisClient.connect();

console.log('---> Subscribing to ' + pidTopic   );
redisClient.subscribe(pidTopic, function(pid) {
    if (pid == archInfo.pid) {
        return;
    }

    redisClient.get(pid, function(message) { console.log('Incomming microservice ===============>', message); });
});

setTimeout(function() {
    console.log('---> Storing arch info:', JSON.stringify(archInfo));

    redisClient.set(archInfo.pid, JSON.stringify(archInfo), function() {
        redisClient.publish(pidTopic, archInfo.pid);
    });
}, 30000);
