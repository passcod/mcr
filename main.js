(function (window) {
  "use strict";
    
  /** @namespace */
  var MCR = {};
  
  MCR = {
    /**
	   * Used to get through scopes without polluting.
	   */
	  TMP: {},

	  /**
	   * A namespace for all "Globals" used in the script
	   */
	  Global: {
		  /**
		   * Information about the current request.
		   */
		  request: {},

		  /**
		   * Information on currently displayed manga
		   */
		  manga: {
			  "chapters": {},
			  "title": "",
			  "description": "",
			  "pubdate": "",
			  "status": "",
			  "author": "",
			  "artist": "",
			  "chapter": {
				  "number": 1,
				  "name": "",
				  "index": 0
			  }
		  }
	  },

	  /**
	   * Holds information about the script itself.
	   */
	  Info: {
		  version: String(MCR_VERSION),
		  keyPrefix: "mcr-",
		  domain: window.location.host,
		  
		  /**
		   * Updates the manga info panel and the version number.
		   *
		   * @return void
		   */
		  show: function () {
		    var n = $('nav#info'),
						url = MCR.Tool.buildUrl(MCR.Global.request.manga, MCR.Global.request.chapter);
				
		    $('h1', n).html(MCR.Global.manga.title);
		    $('h2', n).html(MCR.Global.manga.chapter['name']);
		    $('#description', n).html(MCR.Global.manga.description);
		    $('date[pubdate]', n).text(MCR.Global.manga.pubdate);
		    $('#stat', n).html(MCR.Global.manga.status);
		    $('#author', n).text(MCR.Global.manga.author);
		    $('#artist', n).text(MCR.Global.manga.artist);
		    $('#cover', n).attr('src', MCR.Global.manga.cover);
		    
		    $('#permalink').attr('href', url);
		    $('#version').text(MCR_VERSION);
				
				if (MCR.Tool.canHazStories()) {
					history.pushState(null, null, url);
				}
		  }
	  },

	  /**
	   * Holds commonly used regexes in one place.
	   */
	  Regex: {
		  "url": {
			  "old": /mangareader\.net\/[0-9]+\-[0-9]+\-([0-9]+)\/([a-z0-9\-]+)\/chapter-([0-9]+)\.html?/i,
			  //                                        ( page )  (   manga   )          ( chap )
			  //                                           [1]         [2]                  [3]
			  "cur": /mangareader\.net\/([a-z0-9\-]+)(\/[0-9]+)?(\/[0-9]+)?/i
			  //                        (   manga   )(  chap  ) (  page  )
			  //                             [1]        [2]        [3]
		  },
		  "select": {
			  //                        (   manga   )(  chap  ) (  page  )
			  "old": /\/[0-9\-]+\/[a-z\-]+\/chapter-([0-9]+)\.html?/i,
			  "cur": /\/[a-z\-]+\/([0-9]+)/i,
			  "chapter": /[0-9]+:?(.+)/i 
		  }
	  },

	  /**
	   * Multi-purpose functions used by various parts of the script.
	   */
	  Tool: {

		  /**
		   * Performs a GET request to the provided url and returns a DOM document.
		   * 
		   * @param url        The request URL
		   * @param callback   An optional function to execute when the request is complete.
		   * 
		   * @return void
		   */
		  getFake: function (/** String */ url, /** Function */ callback) {
			  $.ajax({
				  type: "GET",
				  url: url,
				  success: function (data) {
					  if ( callback ) {
					    var p = new DOMParser(),
					        doc = p.parseFromString(data, "text/xml");
					    
						  callback(doc);
					  }
				  },
				  error: function (xhr, stat, err) {
					  
					  var data = "<html><head></head><body><div id='status'>"+
					    stat+"</div><div id='error'>"+err+"</div><div id='url'>"+
					    url+"</div>";
					  
					  if ( stat == 'timeout' ) {
						  data += '<img src="/notfound.404" alt="-" width="800" />';
					  }
            
            data += "</body></html>";
            
            
            
					  if ( callback ) {
					    var p = new DOMParser(),
					        doc = p.parseFromString(data, "text/xml");
					    
						  callback(doc);
					  }
				  }
			  });
		  },

		  /**
		   * Parses the URL to extract information: manga name, chapter number, page number
		   *
		   * @param url_str The URL to parse.
		   *
		   * @return {Array} Resulting info.
		   */
		  parseUrl: function (url_str) {
			  var U = {},
				  Ro = MCR.Regex.url.old.exec(url_str),
				  Rn = MCR.Regex.url.cur.exec(url_str),
				  ss = /[\/]/; // Slash-stripper
		
			  if ( Ro !== null ) {
				  U.page = Ro[1] ? Ro[1].replace(ss, '') : null;
				  U.manga = Ro[2] ? Ro[2].replace(ss, '') : null;
				  U.chapter = Ro[3] ? Ro[3].replace(ss, '') : null;
			  } else if ( Rn !== null ) {
				  U.manga = Rn[1] ? Rn[1].replace(ss, '') : null;
				  U.chapter = Rn[2] ? Rn[2].replace(ss, '') : null;
				  U.page = Rn[3] ? Rn[3].replace(ss, '') : null;
			  } else {
				  return null;
			  }
	
			  return U;
		  },

		  /**
		   * Builds a manga URL (new version) from its components: manga name,
		   * chapter number, page number.
		   *
		   * @param manga   The name of the manga, lowercase, hyphenated. E.g. full-metal-alchemist
		   * @param chapter The chapter number.
		   * @param page    The page number.
		   *
		   * @return {String} The manga URL.
		   */
		  buildUrl: function (/** String */ manga, /** Integer */ chapter, /** Integer */ page) {
			  manga = manga ? '/'+manga : '';
			  chapter = chapter ? '/'+chapter : '';
			  page = page ? '/'+page : '';
	
			  return 'http://'+MCR.Info.domain+manga+chapter+page;
		  },

		  /**
		   * Detects the availability of HTML5 local storage.
		   *
		   * @author Modernizr
		   *
		   * @return {Boolean} True if localStorage is available.
		   */
		  canHazStorage: function () {
			  try {
				  return 'localStorage' in window && window.localStorage !== null;
			  } catch(e) {
				  return false;
			  }
		  },
			
			canHazStories: function() {
				return !!(window.history && history.pushState);
			},

		  /**
		   * Capitalizes each word (space-separated) in the given string.
		   *
		   * @param str The string to capitalize
		   *
		   * @return {String} The capitalized string.
		   */
		  capitalize: function (/** String */ str) {
			  return str.replace( /(^|\s)([a-z])/g, function (o,p,q) { return p+q.toUpperCase(); } );
		  },

		  /**
		   * Provides the number of available characters of HTML5 storage. This is
		   * usually 5 M (5,000,000) UTF8 encoded chars, but Chrome uses UTF16, which
		   * divides this number by 2.
		   *
		   * @return {Integer} Number of available characters in local storage.
		   */
		  storageAvailable: function () {
			  if ( /chrome/i.test(navigator.userAgent) ) {
				  return 2.5*1000*1000; // 5 MB in UTF16 == 2.5M chars.
			  }
			  return 5*1000*1000; // 5 MB in UTF8 == 5M chars.
		  },

		  /**
		   * Gives the amount of used storage vs. available storage. Storage amounts
		   * are calculated from the number of characters the key and the value weigh
		   * at. E.g. 'key' => '{"json":"value"}' will weigh in at 3 + 16 = 19 chars.
		   * The result can optionally be expressed as a percentage of the available
		   * storage.
		   *
		   * @depends MCR.Tool.storageAvailable()
		   * @depends MCR.Tool.canHazStorage()
		   *
		   * @param percent Enable percent form?
		   *
		   * @return {Float} The storage used. 
		   */
		  storageUsed: function (/** Boolean */ percent) {
			  if ( MCR.Tool.canHazStorage() ) {
				  var len = 0, i, k;
				  for ( i = 0; i < window.localStorage.length; i++ ) {
					  k = window.localStorage.key(i);
					  len = len + k.length + window.localStorage[k].length;
				  }
				  if ( percent ) {
					  return len * 100 / MCR.Tool.storageAvailable();
				  }
				  return len;
			  } else {
				  return 0;
			  }
		  }
	  },

	  /**
	   * Contains options/controls related functions and data
	   */
	  Option: {
		  /**
		   * The options/controls list and their default values.
		   */
		  defaults: {
			  "spacing"      : "on" , // Page spacing (on = 1em, off = 0px)
			  "horizontal"   : "off", // Horizontal reading
			  "black"        : "on" , // Background color
			  "hotkeys"      : "on" , // Hotkeys
			  "forced800"    : "off", // Force img width to 800px
			  "ads"          : "on" , // Display MR.net's ads
      },
		  
		  /**
		   * Removes all stored items which do not start with the current prefix.
		   * This can be used to force an option reset between versions.
		   *
		   * @return void
		   */
		  reset: function () {
		    for ( var i in window.localStorage ) {
		      var r = new RegExp(MCR.Info.keyPrefix.replace('-', ''));
		      if ( !i.match(r) ) {
		        window.localStorage.removeItem(i);
		      }
		    }
		  },
		  
		  /**
		   * Sets the default options/controls, as defined in MCR.Option.defaults, to
		   * the stored (HTML5) value, or the default values if there is no stored value.
		   *
		   * @return void
		   */
		  init: function () {
			  MCR.Option.reset();
			  for ( var key in MCR.Option.defaults ) {
				  if ( MCR.Tool.canHazStorage() ) {
					  MCR.Option.values[key] = window.localStorage[MCR.Info.keyPrefix+key] ? window.localStorage[MCR.Info.keyPrefix+key] : MCR.Option.defaults[key];
					  window.localStorage[MCR.Info.keyPrefix+key] = MCR.Option.values[key];
				  } else {
					  MCR.Option.values[key] = MCR.Option.defaults[key];
				  }
			  }
		  },
		
		  /**
		   * Sets an option. For boolean options, see
		   * MCR.Option.switchTo().
		   * 
		   * @depends MCR.Tool.canHazStorage()
		   *
		   * @param key   The option's key.
		   * @param value The option's value.
		   *
		   * @return void
		   */
		  set: function (/** String */ key, /** String */ value) {
			  MCR.Option[key] = value;
			  if ( MCR.Tool.canHazStorage() ) {
				  window.localStorage.setItem(MCR.Info.keyPrefix+key, MCR.Option[key]);
			  }
		  },

		  /**
		   * Gets an option. For boolean options, see MCR.Option.switched().
		   *
		   * @depends MCR.Tool.canHazStorage()
		   *
		   * @param key The key of the cooption to retrieve.
		   *
		   * @return {String} The option's value.
		   */
		  get: function (/** String */ key) {
			  var value = MCR.Option[key];
			  if ( MCR.Tool.canHazStorage() ) {
				  value = window.localStorage.getItem(MCR.Info.keyPrefix+key);
			  }
			  return value;
		  },

		  /**
		   * Switched a boolean option to the state specified. For cases where the state is
		   * not variable, see MCR.Option.switchOn() and MCR.Option.switchOff().
		   * 
		   * @depend MCR.Option.set()
		   * @depend MCR.Option.get()
		   *
		   * @param key The option's key.
		   * @param to  The state to switch to.
		   *
		   * @return void
		   */
		  switchTo: function (/** String */ key, /** Boolean */ to) {
			  var before = MCR.Option.get(key),
				  onff   = to ? 'n' : 'f';
	
			  if ( /o?(n|ff?)/i.test(before) ) {
				  MCR.Option.set(key, onff);
			  } else {
				  throw TypeError;
			  }
		  },

		  /**
		   * Switches an option On.
		   *
		   * @depends MCR.Option.switchTo()
		   *
		   * @param key The option's key
		   *
		   * @return void
		   */
		  switchOn: function (/** Boolean */ key) {
			  MCR.Option.switchTo(key, true);
		  },

		  /**
		   * Switched an option Off.
		   *
		   * @depend MCR.Option.switchTo()
		   *
		   * @param key The option's key
		   *
		   * @return void
		   */
		  switchOff: function (/** Boolean */ key) {
			  MCR.Option.switchTo(key, false);
		  },

		  /**
		   * Returns the state of a boolean option.
		   *
		   * @depends MCR.Option.get()
		   *
		   * @param key The option's key
		   *
		   * @return {Boolean} The option's state
		   */
		  switched: function(/** String */ key) {
			  var opt = MCR.Option.get(key);
	
			  if ( /o?(n|ff?)/i.test(opt) ) {
				  if ( /o?n/i.test(opt) ) {
					  return true;
				  }
			  } else {
				  throw TypeError;
			  }
			  return false;
		  },

		  /**
		   * Toggles a boolean option and provides callbacks when the option is On or Off.
		   *
		   * @depend MCR.Option.switchTo()
		   * @depend MCR.Option.switched()
		   * @depend MCR.Option.switchOn()
		   * @depend MCR.Option.switchOff()
		   * 
		   * @param key      The option's key
		   * @param force_to Force the value of the option.
		   * @param callOn   Callback if On.
		   * @param callOff  Callback if Off.
		   *
		   * @return void
		   */
		  toggle: function (/** String */ key, /** Boolean */ force_to, /** Function */ callOn, /** Function */ callOff) {
			  if ( typeof force_to === 'boolean' ) {
				  MCR.Option.switchTo(key, !force_to);
			  }
	
			  if ( !MCR.Option.switched(key) ) {
				  if ( callOn ) {
					  callOn();
				  }
				  MCR.Option.switchOn(key);
				  $('#option-'+key).attr('checked', true);
			  } else {
				  if ( callOff ) {
					  callOff();
				  }
				  MCR.Option.switchOff(key);
				  $('#option-'+key).attr('checked', false);
			  }
		  },
		  
		  /**
		   * Holds the options values
		   */
		  values: {}
	  },

	  /**
	   * Holds functions that are used to control the interface and behaviour of the
	   * script.
	   */
	  Do: {
		  /**
		   * Displays the current status message using a fade animation. The animation
		   * can be disabled for fast status changes.
		   *
		   * @param status    The status message
		   * @param animate   Optional. Disable the fade animation.
		   *
		   * @return void
		   */
		  displayStatus: function (/** String */ status, /** Boolean */ animate) {
			  if ( typeof animate !== 'boolean' ) {
			    animate = true;
			  }
			  if (animate) {
				  $('#status').stop().css('opacity', '1.0').fadeOut('fast', function () {
					  $('#status').text(status).fadeIn();
				  });
			  } else {
				  $('#status').stop().text(status).show();
			  }
	      
	      if ( status.length > 0 ) {
	        status += ' / ';
	      }
	      
			  document.title = status + MCR.Global.manga.title+' / Ch. '+MCR.Global.request.chapter;
		  },
	
		  /**
		   * Handle for the hotkeys control function.
		   *
		   * @return void
		   */
		  handleHotkeys: function (/** Event */ e) {
			  switch(e.which) {
				  case 188:
					  MCR.Get.previousChapter();
					  return;
	
				  case 190:
					  MCR.Get.nextChapter();
					  return;
					
					default:
					  return;
			  }
		  },
	
		  /**
		   * Holds controls function which toggle options
		   */
		  toggle: {
			  /*
			   * Toggles hotkeys.
			   *
			   * @param force_to True to enable
			   *
			   * @return void
			   */
			  hotkeys: function ( /** Boolean */ force_to) {
				  MCR.Option.toggle('hotkeys', force_to, function () {
					  $(document).bind('keydown', MCR.Do.handleHotkeys);
				  }, function () {
					  $(document).unbind('keydown', MCR.Do.handleHotkeys);
				  });
			  },
  		  
  		  /**
			   * Toggles betweeen 1em spacing between pages or none.
			   * 
			   * @param force_to True for 1em spacing
			   *
			   * @return void
			   */
			  spacing: function (/** Boolean */ force_to) {
				  MCR.Option.toggle('spacing', force_to, function () {
					  $('article').addClass('spaced');
				  }, function () {
					  $('article').removeClass('spaced');
				  });
			  },
			  
			  /**
			   * Toggles betweeen vertical or horizontal reading.
			   * 
			   * @param force_to True for horizontal reading
			   *
			   * @return void
			   */
			  horizontal: function (/** Boolean */ force_to) {
				  MCR.Option.toggle('horizontal', force_to, function () {
					  $('article').addClass('horizontal');
					  
					  MCR.TMP.width = 0;
				    $('article img').each(function() {
				      var w = $(this).width();
				      if ( w < 800 ) { w = 800; }
				      MCR.TMP.width += w + 20;
				    });
				    
				    $('article ul').css('width', MCR.TMP.width);
				  }, function () {
					  $('article').removeClass('horizontal');
					  $('article ul').css('width', '');
				  });
			  },
  		  
			  /**
			   * Toggles betweeen black and white background, and white and black text.
			   * 
			   * @param force_to True for white
			   *
			   * @return void
			   */
			  black: function (/** Boolean */ force_to) {
				  var a = $('[class*=white], [class*=black]');
				  MCR.Option.toggle('black', force_to, function () {
					  a.addClass('black').removeClass('white');
				  }, function () {
					  a.addClass('white').removeClass('black');
				  });
			  },
		
			  /**
			   * Force the images to a 800px width. Disabling it will let large (2 page)
			   * images to display to their full size.
			   *
			   * @param force_to True to force width to 800px
			   *
			   * @return void
			   */
			  forced800: function (/** Boolean */ force_to) {
				  MCR.Option.toggle('forced800', force_to, function () {
					  $('article').addClass('forced800');
				  }, function () {
					  $('article').removeClass('forced800');
				  });
			  },
		
			  /**
			   * Toggle the display of Mangareader's Ads at the bottom of the page.
			   *
			   * @param force_to True to display ads
			   *
			   * @return void
			   */
			  ads: function(/** Boolean */ force_to) {
				  MCR.Option.toggle('ads', force_to, function () {
					  $('#ads').html(
					    "		  <iframe width='350' height='250' frameborder='no' scrolling='no' src='http://ad.mangareader.net/btleft' class='left' />"+
              "	  	<iframe width='350' height='250' frameborder='no' scrolling='no' src='http://ad.mangareader.net/btright' class='right' />"
					  ).show();
				  }, function () {
					  $('#ads').html("").hide();
				  });	
			  }
		  },

		  /**
		   * Holds utility functions for the panels.
		   */
		  panel: {
			  /**
			   * Binds the controls to their handles and sets the environment according
			   * to the current options.
			   *
			   * @return void
			   */
			  init: function() {	
				  $('#options-button').click(MCR.Do.panel.toggle);
				  $('#info-button').click(function() {MCR.Do.panel.toggle('info');});
				  
				  $('select#chapters').live('change', MCR.Get.selectedChapter);
				  // Must be live: else it gets removed when the select is changed.
	        
				  $('#prev').click(MCR.Get.previousChapter);
				  $('#next').click(MCR.Get.nextChapter);
				  
				  $('#option-spacing').change(MCR.Do.toggle.spacing);
				  $('#option-horizontal').change(MCR.Do.toggle.horizontal);
				  $('#option-black').change(MCR.Do.toggle.black);
				  $('#option-hotkeys').change(MCR.Do.toggle.hotkeys);
				  $('#option-forced800').change(MCR.Do.toggle.forced800);
				  $('#option-ads').change(MCR.Do.toggle.ads);
				  
				  MCR.Do.toggle.spacing( MCR.Option.switched('spacing') );
				  MCR.Do.toggle.horizontal( MCR.Option.switched('horizontal') );
				  MCR.Do.toggle.black( MCR.Option.switched('black') );
				  MCR.Do.toggle.hotkeys( MCR.Option.switched('hotkeys') );
				  MCR.Do.toggle.forced800( MCR.Option.switched('forced800') );
				  MCR.Do.toggle.ads( MCR.Option.switched('ads') );
				},
		
			  /**
			   * Displays the panel specified, or the options panel by default.
			   *
			   * @param panel The panel to show.
			   *
			   * @return void
			   */
			  show: function (/** String */ panel) {
			    if ( typeof panel !== 'string' ) {
			      panel = 'options';
			    }
				  $('nav#'+panel).fadeIn('fast');
			  },
		
			  /**
			   * Hides the panel specified, or the control options by default.
			   *
			   * @param panel The panel to hide.
			   *
			   * @return void
			   */
			  hide: function (/** String */ panel) {
				  if ( typeof panel !== 'string' ) {
			      panel = 'options';
			    }
				  $('nav#'+panel).fadeOut('fast');
			  },
			  
			  /**
			   * Toggles a panel's visibility.
			   *
			   * @param panel The panel to toggle. Defaults to 'options'.
			   *
			   * @return void
			   */
			   toggle: function (/** String */ panel) {
			    if ( typeof panel !== 'string' ) {
			      panel = 'options';
			    }
			    $('nav#'+panel).toggle('fast', 'linear');
			   }
		  }
	  },
	
	  /**
	   * The core of the script: holds the essential chapter mangaging functions.
	   */
	  Get: {
		  chapter: function () {
			  MCR.Do.displayStatus('Loading Ch. '+MCR.Global.request.chapter+'...');
				
				(new Chapter(MCR.Global.request.manga, MCR.Global.request.chapter)).get();
		  },
			
			updateDisplay: function(e, pages) {
				console.log('Hey');
				var i, h = "", t;
				for ( i in pages ) {
					var tt = MCR.Global.manga.title + ' / ' + MCR.Global.request.chapter + ': ' + MCR.Global.manga.chapter['name'] + ' / ' + 'Page ' + page;
					var ss = MCR.Option.switched('spacing') ? 'margin-bottom: 1em;' : 'margin-bottom: 0px;';
					
					h += "<li><img src='"+pages[page]+"' alt='"+tt+"' title='"+tt+"' style='"+ss+"' /></li>\n";
				}
				$('article ul').html(h);
				window.scroll(0,0);
				MCR.Do.displayStatus('');
				
				if ( MCR.Option.switched("horizontal") ) {
					MCR.TMP.width = 0;
					$('article img').each(function() {
						var w = $(this).width();
						if ( w < 800 ) { w = 800; }
						MCR.TMP.width += w + 20;
					});
					
					$('article ul').width(MCR.TMP.width);
				}
				
				var c, html = "";
				for ( var i in MCR.Global.manga.chapters ) {
					c = MCR.Global.manga.chapter.index == i ? ' selected="selected" ' : ' ';
					html += "<option value='"+MCR.Global.manga.chapters[i]['chapter']+"'"+c+">"+MCR.Global.manga.chapters[i]['chapter']+"\n";
				}
				$('#chapters').html(html);
			},
	        
	   // Chapter Switching

      selectedChapter: function () {
	      MCR.Global.request.chapter = $('#chapters').val();
				
	      MCR.Get.chapter();
      },

      previousChapter: function() {
	      var chi = Number(MCR.Global.manga.chapter.index);
	      
	      if (MCR.Global.manga.chapters[ chi - 1 ]) {
		      MCR.Global.request.chapter = MCR.Global.manga.chapters[ chi - 1 ]['chapter'];
		      MCR.Get.chapter();
	      } else {
		      MCR.Do.displayStatus('This is the first Chapter');
	      }
      },

      nextChapter: function () {
	      var chi = Number(MCR.Global.manga.chapter.index);
	      
	      if (MCR.Global.manga.chapters[ chi + 1 ]) {
		      MCR.Global.request.chapter = MCR.Global.manga.chapters[ chi + 1 ]['chapter'];
		      MCR.Get.chapter();
	      } else {
		      MCR.Do.displayStatus('This is the last Chapter');
	      }
      },
			
			init: function() {
				var $W = $(window);
				
				$W.bind("gotpage", function() {
					MCR.Do.displayStatus('Loading Ch. '+MCR.Global.request.chapter+'... ('+page+')', false);

					/*if (page == 1) {
						$.getJSON('/actions/selector/?id='+mangaid+'&which=0', function(j) {
							MCR.Global.manga.chapters = j;
							
							var i, k;
							for ( i in j ) {
								k = j[i];
								if ( String(k.chapter) == MCR.Global.request.chapter ) {
									MCR.Global.manga.chapter['name'] = j[i]['chapter_name'];
									MCR.Global.manga.chapter.index = i;
								}
							}
							
							MCR.Info.show();
						});
						
						MCR.Tool.getFake(MCR.Tool.buildUrl(MCR.Global.request.manga), function (doc) {
							MCR.Global.manga.description = $('#readmangasum p', doc).text();
							MCR.Global.manga.cover = $('#mangaimg img', doc).attr('src');
							MCR.Global.manga.pubdate = $('#mangaproperties tr:eq(2) td:last', doc).text();
							MCR.Global.manga.status = $('#mangaproperties tr:eq(3) td:last', doc).text();
							MCR.Global.manga.author = $('#mangaproperties tr:eq(4) td:last', doc).text();
							MCR.Global.manga.artist = $('#mangaproperties tr:eq(5) td:last', doc).text();
							
							MCR.Info.show();
						});
					}*/
				});
				
				$W.bind(Chapter.ec, MCR.Get.updateDisplay);
			}
	  }
  };

	window.MCR = MCR;
})(window);
