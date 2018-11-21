// TODO: list.print(); this will loop forever
// TODO: read list from argv

function Node(value) {

	var _me = this;

	_me._value    = value;
	_me._nextNode = null;

	_me.add = function (node) {

		node._nextNode = _me;
		_me = node;
	}

	_me.print = function () {

		var currentNode = _me;

		while (currentNode) {

			console.log(currentNode._value);
			currentNode = currentNode._nextNode;
		}
	}

	_me.hasCycles = function () {

		var currentNode   = _me;
		var jumptTwoNodes = (_me._nextNode && _me._nextNode._nextNode) ? _me._nextNode._nextNode : null;

		while (currentNode != null && jumptTwoNodes != null) {

			if (currentNode == jumptTwoNodes) {

				return true;
			}

			currentNode   = currentNode._nextNode;
			jumptTwoNodes = jumptTwoNodes._nextNode && jumptTwoNodes._nextNode._nextNode;
		}

		return false;
	}
}

var list = new Node(1);
list.add(new Node(2));
list.add(list);

console.log('List has cycles: ' + list.hasCycles());
