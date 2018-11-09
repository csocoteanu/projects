let configModule  = require('../../../config/config.js');
let redisModule   = require('../../../api/helpers/redisClient.js');
let async         = require('async');


console.log('---> Starting test!');
console.log('---> Creating redis client');

let redisClient = redisModule.create(
    configModule.config.redis.master_name,
    configModule.config.redis.sentinels
);

console.log('---> Connecting to redis server');
redisClient.connect();

function addToList(callback) {

    redisClient.addToList('mylist', 1, function() {

        console.log('---> Adding to redis list');

        return callback();
    });
}

function printList(callback) {

    redisClient.getAllListItems('mylist', function(result) {

        console.log('---> get all items: ', result);

        return callback();
    });
}

async.waterfall([
        addToList,
        addToList,
        printList],

    function (err, results) {

        // results is an array of the value returned from each function
        // Handling errors here
        if (err)    { console.error('ERROR===>', err, ''); }
    });