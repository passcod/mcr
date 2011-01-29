var MCR_VERSION = 11.28;
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
/**
 * Handy function to get the size of an object
 * @author James Coglan
 * @url http://stackoverflow.com/questions/5223/length-of-javascript-associative-array/6700#6700
 */
Object.size = function (obj) {
	"use strict";
	var size = 0, key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) {
			size++;
		}
	}
	return size;
};
/**
 * Provides support for default arguments in functions.
 * @author fatbrain
 * @url    http://parentnode.org/javascript/default-arguments-in-javascript-functions/
 */
Function.prototype.defaults = function () {
	"use strict";
	var f = this,
		a = [f.length-arguments.length];
	
	a = a.concat(Array.prototype.slice.apply(arguments));
	return function () {
		return f.apply(f, Array.prototype.slice.apply(arguments).concat(a.slice(arguments.length, a.length)));
	};
};




(function (window) {
	"use strict";
  
  /** @namespace */
  var MCR = {};
  
  MCR = {
	  /**
	   * A namespace for all "Globals" used in the script
	   */
	  Global: {
		  /**
		   * Used to get through scopes without polluting.
		   */
		  TMP: {},

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
			  "chapter": {
				  "number": 0,
				  "name": ""
			  }
		  }
	  },

	  /**
	   * Holds information about the script itself.
	   */
	  Info: {
		  "version": MCR_VERSION,
		  "keyPrefix": "MCR-"
	  },

	  /**
	   * Holds all/most regexes used in one place.
	   */
	  Regex: {
		  "url": {
			  "old": /mangareader\.net\/[0-9]+\-[0-9]+\-([0-9]+)\/([a-z0-9\-]+)\/chapter-([0-9]+)\.html?/i,
			  //                                        ( page )  (   manga   )          ( chap )
			  //                                           [1]         [2]                  [3]
			  "cur": /mangareader\.net\/([a-z0-9\-]+)(\/[0-9]+)?(\/[0-9]+)?/i
			  //                           [1]      [2]        [3]
		  },
		  "select": {
			  //                        (   manga   )(  chap  ) (  page  )
			  "old": /\/[0-9\-]+\/[a-z\-]+\/chapter-([0-9]+)\.html?/i,
			  "cur": /\/[a-z\-]+\/([0-9]+)/i,
			  "chapter": /[0-9]+:?(.+)/i 
		  }
	  },
	  
	  /**
	   * Contains the HTML markup and the CSS stylesheet as well as an initializer.
	   */
	  UI: {
	    /**
	     * HTML markup
	     */
	    html: ""+
            "<div id='container'>"+
            "	<nav id='main'>"+
            "		<span id='chapters' class='white'><select><option>---</option></select></span>"+
            "		<span id='links'>"+
            "			<a href='/'>Home</a>"+
            "			/"+
            "			<a id='mangalink'>Manga</a>"+
            "			/"+
            "			<a id='control-button'>Options</a>"+
            "			/"+
            "			<a id='permalink' href='#'>Permalink</a>"+
            "		</span>"+
            "		<span style='float: right;'>"+
            "			<span id='status'>Ready</span>"+
            "			<a id='prev'>Previous</a>"+
            "			-"+
            "			<a id='next'>Next</a>"+
            "		</span>"+
            "	</nav>"+
            "	<nav id='options'>"+
            "   <p>Option Item 1</p>"+
            "	</nav>"+
            " <section>"+
            "   <header>"+
            "     <h1>Manga</h1>"+
            "   </header>"+
            "	  <article>"+
            "     <header>"+
            "	      <h1>Chapter</h1>"+
            "     </header>"+
            "		  <p>Loading...</p>"+
            "	  </article>"+
            " </section>"+
            "	<footer>"+
            "   <nav>"+
            " 		Userscript by <a href='http://passcod.cz.cc'>passcod</a>"+
            " 		- Uses <a href='http://jquery.com'>jQuery</a>"+
            " 		- Works best in <a href='http://www.mozilla.com/firefox/'>Firefox 4</a>"+
            "     - Fork me on <a href='http://github.com/passcod/Manga-ChapterReader/'>Github</a>"+
            " 		- License: <a href='http://www.opensource.org/licenses/mit-license.php'>MIT</a> + Attribution"+
            "		  - Thanks for using!"+
            "   </nav>"+
            "	  <!--<div id='ads'>"+
            "		  <iframe width='350' height='250' frameborder='no' scrolling='no' src='http://ad.mangareader.net/btleft' class='left' />"+
            "	  	<iframe width='350' height='250' frameborder='no' scrolling='no' src='http://ad.mangareader.net/btright' class='right' />"+
            "	  </div>-->"+
            "	</footer>"+
            "</div>",
      css: {
        "*": {
	        "color": "inherit"
        },
        "body": {
	        "font-family": "sans-serif"
        },
        "#container": {
	        "width": "800px",
	        "margin": "5em auto"
        },
        "nav#main": {
	        "top": "0px",
	        "left": "auto",
	        "width": "780px",
	        "border": "5px #CCC solid",
	        "padding": "5px",
	        "position": "fixed",
	        "font-size": "1em"
        },
        "#links": {
	        "font-size": "0.8em"
        },
        "#status": {
	        "font-size": "0.6em",
	        "color": "#CCC"
        },
        "nav#options": {
	        "top": "50px",
	        "left": "auto",
	        "width": "780px",
	        "border": "5px #CCC solid",
	        "padding": "5px",
	        "display": "none",
	        "position": "fixed",
	        "font-size": "1em"
        },
        "section header": {
          "font-size": "1.5em"
        },
        "article": {
	        "text-align": "center"
        },
        "article header": {
          "font-size": "1.2em"
        },
        "article img": {
	        "margin-bottom": "1em"
        },
        ".forced800 img": {
	        "width": "800px"
        },
        "footer nav": {
	        "font-size": "0.7em",
	        "margin": "1em auto",
	        "text-align": "center"
        },
        "a": {
	        "color": "inherit",
	        "text-decoration": "none",
	        "cursor": "pointer"
        },
        "a:hover, a:focus": {
	        "color": "#CCC"
        },
        ".black": {
	        "background-color": "black",
	        "color": "white",
	        "border-color": "white"
        },
        ".white": {
	        "background-color": "white",
	        "color": "black",
	        "border-color": "black"
        },
        ".white select, select.white, .black select, select.black": {
	        "color": "black"
        },
        "footer #ads .left": {
	        "float": "left"
        },
        "footer #ads .right": {
	        "float": "right"
        }
      },
      
      init: function () {
        MCR.UI.css["article img"]["margin-bottom"] = MCR.Option.get('spacing');
        
        $('body').html(MCR.UI.html).add('nav').addClass('white');
        MCR.Tool.addCss(MCR.UI.css);
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
		   * @param settings   Custom settings for the $.ajax function. (TODO)
		   * 
		   * @return void
		   */
		  getFake: function (/** String */ url, /** Function */ callback, /** Object */ settings) {
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
						  data += '<div id="imgholder"><img src="/qwertyuiopasdfghjklzxcvbnm.404" alt="-" /></div>';
					  }
            
            data += "</body></html>";
            
            
            
					  if ( callback ) {
					    var p = new DOMParser(),
					        doc = p.parseFromString(data, "text/xml");
					    
						  callback(doc);
					  }
				  },
				  timeout: 5000 // This should be enough for anyone. I don't think many dial-up users use this script...
			  });
		  },

		  /**
		   * Parses an Object representing a CSS document and produces a raw CSS string.
		   * The result can optionally be minified. The object must be of the form:
		   * {
		   *   "selector": {
		   *     "property": "value"
		   *   }
		   * }
		   *
		   * @param css_obj   The CSS object.
		   * @param minified  Should the output be minified? Default is false.
		   * @param tab       What to use as a tab. Default is "\t", disabled when minified.
		   *
		   * @return {String} The CSS string.
		   */
		  makeCss: function (/** Object */ css_obj, /** Boolean */ minified, /** String */ tab) {
			  var selector, styles, property, value,
				  nl = "\n",
				  html = '';
		
			  minified = minified ? true : false;
			  tab = tab ? tab : "\t";
	
			  if ( minified ) {
				  tab = '';
				  nl = ' ';
			  }

			  for ( selector in css_obj ) {
				  if ( typeof selector === 'string' ) {
					  styles = css_obj[selector];
	
					  html += nl + selector + " {";
	
					  for ( property in styles ) {
						  if ( typeof property === 'string' ) {
							  value = styles[property];
		
							  html += nl + tab + property + ": " + value + ";";
						  }
					  }
	
					  html += nl + "}";
				  }
			  }
	
			  return html;
		  },

		  /**
		   * Adds CSS to the page.
		   * 
		   * @depends MCR.Tool.addCss
		   *
		   * @param css The CSS to be added. If an object is provided, makeCss will be used.
		   * 
		   * @return void
		   */
		  addCss: function (/** String|Object */ css) {
			  "use strict";
	
			  var el;
	
			  if ( typeof css == "object" ) {
				  css = MCR.Tool.makeCss(css);
			  }
	
			  el = document.createElement("style");
			  el.type = "text/css";
			  if (el.styleSheet) {
				  el.styleSheet.cssText = css;
			  } else {
				  el.appendChild(document.createTextNode(css));
			  }
			  document.getElementsByTagName("head")[0].appendChild(el);
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
	
			  return 'http://www.mangareader.net'+manga+chapter+page;
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
		  }.defaults(false)
	  },

	  /**
	   * Contains options/controls related functions and data
	   */
	  Option: {
		  /**
		   * The options/controls list and their default values.
		   */
		  defaults: {
			  "spacing"      : "1em",
			  "allblack"     : "off",
			  "hotkeys"      : "off",
			  "showfirst"    : "off",
			  "forced800"    : "on" ,
			  "ads"          : "on" ,
	
			  "cache"        : "off",
			  "cache-images" : "{}"
		  },
		
		  /**
		   * Sets the default options/controls, as defined in MCR.Option.defaults, to
		   * the stored (HTML5) value, or the default values if there is no stored value.
		   *
		   * @return void
		   */
		  init: function () {
			  var key;
	
			  for ( key in MCR.Option.defaults ) {
				  if ( MCR.Tool.canHazStorage() ) {
					  MCR.Option.values[key] = window.localStorage[MCR.Info.keyPrefix+key] ? window.localStorage[MCR.Info.keyPrefix+key] : MCR.Option.defaults[key];
					  window.localStorage[MCR.Info.keyPrefix+key] = returnedOptions[key];
				  } else {
					  MCR.Option.values[key] = MCR.Option.defaults[key];
				  }
			  }
		  },
		
		  /**
		   * Sets an option and refreshes the cachesize display. For boolean options, see
		   * MCR.Option.switchTo().
		   * 
		   * @depends MCR.Tool.canHazStorage()
		   * @depends MCR.Tool.storageUsed()
		   *
		   * @param key   The option's key.
		   * @param value The option's value.
		   *
		   * @return void
		   */
		  set: function (/** String */ key, /** String */ value) {
			  MCR.Option[key] = value;
			  if ( MCR.Tool.canHazStorage() ) {
				  window.localStorage[MCR.Info.keyPrefix+key] = MCR.Option[key];
				  $('#control-cachesize span').text(MCR.Tool.storageUsed(true));
			  }
		  },

		  /**
		   * Gets an option. For boolean options, see MCR.Option.switched().
		   *
		   * @depends MCR.Tool.canHazStorage()
		   *
		   * @param key The key of the option to retrieve.
		   *
		   * @return {String} The option's value.
		   */
		  get: function (/** String */ key) {
			  var value = MCR.Option[key];
			  if ( MCR.Tool.canHazStorage() ) {
				  value = window.localStorage[MCR.Info.keyPrefix+key];
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
				  onff   = to ? 'on' : 'off';
	
			  if ( /o(n|ff)/i.test(before) ) {
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
	
			  if ( /o(n|ff)/i.test(opt) ) {
				  if ( opt == 'on' ) {
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
				  $('#legend-'+key+' .control-now').text('On');
			  } else {
				  if ( callOff ) {
					  callOff();
				  }
				  MCR.Option.switchOff(key);
				  $('#legend-'+key+' .control-now').text('Off');
			  }
		  },
	
		  /**
		   * Holds the options values
		   */
		  values: {}
	  },

	  /**
	   * Contains cache related functions and stores.
	   */
	  Cache: {
		  init: function () {
			  if ( MCR.Option.switched('cache') ) {
				  MCR.Cache.store.chapters = MCR.Cache.get('chapters');
			  }
		  },
		
		  /**
		   * Set the value of a cache store. The value can be of any JSON-able type.
		   *
		   * @depend JSON.stringify()
		   * @depend MCR.Option.set()
		   *
		   * @param key   The cache store key
		   * @param value The cache store value
		   *
		   * @return void
		   */
		  set: function (/** String */ key, /** Mixed */ value) {
			  var json = JSON.stringify(value);
			  MCR.Option.set('cache-'+key, json);
		  },
	
		  /**
		   * Get the value of a cache store.
		   *
		   * @depend JSON.parse()
		   * @depend MCR.Option.get()
		   *
		   * @param key The cache store key
		   *
		   * @return {Mixed} The cache store value.
		   */
		  get: function (/** String */ key) {
			  var json = MCR.Option.get('cache-'+key);
			  return JSON.parse(json);
		  },
	
		  /**
		   * Checks the cache for the queried information and returns true if it is
		   * indeed cached.
		   *
		   * @depend MCR.Cache.get()
		   *
		   * @param key   The cache store key
		   * @param query The query.
		   *
		   * @return {Boolean}
		   */
		  d: function (/** String */ key, /** Object */ query) {
			  return false;
		  },
	
		  /**
		   * Clears all cache stores
		   *
		   * @return void
		   */
		  clear: function () {
			  for ( i in MCR.Cache.store ) {
				  MCR.Cache.set(i, {});
			  }
		  },
	
		  /**
		   * Holds all cache stores
		   */
		  store: {
			  /**
			   * The chapters store holds the image URL lists for all manga chapters
			   * already requested.
			   */
			  chapters: {}
		  }
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
			  if (animate) {
				  $('#status').stop().fadeOut('fast', function () {
					  $('#status').text(status).fadeIn();
				  });
			  } else {
				  $('#status').stop().text(status).show();
			  }
	
			  document.title = MCR.Global.manga.title+' / '+MCR.Global.request.chapter+' / '+status;
		  }.defaults(true),
	
		  /**
		   * Holds controls functions which change a value.
		   */
		  change: {
			  /**
			   * Changes the spacing between two pages.
			   *
			   * @param force_to An integer value with em or px appended.
			   *
			   * @return void
			   */
			  spacing: function (/** String */ force_to) {
				  if ( /[0-9]+(em|px)/i.test(force_to) ) {
					  $('#pages img').css('margin-bottom', force_to);
				  } else {
					  var s = $('#control-spacing input').val();
					  MCR.Option.set('spacing', s);
					  $('#pages img').css('margin-bottom', s);
				  }
				  $('#legend-spacing .control-now').text(MCR.Option.get('spacing'));
			  }
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
			   * Toggles betweeen black and white background, and white and black text.
			   * 
			   * @param force_to True for white
			   *
			   * @return void
			   */
			  allBlack: function (/** Boolean */ force_to) {
				  var a = $('[class*=white], [class*=black]');
				  MCR.Option.toggle('allblack', force_to, function () {
					  a.addClass('black').removeClass('white');
				  }, function () {
					  a.addClass('white').removeClass('black');
				  });
			  },
		
			  /**
			   * When enabled, the first page of a chapter is displayed while the rest
			   * loads.
			   *
			   * @param force_to True to enable
			   *
			   * @return void
			   */
			  showFirst: function (/** Boolean */ force_to) {
				  MCR.Option.toggle('showfirst', force_to);
			  },
		
			  /**
			   * Enable cache. Persistence requires HTML5 Local Storage,
			   * ie. Firefox 3.6+ or Chrome 9+.
			   *
			   * @param force_to True to enable
			   *
			   * @return void
			   */
			  cache: function (/** Boolean */ force_to) {
				  MCR.Option.toggle('cache', force_to);
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
					  $('#pages').addClass('forced800');
				  }, function () {
					  $('#pages').removeClass('forced800');
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
					  $('#adfooter').show();
				  }, function () {
					  $('#adfooter').hide();
				  });	
			  }
		  },

		  /**
		   * Holds utility functions for the controls panels.
		   */
		  controls: {
			  /**
			   * Binds the controls to their handles and sets the environment according
			   * to the current options.
			   *
			   * @return void
			   */
			  init: function() {	
				  $('#control-button').click(MCR.Do.control.show);
				  $('#control-close').click(MCR.Do.control.hide);
	
				  $('#control-spacing input').keyup(MCR.Do.change.spacing);
	
				  $('#control-allblack button').click(MCR.Do.toggle.allBlack);
				  $('#control-hotkeys button').click(MCR.Do.toggle.hotkeys);
				  $('#control-showfirst button').click(MCR.Do.toggle.showFirst);
				  $('#control-forced800 button').click(MCR.Do.toggle.forced800);
				  $('#control-cache button').click(MCR.Do.toggle.cache);
				  $('#control-ads button').click(MCR.Do.toggle.ads);				
				
				
				  $('#navigation-button').click(function() {MCR.Do.control.show('navigation');});
				  $('#navigation-close').click(function() {MCR.Do.control.hide('navigation');});
				
				  $('#navigation-chapters').live('change', MCR.Get.selectedChapter);
				  // Must be live: else it gets removed when the select is changed.
				
				  $('#navigation-previous').click(MCR.Get.previousChapter);
				  $('#navigation-next').click(MCR.Get.nextChapter);
				
				
				
				  $('#cache-button').click(function() {MCR.Do.control.show('cache');});
				  $('#cache-close').click(function() {MCR.Do.control.hide('cache');});
				
				  $('#cache-clear').click(MCR.Cache.clear);
				
				  MCR.Do.change.spacing( MCR.Option.get('spacing') );
	
				  MCR.Do.toggle.allBlack( MCR.Option.switched('allblack') );
				  MCR.Do.toggle.hotkeys( MCR.Option.switched('hotkeys') );
				  MCR.Do.toggle.showFirst( MCR.Option.switched('showfirst') );
				  MCR.Do.toggle.cache( MCR.Option.switched('cache') );
				  MCR.Do.toggle.forced800( MCR.Option.switched('forced800') );
				  MCR.Do.toggle.ads( MCR.Option.switched('ads') );
			  },
		
			  /**
			   * Displays the panel specified, or the control panel by default.
			   *
			   * @param panel The panel to show.
			   *
			   * @return void
			   */
			  show: function (/** String */ panel) {
				  $('#'+panel+'-panel').fadeIn('fast');
			  }.defaults('control'),
		
			  /**
			   * Hides the panel specified, or the control panel by default.
			   *
			   * @param panel The panel to hide.
			   *
			   * @return void
			   */
			  hide: function (/** String */ panel) {
				  $('#'+panel+'-panel').fadeOut('fast');
			  }.defaults('control')
		  }
	  },
	
	  /**
	   * The core of the script: holds the essential chapter mangaging functions.
	   */
	  Get: {
		  chapter: function () {
			  var url,
				  makeUrl = function () {
					  return MCR.Tool.buildUrl(
						  MCR.Global.request.manga,
						  MCR.Global.request.chapter,
						  MCR.TMP.page);
				  },
			
				  updateDetails = function () {
					  //
				  },
			
				  updateSelect = function () {
					  //
				  },
			
				  updateDisplay = function () {
					  //
				  },
			
				  mainLoop = function () {
					  //
				  };
			
			  if ( MCR.Option.switched("cache") ) {
				  // Cache is enabled
				  if ( MCR.Cache.chapters[String(MCR.Global.request.manga)] ) {
					  // Cache has this manga
					  if ( MCR.Cache.chapters[String(MCR.Global.request.manga)][String(MCR.Global.request.chapter)] ) {
						  // Cache has this chapter
						  updateDetails();
						  updateDisplay();
						  return;
					  }
				  }
			  } else {
				  MCR.TMP.page = 1;
				  mainLoop();
			  }
		  }	
	  }
  };

	window.MCR = MCR;
})(window);


$(function (){
  // Disable the annoying 'skip to next page' keyboard shortcut
  function omvKeyPressed() {}
  document.onkeydown = function() {};
  
	MCR.Global.request = MCR.Tool.parseUrl(window.location);
	MCR.Global.manga.title = MCR.Tool.capitalize(MCR.Global.request.manga.replace(/-/ig, ' '));
	MCR.Global.manga.chapter = {
		"number": MCR.Global.request.chapter,
		"name": ""
	};
	
	$('head > *').not('script').remove(); // remove everything except ourselves.

  MCR.UI.init();
	MCR.Option.init();
	MCR.Cache.init();
	MCR.Do.init();

	MCR.Get.chapter();
});
