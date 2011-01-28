/**
 * Handy function to get the size of an object
 * @author James Coglan
 * @url http://stackoverflow.com/questions/5223/length-of-javascript-associative-array/6700#6700
 */
Object.size = function (obj) {
	"use strict";
	var size = 0, key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) {
			size++;
		}
	}
	return size;
};
