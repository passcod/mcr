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
		  "keyPrefix": "MCR-",
		  
		  /**
		   * Updates the manga info panel and the version number.
		   *
		   * @return void
		   */
		  show: function () {
		    var n = $('nav#info');
		    $('h1', n).html(MCR.Global.manga.title);
		    $('h2', n).html(MCR.Global.manga.chapter['name']);
		    $('#description', n).html(MCR.Global.manga.description);
		    $('date[pubdate]', n).text(MCR.Global.manga.pubdate);
		    $('#stat', n).html(MCR.Global.manga.status);
		    $('#author', n).text(MCR.Global.manga.author);
		    $('#artist', n).text(MCR.Global.manga.artist);
		    $('#cover', n).attr('src', MCR.Global.manga.cover);
		    
		    $('#version').text(MCR_VERSION);
		  }
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
            "			<a href='/'><img alt='Home' title='Home' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYAQMAAADaua+7AAAAAXNSR0IArs4c6QAAAAZQTFRFAPBjgICA886xlAAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2wEdDjQOfTITRAAAADdJREFUCNdjYIABCSCWAWI7IH4PxPcbGBj3HmBgr3/AwPb/AwPv/x0M1v//MLD/f4DAHzAxGgAAlVoaeSJXjhgAAAAASUVORK5CYII=' /></a>"+
            "			<a id='info-button'><img alt='Manga' title='Manga Info' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sBHQ4yNO1kbXAAAAKOSURBVEjHvZYxaxVBFIW/E7QKpFAkihZRMGBAiGChhdi8zvgHDFiJxKQV27n3RzyNnSCxtFE7KxF8pUE0SMCUUUQLwSrKsXBWXjb7YkR0YIudvTNzz5lzz134x0N7DSylIP0Mt01mAhARRMSfH1BKITOJiBnbi8BZAEnY3gJWgX5mrjWxXWOsPdFkI2m6lDKw/VrSkqQp4JDtQ5JOAkuS3pRSXkg6vicEDdxSygJwR5KBJ8B8RHxpIZyQtGJ7riZ0IyKW22jUQc0CcFvSZ9u9zHzZhbJBWkqZBZ5KOmB7MTOXOxHUBdO230r6ZPu0pM1mo4i4bvuupC3bRzPz49DaI7ZfAQclnbC90aAYax3Ql2Tbvdbm47bv1tD9wGIL1KakXlXYg06KIuKU7TeSHkfE5Q7q3gHNZV7MzGcd1D0C5mzPZObaNgS2l6rO57tUlZknJN2UdCkzn43Q/ny98KVfamw0DwwkTUXE4Y7sr0k6VhMRsJGZ90YU43vb65l5AWDfUPFg+2unlqVpoAecqe/PgXsdcc0e+3cUWmMDIyR5C3g4ROe3vVrMWOMttrckjQ9Rtu0OgH22d/Uq20gal7S17YAqq1Xbk6WUiVG+stuoayZsT9pebRIb9qK+JCSt/IU7r1S6+9sOiAgyc832wPZcRMyONK/WXQ1bhqQ5YBARazsKrfI+DbwFPkk6DWxW8/vedl5JRIQaqwBe2d5hFepQzQJw2/ZnSb2IePmbRjQLPK0+dCMiln/bcBq7rpk+BuZtfxnuaMAEsFJpAbgK3G9XuHbpZMdtP5B0rn760BSipHHbk3V+IOlKRGzsqaM13FUez9ueAfq214GP9VmvqpupMRt/9WfQZWy7Nfr/On4AGaxzz0yjBboAAAAASUVORK5CYII=' /></a>"+
            "			<a id='options-button'><img alt='Options' title='Options' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYBAMAAAASWSDLAAAAAXNSR0IArs4c6QAAAC1QTFRFMzY2gYOD7+/vIyYmFBcX0NDQwMHBkZKS4ODgoaKicnR0YmRksLGxU1VV////nH0LMwAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2wEdDjQmSIe7vgAAAEFJREFUGNNjYCATCAIBMltQAMJmBAozwqTADJgUmIZJQcQYBSEkCgdqJpIMTI8gURywCYww94DdJojFoaheIBUAALaxBHc04z/DAAAAAElFTkSuQmCC' /></a>"+
            "			<a id='permalink' href='#'><img alt='Permalink' title='Permalink to current chapter' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sBHQ4zKZd5MOgAAAOESURBVEjHlZbPaxxlGMc/33mTpjHYohJCaiUUG0WhpQeRXCR7EbTSm9iDoBdvIghRmk1md+3sZDfqbv4BT4p4UKOHlnjPwfRgIIdCINWUEusPKrZSN012953Hw84mG0l088AwvM87PN95v8/3+8zAARHmpl2ukO/tzH00W+GwIYAwegfXHORylKdQyI1CcAF4FugHNsxsaXOztlCpVBvZ7CTl8uzhAAr5KC1eeEuiChxLtwAwsy1grdGov1wqlX+ZmpqiVCp1DwCkxfWJmZmkPXtpTgDNZvPpOI7XzIw01cUJCrlRFPyA8TCAJJmZAT8DT0giXQtY996PxXF8p5sTBOntguCYpHbxa977EeCc9/60ma2oFQaccs690W0PgunpaddqaIsWM0u896/FcbyhgBrCe+8vmtnd9HACMrlcrr8rAOdckKqlHRvOudoHlwtHLKHa43puOucWgN86njkp6UhXAFEUNYCNjtyIT/zxxNtzkt5Om/mkpGfSPhwqelKVLAFbQJ8kucB9433zdUl/Snp0RxG7srkncTSfzzuEYbYdRcXNA5tc26wtAGtt9Ug651zP98BfB7zYSdCXkpaElqRgvlAoTORy4SBAGIa7Mq18XOW99yfIZrMn+vr6bqeUtCW5xwP7rTvzwC3v/fk4jlez2SzlcrlVZHJyktnZWcIwfMo59x1w6qAi/wHWXlq9Xn+8VCr9Wq3O7bq1bf8wDAdTnWdaVLQ4T5Vzeh/Q68CwpMd2EMxWarW/n69Uqg396+Ed++dyuf4dKYqjQl9JemEfgBve+1ecc19LOptStWVmF6MoutKzZ250sFIsFh8ADwBStQztR5OkUTOrJ0nyahAEa+lePzAGXAm6lLOlV3uU/GRmf5gZSZKESZLclrgL/N7pp3w+39sVgJltAzc7Uo9478e992fq9caH5XK5iTguMdRhxfvb29vedQOwuLjYyGQyw8CL6UB8KO3HFz29AeOZ8WERfCtpaHfw8vnMzMy1binCJ/5T4JaZtc14NnDBDSm4Hij4UdIZawXAvSRJrnaM6/+PuBjf8d6f7xjpJoRMQ5Z6sqNH7xaLxfVDAYRhSBzHq/X69gkzW0lnF6hl+Y43fzOKos/an1QdZjK2P/gTExO9AwMDL0kaA0aA+8BqkiRXi8XieqlUYnl5mfn5+UP/hTA3N7dnnc/ney9dunQgE/8AQaDLBNsZukkAAAAASUVORK5CYII=' /></a>"+
            "		</span>"+
            "		<span style='float: right;'>"+
            "			<span id='status'>Ready</span>"+
            "			<a id='prev' title='Previous'>&lt;&lt;</a>"+
            "			<a id='next' title='Next'>&gt;&gt;</a>"+
            "		</span>"+
            "	</nav>"+
            "	<nav id='options'>"+
            "   <p>Option Item 1</p>"+
            "	</nav>"+
            " <nav id='info'>"+
            "   <img id='cover' />"+
            "   <header>"+
            "     <h1>Manga</h1>"+ // Manga title
            "     <h2>Chapter</h2>"+ // Chapter name
            "   </header>"+
            "   <p>Released since <date pubdate='pubdate'></date> and currently <i id='stat'></i></p>"+
            "   <p>Story by <b id='author'>author</b>, Art by <b id='author'>author</b>.</p>"+
            "   <p id='description'>Description</p>"+
            " </nav>"+
            " <article>"+
            "   <p>Loading...</p>"+
            "   <div style='height: 300px'>DEBUG</div>"+
            " </article>"+
            "	<footer>"+
            "   <nav>"+
            " 		Userscript by <a href='http://passcod.cz.cc'>passcod</a>"+
            " 		- Uses <a href='http://jquery.com'>jQuery</a>"+
            " 		- Works best in <a href='http://www.mozilla.com/firefox/'>Firefox 4</a>"+
            "     - Fork me on <a href='https://github.com/passcod/Manga-ChapterReader/'>Github</a>"+
            " 		- License: <a href='http://www.opensource.org/licenses/mit-license.php'>MIT</a> + Attribution"+
            "		  - Thanks for using!"+
            "     (v. <span id='version'></span>)"+
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
        "#container > nav": {
	        "top": "50px",
	        "left": "auto",
	        "width": "780px",
	        "border": "5px #CCC solid",
	        "padding": "5px",
	        "display": "none",
	        "position": "fixed",
	        "font-size": "0.8em"
        },
        "nav#main": {
	        "top": "0px",
	        "height": "24px",
	        "display": "block",
	        "line-height": "24px"
        },
        "#chapters select": {
          "position": "relative",
          "top": "-6px"
        },
        "img#cover": {
          "float": "right",
          "height": "20em",
          "margin": "1em"
        },
        "#status": {
	        "font-size": "0.8em"
        },
        "article": {
	        "text-align": "center"
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
	        "text-decoration": "underline",
	        "cursor": "pointer"
        },
        "a:hover, a:focus": {
	        "text-decoration": "none"
        },
        "h1": {
          "font-size": "1.7em"
        },
        "h2": {
          "font-size": "1.2em"
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
        
        $('body').append(MCR.UI.html).add('nav').addClass('white');
        $('#pre').remove();
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
		    var defaults = {
		      timeout: 5000
		    };
		    
		    if ( typeof settings === 'undefined' ) {
		      settings = {};
		    }
		    
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
						  data += '<img src="/qwertyuiopasdfghjklzxcvbnm.404" alt="-" width="800" />';
					  }
            
            data += "</body></html>";
            
            
            
					  if ( callback ) {
					    var p = new DOMParser(),
					        doc = p.parseFromString(data, "text/xml");
					    
						  callback(doc);
					  }
				  },
				  timeout: settings['timeout'] ? settings['timeout'] : defaults['timeout']
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
			  "spacing"      : "1em", // Page spacing
			  "allblack"     : "off", // Background color
			  "hotkeys"      : "off", // Hotkeys
			  "showfirst"    : "off", // Show first page while loading a chapter
			  "forced800"    : "on" , // Force img width to 800px
			  "ads"          : "on" , // Display MR.net's ads
	
			  "cache"        : "off", // Use cache (and persist if localStorage)
			  "cache-images" : "{}"   // Image cache store
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
					  window.localStorage[MCR.Info.keyPrefix+key] = MCR.Option.values[key];
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
			  if ( typeof animate !== 'boolean' ) {
			    animate = true;
			  }
			  if (animate) {
				  $('#status').stop().fadeOut('fast', function () {
					  $('#status').text(status).fadeIn();
				  });
			  } else {
				  $('#status').stop().text(status).show();
			  }
	
			  document.title = MCR.Global.manga.title+' / '+MCR.Global.request.chapter+' / '+status;
		  },
	
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
				
				  $('#chapters select').live('change', MCR.Get.selectedChapter);
				  // Must be live: else it gets removed when the select is changed.
				
				  $('#previous').click(MCR.Get.previousChapter);
				  $('#next').click(MCR.Get.nextChapter);
				
				  $('#cache-button').click(function() {MCR.Do.panel.toggle('cache');});
				  $('#info-button').click(function() {MCR.Do.panel.toggle('info');});
				
				
				  MCR.Do.change.spacing( MCR.Option.get('spacing') );
	
				  MCR.Do.toggle.allBlack( MCR.Option.switched('allblack') );
				  MCR.Do.toggle.hotkeys( MCR.Option.switched('hotkeys') );
				  MCR.Do.toggle.showFirst( MCR.Option.switched('showfirst') );
				  MCR.Do.toggle.cache( MCR.Option.switched('cache') );
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
			  var url, i,
				  makeUrl = function () {
					  return MCR.Tool.buildUrl(
						  MCR.Global.request.manga,
						  MCR.Global.request.chapter,
						  MCR.TMP.page);
				  },
			
				  updateSelect = function (doc) {
					  //
				  },
			
				  updateDisplay = function (use_cache) {
					  var i, h = "", t;
					  for ( i in MCR.TMP.list ) {
					    t = MCR.Global.manga.title + '/' +
					      MCR.Global.request.chapter + ': ' + MCR.Global.manga.chapter['name'] + '/' +
					      'Page ' + i;
					    h += "<img src='"+MCR.TMP.list[i]+"' alt='"+i+"' title='"+i+"' />\n";
					  }
					  $('article').html(h);
					  MCR.Do.displayStatus('Loaded');
				  },
				  
				  doPage1 = function (doc) {
				    // display first page if opt is on (TODO)
				    MCR.Global.manga.chapter['number'] = MCR.Global.request.chapter;
				    var sss, ss, s = $('script:last', doc).contents().text();
				    s = s.split("\n");
				    ss = s.indexOf("function omvKeyPressed(e) {");
				    sss = s.splice(0, ss).join("\n");
				    eval(sss);
				    
				    MCR.Global.manga.id = document['mangaid'];
				    
				    $.getJSON('/actions/selector/?id='+MCR.Global.manga.id+'&which=0', function(j) {
				      updateSelect(j);
				      
				      var i, k;
				      
				      for ( i in j ) {
				        k = j[i];
				        if ( k.chapter == String(MCR.Global.request.chapter) ) {
				          MCR.Global.manga.chapter['name'] = j[i]['chapter_name'];
				        }
				        delete k['chapter'];
				        MCR.Global.manga.chapters[ j[i]['chapter'] ] = k;
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
				  },
			
				  mainLoop = function () {
				    MCR.Do.displayStatus('Loading Ch. '+MCR.Global.request.chapter+'...'+
				      '('+MCR.TMP.page+')', false);
					  MCR.Tool.getFake(makeUrl(), function (doc) {
					    var disp = false,
					        img = $('#img', doc);
				      if ( typeof img.attr('src') != 'undefined' ) {
			          MCR.TMP.list.push(img.attr('src'));
			          if ( MCR.TMP.page == 1 ) {
			            doPage1(doc);
			          }
			          MCR.TMP.page++;
			          mainLoop();
				      } else {
					      updateDisplay();
					    }
					  });
				  };
			  
			  MCR.Do.displayStatus('Loading Ch. '+MCR.Global.request.chapter+'...');
			  
			  /*if ( MCR.Option.switched("cache") ) {
				  // Cache is enabled
				  if ( MCR.Cache.get('chapters')[String(MCR.Global.request.manga)] ) {
					  // Cache has this manga
					  if ( MCR.Cache.get('chapters')[String(MCR.Global.request.manga)][String(MCR.Global.request.chapter)] ) {
						  // Cache has this chapter
						  updateDisplay(true);
						  return;
					  }
				  }
			  } else {*/
			    MCR.TMP.list = [];
				  MCR.TMP.page = 1;
				  mainLoop();
			  //}
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
	  }
  };

	window.MCR = MCR;
})(window);
