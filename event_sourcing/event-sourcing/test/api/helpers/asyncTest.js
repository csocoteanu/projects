var async = require("async");

function init(callback) {

    return callback(null, { hello: null, world: null})
}

function helloFunction(data, callback) {

    setTimeout(function() {

        console.log('hello got:',  data);
        data.hello = true;

        return callback(null, data);
    }, 500);
}

function worldFunction(data, callback) {

    console.log("world got: ", data);
    data.world = true;

    return callback(null, data);
}

async.waterfall([
    init,
    helloFunction,
    worldFunction],

    function (err, results) {

        // results is an array of the value returned from each function
        // Handling errors here
        if (err)    {
            console.error('ERROR===>', err, results);
            return;
        }

        console.log(JSON.stringify(results));
    });
