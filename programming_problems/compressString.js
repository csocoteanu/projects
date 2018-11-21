var process = require('process');

function compressString (inputString) {

	var result = "";

	for (var i = 0; i < inputString.length; ) {

		var currentCharacter 	  = inputString.charAt(i);
		var currentCharacterCount = 0;

		while (inputString.charAt(i) == currentCharacter) {

			currentCharacterCount++;
			i++;
		}

		result += `${currentCharacter}${currentCharacterCount}`;
	}

	return result;
}

if (process.argv.length != 3) {

	console.error('Incorrect number of parameters!');
	return;
}

var inputString      = process.argv[2];
var compressedString = compressString(inputString);

console.log('Compressed string: ' + inputString + ' to ' + compressedString);
