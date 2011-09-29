$(function (){
  document.onkeydown = function() {};
  
  /**
   * Parses the current URL to extract information:
   * manga name, chapter number, page number
   *
   * @return {Array} Resulting info.
   */
  var parseURL = function () {
    var U = {},
      url_str = window.location.href,
      Ro = /mangareader\.net\/[0-9]+\-[0-9]+\-([0-9]+)\/([a-z0-9\-]+)\/chapter-([0-9]+)\.html?/i.exec(url_str), // Old
      Rn = /mangareader\.net\/([a-z0-9\-]+)(\/[0-9]+)?(\/[0-9]+)?/i.exec(url_str), // New
      ss = /[\/]/; // Slash-stripper

    if ( Ro !== null ) {
      U.page    = Ro[1] ? Number(Ro[1].replace(ss, '')) : null;
      U.manga   = Ro[2] ?        Ro[2].replace(ss, '')  : null;
      U.chapter = Ro[3] ? Number(Ro[3].replace(ss, '')) : null;
    } else if ( Rn !== null ) {
      U.manga   = Rn[1] ?        Rn[1].replace(ss, '')  : null;
      U.chapter = Rn[2] ? Number(Rn[2].replace(ss, '')) : null;
      U.page    = Rn[3] ? Number(Rn[3].replace(ss, '')) : null;
    } else {
      return null;
    }

    return U;
  };
  
  Ui.init();
});
