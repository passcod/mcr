// ==UserScript==
// @name           Manga ChapterReader
// @description    Displays full chapters from MangaReader.net in a simpler interface.
// @author         passcod
// @license        MIT/X11 + Attribution
// @version        11.32
// @namespace      http://www.mangareader.net
// @include        http://www.mangareader.net/*
// @include        http://mangareader.net/*
// ==/UserScript==
// version format: y.z

var regular = /mangareader\.net\/[a-z0-9\-]+\/[0-9]+(\/.+)?/i,
	old = /mangareader\.net\/[0-9\-]+\/([a-z0-9\-]+)\/chapter-([0-9]+)\.htm/i;

if ( regular.test(window.location) || old.test(window.location) ) {
	document.getElementsByTagName('head')[0].innerHTML = '<title>Loading... -- '+
	  document.getElementsByTagName('title')[0].innerHTML+'</title>';
	
	document.getElementsByTagName('body')[0].innerHTML = '<p id="pre">Loading...</p>';
	var script = document.createElement('script');
	//var src = document.createTextNode(base64_decode(GetIt()));
	//script.appendChild(src);
	script.type = "text/javascript";
	script.src = "http://scrap.book/userscripts/mangareader/bin/mcr.js";
	document.getElementsByTagName('body')[0].appendChild(script);
}
