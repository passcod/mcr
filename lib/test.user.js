// ==UserScript==
// @name           MCR 3: 死の色
// @description    Displays full chapters from MR.net in a simple interface.
// @author         Felix Saparelli
// @license        MIT
// @version        11.184a
// @namespace      http://www.mangareader.net
// @include        http://www.mangareader.net/*
// @include        http://mangareader.net/*
// ==/UserScript==
// version format: y.z

var regular = /mangareader\.net\/[a-z0-9\-]+\/[0-9]+(\/.+)?/i,
	old = /mangareader\.net\/[0-9\-]+\/([a-z0-9\-]+)\/chapter-([0-9]+)\.htm/i;

var regular = /mangareader\.net\/[a-z0-9\-]+\/[0-9]+(\/.+)?/i,
    old = /mangareader\.net\/[0-9\-]+\/([a-z0-9\-]+)\/chapter-([0-9]+)\.htm/i;

var oldparts = old.exec(window.location.href);
if (oldparts !== null) {
  window.location = "http://www.mangareader.net/"+oldparts[1]+"/"+oldparts[2];
}

if (regular.test(window.location.href)) {
	document.getElementsByTagName('head')[0].innerHTML = '<title>Loading... -- '+
	  document.getElementsByTagName('title')[0].innerHTML+'</title>';
	
	document.getElementsByTagName('body')[0].innerHTML = '<p id="pre">Loading...</p>';
	
  var script = document.createElement('script');
	script.type = "text/javascript";
	script.src = "http://localhost/mcr.js";
	document.getElementsByTagName('body')[0].appendChild(script);
}