/**
  * @param input array of chars
  * @param index1 int  
  * @param index2 int   
  */
function swap(input, index1, index2) {

	var temp = input[index1];
	input[index1] = input[index2];
	input[index2] = temp;
}

/**
  * @param input array of chars
  * @param start int   starting index where the reversing must start
  * @param end int     ending index
  */
function reverseSubsequence(input, start, end) {

	var temp = null;

	while (start < end) {

		swap(input, start, end);

		start++;
		end--;
	}
}

/**
  * @param input array of chars
  */
function reverseWords(input) {

	var sequenceStartIndex = 0;
	var sequenceEndIndex = 0;

	if (!input) {

		return;
	}

	while (sequenceEndIndex < input.length) {

		if (input[sequenceEndIndex] == ' ') {

			reverseSubsequence(input, sequenceStartIndex, sequenceEndIndex - 1);

			sequenceStartIndex = sequenceEndIndex + 1;
		}

		sequenceEndIndex++;
	}

	reverseSubsequence(input, sequenceStartIndex, sequenceEndIndex - 1);

	return input;
}

function runTests(inputs, expectedOutputs) {

	if (inputs.length != expectedOutputs.length) {

		return;
	}

	for (var i = 0; i < inputs.length; i++) {

		var result = reverseWords(inputs[i]);
		var resultsAreEqual = JSON.stringify(result) === JSON.stringify(expectedOutputs[i]);
		var status = (resultsAreEqual) ? "OK" : "FAILED";

		console.log('Test #' + (i + 1) + '...reversing input: ' + inputs[i] + ' expectedOutputs: ' + expectedOutputs[i] + ' ' + status);
	}
}

/*var input = ['I', ' ', 'l','o','v','e',' ','T','a','x','i','f','y'];
var result = reverseWords(input);

console.log(result);*/

var inputs = [
	null,
	[],
	['l','o','v','e'],
	[' ', ' '],
	['I', ' ', 'l','o','v','e',' ','T','a','x','i','f','y']
];

var outputs = [
	null,
	[],
	['e', 'v', 'o', 'l'],
	[' ', ' '],
	[ 'I', ' ', 'e', 'v', 'o', 'l', ' ', 'y', 'f', 'i', 'x', 'a', 'T' ]
];

runTests(inputs, outputs);
