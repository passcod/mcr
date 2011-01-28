// ==UserScript==
// @name           Manga ChapterReader
// @license        MIT/X11 + Attribution (passcod)
// @namespace      http://www.mangareader.net
// @include        http://www.mangareader.net/*
// @description    Displays full chapters from MangaReader.net in a simpler interface.
// @author         passcod
// @version        11.20.edge
// ==/UserScript==

// version format: y.z

var regular = /mangareader\.net\/[a-z0-9\-]+\/[0-9]+(\/.+)?/i,
	old = /mangareader\.net\/[0-9\-]+\/([a-z0-9\-]+)\/chapter-([0-9]+)\.htm/i;

if ( regular.test(window.location) || old.test(window.location) ) {
	//load = 'http://scrap.book/userscripts/mangareader/parts/make.php';
	load = 'http://passcod.cz.cc/bleeding/?f=index.min.js';
	
	document.getElementsByTagName('head')[0].innerHTML = '<title>Loading...</title>';
	document.getElementsByTagName('body')[0].innerHTML = 'Loading...';
	var script = document.createElement('script');
	script.src = load;
	document.getElementsByTagName('head')[0].appendChild(script);
	document.getElementsByTagName('body')[0].innerHTML = "Loading "+load+"...";
}
