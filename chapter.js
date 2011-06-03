/** chapter.js
 * Retrieves the URLs of the pages of a chapter on MR.net asyncronously.
 * Triggers the `gotchapter` event on window when the chapter is done loading.
 * Inputs: Name of manga, Chapter number
 * Output: Array of urls.
 */

(function(window) {
	"use strict";
	
	var Chapter = function(manga, chapter) {
		var url   = "http://www.mangareader.net/"+manga+"/"+chapter+"/";
		var pages = this.pages = [];
		
		// Event name
		var ec = this.ec = "gotchapter";
		var ep = this.ep = "gotpage";
		
		var mangaid;
		var loaded = false;
		
		this.mangaid = function() { return mangaid; };
		
		// Initiates the loading of the chapter
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
						
						$(window).trigger(ep, [pages.length+1, mangaid]);
						pages.push(img);
						get();
					} else {
						$(window).trigger(ec, [pages, mangaid]);
						loaded = true;
					}
				});
			} else {
				$(window).trigger(ec, [pages, mangaid]);
			}
		};
		
		var request = function (url, callback) {
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
	
	Chapter.ep = (new Chapter()).ep;
	Chapter.ec = (new Chapter()).ec;
	
	window.Chapter = Chapter;
})(window);