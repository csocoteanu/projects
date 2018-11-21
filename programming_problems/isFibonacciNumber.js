var process = require('process');

function isFibonacciNumber(value) {

	var fib0 = 0;
	var fib1 = 1;
	var nextFibonacciNumber = 0;

	while (nextFibonacciNumber < value) {

		nextFibonacciNumber = fib0 + fib1;
		fib0 = fib1;
		fib1 = nextFibonacciNumber;

		if (nextFibonacciNumber == value) {
			return true;
		}
	}

	return false;
}

if (process.argv.length != 3) {

	console.error('Incorrect number of parameters!');
	return;
}

var number = process.argv[2];
console.log(number  + ' is a Fibonacci number: ' + isFibonacciNumber(number));
