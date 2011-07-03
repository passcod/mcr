var regular = /mangareader\.net\/[a-z0-9\-]+\/[0-9]+(\/.+)?/i,
    old = /mangareader\.net\/[0-9\-]+\/([a-z0-9\-]+)\/chapter-([0-9]+)\.htm/i;

var oldparts = old.exec(window.location.href);
if (oldparts !== null) {
  window.location = "http://www.mangareader.net/"+oldparts[1]+"/"+oldparts[2];
}

if (regular.test(window.location.href)) {
  document.getElementsByTagName('head')[0].innerHTML = '<title>Loading... -- ' + document.getElementsByTagName('title')[0].innerHTML + '</title>';
  document.getElementsByTagName('body')[0].innerHTML = '<p id="pre">Loading...</p>';
  var script = document.createElement('script');
  var src = document.createTextNode(GetIt());
  script.appendChild(src);
  script.type = "text/javascript";
  document.getElementsByTagName('body')[0].appendChild(script);
}