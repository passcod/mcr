/** chapter.js
 * Retrieves the URLs of the pages of a chapter on MR.net asyncronously.
 * Triggers the `gotchapter` event on window when the chapter is done loading.
 */

(function(window) {
	"use strict";
	
	var Chapter = function(manga, chapter) {
		var url   = "http://www.mangareader.net/"+manga+"/"+chapter+"/",
        pages = this.pages = [],
        
        mangaid,
        loaded = false,
        
        self = this;
    
    /**
     * Returns the numeric id of the current manga.
     * 
     * @return void
     */
		this.mangaid = function() {
      return mangaid;
    };
    
    /**
     * Returns the chapter number.
     * 
     * @return void
     */
		this.num = function() {
      return chapter;
    };
    
		/**
     * Starts to request each page and extract the page's image url from it.
     * The function returns immediately, and fires `gotpage` events for every
     * loaded page, and a `gotchapter` event when all the chapter's pages are
     * loaded. If the pages were already loaded, simply fires `gotchapter`.
     *
     * @return void
     */
		var get = this.get = function() {
			if (!loaded) {
				request(url+(pages.length+1), function (doc) {
					var img = $('#img', doc).attr('src');
					
					if (typeof img !== 'undefined') {
						if (typeof mangaid === 'undefined') {
							var scr = $('script:last', doc).contents().text().split("\n"),
									mid = scr.splice(0, scr.indexOf("function omvKeyPressed(e) {"))[1];
							mangaid = mid.match(/([0-9]+);/i)[1]*1;
						}
						
						$(window).trigger("gotpage", [pages.length+1, self]);
						pages.push(img);
						get();
					} else {
						$(window).trigger("gotchapter", [pages, self]);
						loaded = true;
					}
				});
			} else {
				$(window).trigger("gotchapter", [pages, self]);
			}
		};
		
    /**
     * Performs a GET request then parses the response html and passes the
     * resulting DOM Document to the callback.
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
	
	window.Ç.Chapter = Chapter;
})(window);