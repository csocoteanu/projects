var process = require('process');

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

/*
 * TODO: The array has to be sorted
 * Complexity = O(n*logn + n) = O(n * log n)
 *
 */
function arrayHasSumOfNumbers(array, value) {

	if (array.length < 2) {

		return null;
	}

	var startIndex  = 0;
	var endIndex    = array.length - 1;
	var elementsSum = 0;

	while (startIndex < endIndex) {

		elementsSum = array[startIndex] + array[endIndex];

		if (value == elementsSum) {

			return new Tuple(startIndex, endIndex);
		}

		if (value > elementsSum) {

			startIndex++;
		}

		if (value < elementsSum) {

			endIndex--;
		}
	}
}

// TODO: read input from a file
var array = [1, 2, 4, 6, 8, 19, 20, 21];

var indexes = arrayHasSumOfNumbers(array, 15);

console.log(indexes);
