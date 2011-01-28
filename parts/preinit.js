/*

MCR.Get = {
	chapter: function() {
		MCR.Do.displayStatus('Loading Chapter '+MCR.Global.request.chapter+'...');
	
		function displayChapter() {
			var i, html;
	
			window.scroll(0,0);
			
			html = '';
			for ( i=1; i<Object.size(MCR.Global.chapter); i++ ) {
				html = html + '<img alt="" title="'+MCR.Global.manga.title+' / Chapter '+MCR.Global.request.chapter+' / Page '+i+'" src="'+MCR.Global.chapter[String(i)]+'" /><br />\n';
			}
			$('#pages').html(html);
			
			MCR.Do.displayStatus('Loaded');
		}
	
		function updateSelect() {
			var html, lst, sel, i;
		
			html = "<select id='chapters'>\n";
			lst = [];
			$('#jumpMenu option').each(function () {
				var v = $(this).val(),
					t = $(this).text();
			
				if ( MCR.Regex.select.old.test(v) ) {
					v = MCR.Regex.select.old.exec(v)[1];
				} else if ( MCR.Regex.select.cur.test(v) ) {
					v = MCR.Regex.select.cur.exec(v)[1];
				}
				t = MCR.Regex.select.chapter.exec(t)[1];
			
				lst.push(v);
				MCR.Global.manga.chapters[v] = t;
				MCR.Global.manga.chapterOrder = lst;
			});
			for ( i=0; i<lst.length; i++ ) {
				sel = (lst[i] == MCR.Global.request.chapter) ? 'selected="selected"' : '';
				html += "	<option "+sel+" value='"+lst[i]+"'>"+lst[i]+"</option>\n";
			}
			html += "</select>";
			$('#chapters').replaceWith(html);
			$('#chapter').text("Chapter "+MCR.Global.request.chapter+": "+MCR.Global.manga.chapters[MCR.Global.request.chapter]);
		}
	
		function runRequest(page) {
			MCR.Global.TMP.page = page; // We need to use a global to get through anonymous function scopes.
				                       // What's more, this will be set to the number of pages + 1
			var get = MCR.Tool.buildUrl(MCR.Global.request.manga, MCR.Global.request.chapter, page);
			MCR.Tool.getFake(get, function () {
				var img = $('#imgholder img').attr('src');
			
				if ( MCR.Global.TMP.page == 1 ) {
					if ( MCR.Option.get('showfirst') == 'on' ) {
						$('#pages').html('<img alt="" title="'+MCR.Global.manga.title+' / Chapter '+MCR.Global.request.chapter+' / Page 1" src="'+img+'" /><br />\n');
					}
				
					updateSelect();
				}
			
				if ( img ) {
					MCR.Global.chapter[String(MCR.Global.TMP.page)] = img;
					runRequest(MCR.Global.TMP.page+1); // Recursive... so the operation is synchronous, but the requests are not.
					MCR.Do.displayStatus('Loading Chapter '+MCR.Global.request.chapter+'... ('+MCR.Global.TMP.page+')', false);
				} else {
					if ( !MCR.Cache.images[String(MCR.Global.request.manga)] ) {
						MCR.Cache.images[String(MCR.Global.request.manga)] = {};
					}
					MCR.Cache.images[String(MCR.Global.request.manga)][String(MCR.Global.request.chapter)] = MCR.Global.chapter;
					MCR.Cache.set('images', MCR.Cache.images);
					
					displayChapter();
				}
			});
		}
	
		$('#permalink').attr('href', MCR.Tool.buildUrl(MCR.Global.request.manga, MCR.Global.request.chapter));
		$('#mangalink').attr('href', MCR.Tool.buildUrl(MCR.Global.request.manga));
	
		if ( MCR.Cache.images[String(MCR.Global.request.manga)] ) {	// This caching functionality is great,
																		// but the 5 MB restriction will make
																		// it fail after ~3700 chapters. Hopefully,
																		// I'll fix it before then.
			if ( MCR.Cache.images[String(MCR.Global.request.manga)][String(MCR.Global.request.chapter)] ) {
				MCR.Global.chapter = MCR.Cache.images[String(MCR.Global.request.manga)][String(MCR.Global.request.chapter)];
			
				MCR.Tool.getFake(MCR.Tool.buildUrl(MCR.Global.request.manga, MCR.Global.request.chapter, 1), updateSelect);
			
				displayChapter();
			} else {
				runRequest(1);
			}
		} else {
			runRequest(1);
		}
	},
	
	
	// Chapter Switching

	selectedChapter: function () {
		MCR.Global.request.chapter = $('#chapters').val();
		
		MCR.Get.chapter();
	},

	previousChapter: function() {
		var chi = MCR.Global.manga.chapterOrder.indexOf( MCR.Global.request.chapter );
		
		if (MCR.Global.manga.chapterOrder[ chi - 1 ]) {
			MCR.Global.request.chapter = MCR.Global.manga.chapterOrder[ chi - 1 ];
			MCR.Get.chapter();
		} else {
			MCR.Do.displayStatus('This is the first Chapter');
		}
	},

	nextChapter: function () {
		var chi = MCR.Global.manga.chapterOrder.indexOf( MCR.Global.request.chapter );
		
		if (MCR.Global.manga.chapterOrder[ chi + 1 ]) {
			MCR.Global.request.chapter = MCR.Global.manga.chapterOrder[ chi + 1 ];
			MCR.Get.chapter();
		} else {
			MCR.Do.displayStatus('This is the last Chapter');
		}
	}
};

*/
