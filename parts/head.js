/*jslint onevar: true, undef: true, nomen: true, newcap: true, immed: true, strict: true, browser: true */
/*global window, $, jQuery, JSON */

/**
 * Provides support for default arguments in functions.
 * @author fatbrain
 * @url    http://parentnode.org/javascript/default-arguments-in-javascript-functions/
 */
Function.prototype.defaults = function () {
	"use strict";
	var f = this,
		a = [f.length-arguments.length];
	
	a = a.concat(Array.prototype.slice.apply(arguments));
	return function () {
		return f.apply(f, Array.prototype.slice.apply(arguments).concat(a.slice(arguments.length, a.length)));
	};
};

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
