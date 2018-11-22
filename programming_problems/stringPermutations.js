var process = require('process');

function Stack() {

	var _me	   	 = this;
	this._values = [];

	this.push = function(value) {

		_me._values.push(value);
	}

	this.pop = function() {

		if (_me.isEmpty()) {

			return null;
		}

		return _me._values.pop();
	}

	this.isEmpty = function() {

		return _me._values.length == 0;
	}
}

function Tuple(first, second) {

	var _me = this;

	this._first  = first;
	this._second = second;

	this.getFirst = function() {

		return _me._first;
	}

	this.getSecond = function() {

		return _me._second;
	}
}

function removeCharAt(string, index) {

	if (index < 0 || index >= string.length) {

		return string;
	}

	return string.slice(0, index) + string.slice(index + 1);
}

function generateStringPermutationsIterative(string) {

	var result			  = [];
	var stack 			  = new Stack();
	var temporarySolution = new Tuple("", string);

	stack.push(temporarySolution);

	while (!stack.isEmpty()) {

		var temporarySolution = stack.pop();
		var currentSolution   = temporarySolution.getFirst();
		var remainingItems 	  = temporarySolution.getSecond();

		if (remainingItems.length == 0) {

			result.push(currentSolution);
			continue;
		}

		for (var i = 0; i < remainingItems.length; i++) {

			temporarySolution = new Tuple(currentSolution + remainingItems.charAt(i), removeCharAt(remainingItems, i));

			stack.push(temporarySolution);
		}
	}

	return result;
}

function generateStringPermuationsRecursive(currentSolution, remainingItems, result) {

	if (remainingItems.length == 0) {

		result.push(currentSolution);
		return;
	}

	for (var i = 0; i < remainingItems.length; i++) {

		generateStringPermuationsRecursive(
			currentSolution + remainingItems.charAt(i),
			removeCharAt(remainingItems, i),
			result);
	}
}

if (process.argv.length != 4) {

	console.error('Incorrect number of parameters!');
	return;
}

var currentSolution = "";
var isRecursive  	= process.argv[2] == "r";
var remainingItems  = process.argv[3];
var result		    = [];

if (!isRecursive) {

	result = generateStringPermutationsIterative(remainingItems);
} else {

	generateStringPermuationsRecursive(currentSolution, remainingItems, result);
}

console.log('Got: ' + result.length);
console.log(result);
