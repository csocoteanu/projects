
function Node(value, left, right) {

	var _me = this;

	this._value = value;
	this._left  = left;
	this._right = right;

	this.getValue = function() {

		return _me._value;
	}

	this.getLeft = function() {

		return _me._left;
	}

	this.getRight = function() {

		return _me._right;
	}

	this.printIndentedValue = function(level) {

		var printedValue = "";

		for (var i = 0; i < 4 * level; i++) {

			printedValue += " ";
		}

		printedValue += _me._value;

		console.log(printedValue);
	}

	this.printRecursive = function(level) {

		_me.printIndentedValue(level);

		if (_me._left) {

			_me._left.printRecursive(level + 1);
		}

		if (_me._right) {

			_me._right.printRecursive(level + 1);	
		}
	}

	this.toLinkedList = function() {

		var result = _me;
		var leftMostNode = null;
		var rightMostNode = null;

		if (_me._left) {

			leftMostNode 	    = _me._left.toLinkedList();
			leftMostNode._right = _me;
			leftMostNode._left  = null;
		}

		if (_me._right) {

			rightMostNode = _me._right.toLinkedList();
		}

		return result;
	}
}

var tree = new Node(10, 
						new Node(12, 
									new Node(25, null, null), 
									new Node(30, null, null)
								),
						new Node(15, 
									new Node(36, null, null), 
									new Node(40, null, null)
								));

tree.printRecursive(0);

console.log('----------------------------->');
var ll = tree.toLinkedList();
ll.printRecursive(0);