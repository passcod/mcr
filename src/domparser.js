/** @see https://sites.google.com/a/van-steenbeek.net/archive/explorer_domparser_parsefromstring */
if (typeof DOMParser === 'undefined') {
  DOMParser = function () {};
  
  DOMParser.prototype.parseFromString = function (str, contentType) {
    var xmldata;
    
    if (typeof ActiveXObject !== 'undefined') {
      xmldata = new ActiveXObject('MSXML.DomDocument');
      
      xmldata.async = false;
      xmldata.loadXML(str);
      
      return xmldata;
    } else if (typeof XMLHttpRequest !== 'undefined') {
      xmldata = new XMLHttpRequest();
      
      if (!contentType) {
        contentType = 'application/xml';
      }
      
      xmldata.open('GET', 'data:' + contentType + ';charset=utf-8,' + encodeURIComponent(str), false);
      
      if (xmldata.overrideMimeType) {
        xmldata.overrideMimeType(contentType);
      }
      
      xmldata.send(null);
      return xmldata.responseXML;
    }
  };
}