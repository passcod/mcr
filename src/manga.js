/** manga.js
 * Retrieves and holds metadata about a manga. Fires a `gotinfo` event.
 */

(function(window) {
	"use strict";
	
	var Manga = function(manga, mangaid) {
		var chapters = {},
        numbers  = [],
        info     = {id:mangaid,name:manga},
        gotinfo  = false,
        chapter  = 0,
        
        self = this;
    
    if (!gotinfo) {    
      $.getJSON('/actions/selector/?which=0&id='+mangaid, function(j) {
        
        var i, chap, name;
        for (i in j) {
          chap = j[i];
          name = chap['name'] === undefined ? "" : chap['name'];
          
          numbers.push(chap['chapter']);
          chapters[ chap['chapter'] ] = {
            'name': name,
            'data': new Chapter(manga, chap['chapter'])
          };
        }
        
        request('/'+manga, function(doc) {
          info.description = $('#readmangasum p', doc).text();
          info.cover = $('#mangaimg img', doc).attr('src');
          
          var $props = $('#mangaproperties', doc);
          info.pubdate = $('tr:eq(2) td:last', $props).text();
          info.status  = $('tr:eq(3) td:last', $props).text();
          info.author  = $('tr:eq(4) td:last', $props).text();
          info.artist  = $('tr:eq(5) td:last', $props).text();
          info.direct  = $('tr:eq(6) td:last', $props).text();
          info.genres  = $('tr:eq(7) td:last', $props).text();
          
          $(window).trigger('gotinfo');
        });
      });
      gotinfo = true;
    }
    
    /**
     * Returns the manga info.
     */
    this.info = function() { return info; };
    
    /**
     * Returns the manga chapters.
     */
    this.chapters = function() { return chapters; };
    
    /**
     * Adds an already loaded chapter to the manga.
     * 
     * @param  chap  A chapter object.
     * @return void
     */
    this.addChapter = function(/** Chapter */ chap) {
      chapters[ chap.num() ].data = chap;
    };
    
    /**
     * Returns the Chapter object for the next chapter.
     * 
     * @return {Chapter}
     */
    this.nextChapter = function() {
      console.log('Before: '+chapter);
      if (chapter < numbers.length) {
        chapter++;
      } else {
        $(window).trigger('lastchapter');
      }
      console.log('After: '+chapter);
      self.loadChapter();
    };
    
    /**
     * Returns the Chapter object for the previous chapter.
     * 
     * @return {Chapter}
     */
    this.previousChapter = function() {
      if (chapter >= 0) {
        chapter--;
      } else {
        $(window).trigger('firstchapter');
      }
      self.loadChapter();
    };
    
    /**
     * Sets the chapter.
     *
     * @param  n  The chapter number.
     * @return void
     */
    this.setChapter = function(/** Integer */ n) {
      chapter = n-1;
    };
    
    /**
     * Gets the chapter.
     *
     * @return {Integer} The chapter number.
     */
    this.getChapter = function() {
      return chapter;
    };
    
    /**
     * Triggers the loading of the desired chapter.
     *
     * @param  n  The chapter number (optional) (will default to internal pointer).
     * @return void
     */
    this.loadChapter = function(n) {
      var chn = n || chapter;
      
      chapters[numbers[chn]].data.get();
    };
    
    /**
     * Performs a GET request then parses the response html and passes the
     * resulting DOM Document to the callback. On error, the passed DOM is
     * a blank page.
     *
     * @param  url       The url to make the request to.
     * @param  callback  The callback function.
     * @return void
     */
		var request = function (/** String */ url, /** Function */ callback) {
			$.ajax({
				type: "GET",
				url: url,
				success: function(data) {
					callback(
						(new DOMParser())
							.parseFromString(data, "text/xml")
					);
				},
				error: function() {
					callback(
						(new DOMParser())
							.parseFromString("<html><head></head><body></body></html>", "text/xml")
					);
				}
			});
		};
	};
	
	window.Manga = Manga;
})(window);