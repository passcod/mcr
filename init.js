$(function (){
  // Disable the annoying 'skip to next page' keyboard shortcut
  function omvKeyPressed() {}
  document.onkeydown = function() {};
  
  var options = [
    {
      "name": "spacing",
      "description": "Add spacing between pages.",
      "default": true
    },
    {
      "name": "invert",
      "description": "Black theme"
    },
    {
      "name": "horizontal",
      "description": "Horizontal reading. Minimum comfortable screen height 768px, recommended 1200px."
    },
    {
      "name": "forced800",
      "description": "Force image width to 800. Provides a more uniform reading experience (in vertical mode), but you might want to disable it if the text is too small to read. In horizontal mode, it is better to disable it."
    },
    {
      "name": "fullwidth",
      "description": "Allows the nav/panels to extends to the full width of the screen.",
      "default": true
    }
  ];
  
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
  
  
  var ui    = new Ç.Ui(),
      info  = parseURL(),
      manga = -1,
      
      gotinfo = false,
      
      c = new Ç.Chapter(info.manga, info.chapter);
  
  c.get();
  
  $(window).bind("gotchapter", function(e, pages, chap) {
      if (manga == -1) {
        manga = new Ç.Manga(info.manga, c.mangaid());
        manga.setChapter(info.chapter);
      }
      
      ui.display(pages);
      
      if (gotinfo) {
        ui.setInfo(
          false,
          manga.getChapter(),
          manga.chapters()[manga.getChapter()].name
        );
        
        ui.setStatus('');
        ui.updateURL();
      }
    })
    
    .bind("gotinfo", function(e, page) {
      manga.addChapter(c);
      gotinfo = true;
      
      ui.setInfo(
        manga.info().name,
        manga.getChapter(),
        manga.chapters()[manga.getChapter()].name,
        manga.info().artist,
        manga.info().author,
        manga.info().pubdate,
        manga.info().status,
        manga.info().description,
        manga.info().cover
      );
      
      ui.setStatus('');
      ui.updateURL();
    })
    
    .bind("gotpage", function(e, page, chap) {
      ui.setStatus('Loading Ch. '+(+chap.num())+' ('+page+')');
    })
    
    
    .bind("firstchapter", function() {
      ui.setStatus('This is the first chapter');
    })
    
    .bind("lastchapter", function() {
      ui.setStatus('This is the last chapter');
    })
    
    
    /* Navigation */
    .bind("keyreload hitreload", function() {
      window.location = $('#button-permalink').attr('href');
    })
    
    .bind("keyprevious hitprevious", function() {manga.previousChapter();})
    .bind("keynext hitnext", function() {manga.nextChapter();});
  
  for (var n in options) {
    ui.addOption(options[n]);
    
    (function(name) {
      $(window).bind("keyopt"+name+" hitopt"+name, function() {
        ui["do_"+name](ui.getOption(name));
        console.log('Got opt: '+name);
      });
    })(options[n]['name']);
  }
  ui.postInit();
  
  ui.setStatus('Ready');
});
