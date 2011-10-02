// ==UserScript==
// @name           MR.net Chapter Reader
// @description    Displays full chapters from MR.net in a simple interface.
// @author         Félix Saparelli
// @license        MIT
// @namespace      http://passcod.net/mcr
// @include        http://www.mangareader.net/*
// @include        http://mangareader.net/*
// @version        0.1
// ==/UserScript==

var regular = /mangareader\.net\/[a-z0-9\-]+\/[0-9]+(\/.+)?/i,
    old = /mangareader\.net\/[0-9\-]+\/([a-z0-9\-]+)\/chapter-([0-9]+)\.htm/i;

var oldparts = old.exec(window.location.href);
if (oldparts !== null) {
  window.location = "http:\/\/www.mangareader.net/"+oldparts[1]+"/"+oldparts[2];
}

if (regular.test(window.location.href)) {
  document.getElementsByTagName('head')[0].innerHTML = '<title>Loading... / MR.net Chapter Reader</title>';
  document.getElementsByTagName('body')[0].innerHTML = '<p id="pre">Initializing...</p>';
  var script = document.createElement('script');
  script.src = "http:\/\/localhost:8080/build/mcr.js";
  script.type = "text/javascript";
  document.getElementsByTagName('body')[0].appendChild(script);
}

