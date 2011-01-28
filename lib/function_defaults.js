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
