var async = require("async");

var data = {
  hello: null,
  world: null
};

function helloFunction(callback) {

    console.log('====>', data);

    setTimeout(function() {

        data.hello = true;

        console.log('hello');
        return callback(null, data);
    }, 500);
}

function worldFunction(data, callback) {

    console.log("world: ", data);
    return callback(null, data);
}

async.waterfall([helloFunction, worldFunction], function (err, results) {

    // results is an array of the value returned from each function
    // Handling errors here
    if (err)    {
        console.error('ERROR: ', err);
    }

    console.log(JSON.stringify(results));
});
