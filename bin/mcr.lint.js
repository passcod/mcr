var MCR_VERSION = 11.66;
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
	var size = 0, key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) {
			size++;
		}
	}
	return size;
};




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
		    var n = $('nav#info');
		    $('h1', n).html(MCR.Global.manga.title);
		    $('h2', n).html(MCR.Global.manga.chapter['name']);
		    $('#description', n).html(MCR.Global.manga.description);
		    $('date[pubdate]', n).text(MCR.Global.manga.pubdate);
		    $('#stat', n).html(MCR.Global.manga.status);
		    $('#author', n).text(MCR.Global.manga.author);
		    $('#artist', n).text(MCR.Global.manga.artist);
		    $('#cover', n).attr('src', MCR.Global.manga.cover);
		    
		    $('#permalink').attr('href', MCR.Tool.buildUrl(MCR.Global.request.manga, MCR.Global.request.chapter));
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
	   * Contains the HTML markup and the CSS stylesheet as well as an initializer.
	   */
	  UI: {
	    /**
	     * HTML markup
	     */
	    html: ""+
            "<div id='container'>"+
            "	<nav id='main'>"+
            "		<span class='white'><select id='chapters'><option>---</option></select></span>"+
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
            "   <p><label>"+
            "     <input type='checkbox' id='option-spacing' value='on' />"+
            "     Add spacing between pages to facilitate reading."+
            "   </label></p>"+
            "   <p><label>"+
            "     <input type='checkbox' id='option-horizontal' value='off' />"+
            "     Horizontal reading. Not recommended for small screens less"+
            "     than 1200px high."+
            "   </label></p>"+
            "   <p><label>"+
            "     <input type='checkbox' id='option-black' value='off' />"+
            "     Switch to dark skin."+
            "   </label></p>"+
            "   <p><label>"+
            "     <input type='checkbox' id='option-timeout' value='on' />"+
            "     Timeout image loading to 5s. On fast connections, this will decrease"+
            "     loading time. However, do not use on slow connections as pages"+
            "     will be missing."+
            "   </label></p>"+
            "   <p><label>"+
            "     <input type='checkbox' id='option-forced800' value='on' />"+
            "     Force image width to 800. Provides a more uniform reading experience,"+
            "     but you might want to disable if you can't read large pages."+
            "   </label></p>"+
            "   <p><label>"+
            "     <input type='checkbox' id='option-hotkeys' value='on' />"+
            "     Enable hotkeys."+
            "     <b>&lt;</b> for Previous and <b>&gt;</b> for Next."+
            "   </label></p>"+
            "   <p><label>"+
            "     <input type='checkbox' id='option-ads' value='on' />"+
            "     Support MR.net! Display their ads at the bottom and click on them."+
            "     You can always disable this. If you have an Ad Blocker, they won't appear anyway."+
            "   </label></p>"+
            "   <p><label>"+
            "     <input type='checkbox' id='option-cache' value='on' />"+
            "     Use cache. This makes loading a chapter previously visited faster."+
            "     Now you can hit Previous and re-read that last chapter quickly."+
            "     Not recommended on slow connections."+
            "   </label></p>"+
            "   <p><a id='cache-button'>Manage Cache</a></p>"+
            "	</nav>"+
            " <nav id='info'>"+
            "   <img id='cover' />"+
            "   <header>"+
            "     <h1>Manga</h1>"+ // Manga title
            "     <h2>Chapter</h2>"+ // Chapter name
            "   </header>"+
            "   <p>Released since <date pubdate='pubdate'></date> and currently <i id='stat'></i></p>"+
            "   <p>Story by <b id='author'>author</b>, Art by <b id='artist'>artist</b>.</p>"+
            "   <p id='description'>Description</p>"+
            " </nav>"+
            " <nav id='cache'>"+
            "   <p><a onclick='MCR.Do.panel.toggle(\"cache\")'>Hide</a></p>"+
            "   <p>Storage used: <b id='storagesize'>0</b>%</p>"+
            "   <p><label>"+
            "     <input type='button' id='cache-clear' value='Clear' />"+
            "     Clear the cache. Removes all cached chapters."+
            "   </label></p>"+
            " </nav>"+
            " <article class='spaced'>"+
            "   <ul><li>Loading...</li></ul>"+
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
            "	  <div id='ads'></div>"+
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
	        "border": "5px solid",
	        "padding": "5px",
	        "display": "none",
	        "opacity": "0.95",
	        "position": "fixed",
	        "font-size": "0.8em",
	        "text-align": "justify"
        },
        "nav#main": {
	        "top": "0px",
	        "height": "24px",
	        "display": "block",
	        "line-height": "24px"
        },
        "nav#options, nav#cache": {
          "-moz-column-count": "2",
          "-moz-column-gap": "2em",
          "-moz-column-rule-style": "solid",
          "-moz-column-rule-width": "1px",
          "-webkit-column-count": "2",
          "-webkit-column-gap": "2em",
          "-webkit-column-rule-style": "solid",
          "-webkit-column-rule-width": "1px",
          "column-count": "2",
          "column-gap": "2em",
          "column-rule-style": "solid",
          "column-rule-width": "1px"
        },
        "#chapters": {
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
        ".forced800 img": {
	        "width": "800px"
        },
        "footer nav": {
	        "font-size": "0.7em",
	        "margin": "1em auto",
	        "text-align": "center"
        },
        "input[type=button]": {
          "border": "1px solid",
          "background-color": "transparent"
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
	        "border-color": "white",
	        "-moz-column-rule-color": "white",
	        "-webkit-column-rule-color": "white",
	        "column-rule-color": "white"
        },
        ".white": {
	        "background-color": "white",
	        "color": "black",
	        "border-color": "black",
	        "-moz-column-rule-color": "black",
	        "-webkit-column-rule-color": "black",
	        "column-rule-color": "black"
        },
        ".white select, select.white, .black select, select.black": {
	        "color": "black"
        },
        "footer #ads .left": {
	        "float": "left"
        },
        "footer #ads .right": {
	        "float": "right"
        },
        "article ul": {
          "list-style": "none",
          "padding": "0"
        },
        ".horizontal ul": {
          "margin": "0 0 1em 0",
          "padding": "0",
          "float": "left",
          "width": "100%"
        },
        ".horizontal li": {
          "float": "left"
        },
        ".spaced img": {
          "margin-bottom": "1em"
        },
        ".horizontal.spaced li": {
          "padding": "0.5em"
        }
      },
      
      init: function () {
        $('body > *').not('script, #container').remove();
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
		    
		    if ( !MCR.Option.switched('timeout') ) {
		      defaults.timeout = false;
		    }
		    
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
						  data += '<img src="/notfound.404" alt="-" width="800" />';
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
			  "spacing"      : "on", // Page spacing (on = 1em, off = 0px)
			  "horizontal"   : "off", // Horizontal reading
			  "black"        : "off", // Background color
			  "timeout"      : "on", // 5s Timeout
			  "hotkeys"      : "on", // Hotkeys
			  "forced800"    : "on" , // Force img width to 800px
			  "ads"          : "on" , // Display MR.net's ads
	
			  "cache"        : "off", // Use cache (and persist if localStorage)
			  "cache-chapters" : "{}"   // Image cache store
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
				  window.localStorage.setItem(MCR.Info.keyPrefix+key, MCR.Option[key]);
				  $('#storagesize').text(MCR.Tool.storageUsed(true));
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
			  for ( var i in MCR.Cache.store ) {
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
	      
	      if ( status.length > 0 ) {
	        status += ' / ';
	      }
	      
			  document.title = status + MCR.Global.manga.title+' / Ch. '+MCR.Global.request.chapter;
		  },
	
		  /**
		   * Holds controls functions which change a value.
		   */
		  change: {
			  //
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
			   * Toggles betweeen 1em spacing between pages or none.
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
			   * Enable a 5s timeout on Ajax requests.
			   *
			   * @param force_to True to enable
			   *
			   * @return void
			   */
			  timeout: function (/** Boolean */ force_to) {
				  MCR.Option.toggle('timeout', force_to);
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
				  $('#cache-button').click(function() {MCR.Do.panel.toggle('cache');});
				  $('#info-button').click(function() {MCR.Do.panel.toggle('info');});
				  
				  $('select#chapters').live('change', MCR.Get.selectedChapter);
				  // Must be live: else it gets removed when the select is changed.
	        
				  $('#prev').click(MCR.Get.previousChapter);
				  $('#next').click(MCR.Get.nextChapter);
				  
				  $('#option-spacing').change(MCR.Do.toggle.spacing);
				  $('#option-horizontal').change(MCR.Do.toggle.horizontal);
				  $('#option-black').change(MCR.Do.toggle.black);
				  $('#option-timeout').change(MCR.Do.toggle.timeout);
				  $('#option-hotkeys').change(MCR.Do.toggle.hotkeys);
				  $('#option-cache').change(MCR.Do.toggle.cache);
				  $('#option-forced800').change(MCR.Do.toggle.forced800);
				  $('#option-ads').change(MCR.Do.toggle.ads);
				  
				  MCR.Do.toggle.spacing( MCR.Option.switched('spacing') );
				  MCR.Do.toggle.horizontal( MCR.Option.switched('horizontal') );
				  MCR.Do.toggle.black( MCR.Option.switched('black') );
				  MCR.Do.toggle.timeout( MCR.Option.switched('timeout') );
				  MCR.Do.toggle.hotkeys( MCR.Option.switched('hotkeys') );
				  MCR.Do.toggle.cache( MCR.Option.switched('cache') );
				  MCR.Do.toggle.forced800( MCR.Option.switched('forced800') );
				  MCR.Do.toggle.ads( MCR.Option.switched('ads') );
				  
				  
				  $('#cache-clear').click(MCR.Cache.clear);
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
			
				  updateSelect = function () {
					  var c, html = "";
					  for ( var i in MCR.Global.manga.chapters ) {
					    c = MCR.Global.manga.chapter.index == i ? ' selected="selected" ' : ' ';
					    html += "<option value='"+MCR.Global.manga.chapters[i]['chapter']+"'"+c+">"+MCR.Global.manga.chapters[i]['chapter']+"\n";
					  }
					  $('#chapters').html(html);
				  },
			    
			    imgTag = function (page) {
			      var t = MCR.Global.manga.title + ' / ' +
				      MCR.Global.request.chapter + ': ' + MCR.Global.manga.chapter['name'] + ' / ' +
				      'Page ' + page,
				      
				        s = MCR.Option.switched('spacing') ? 'margin-bottom: 1em;' : 'margin-bottom: 0px;';
				    return "<li><img src='"+MCR.TMP.list[page]+"' alt='"+t+"' title='"+t+"' style='"+s+"' /></li>\n";
			    },
			    
				  updateDisplay = function () {
					  var i, h = "", t;
					  for ( i in MCR.TMP.list ) {
					    h += imgTag(i);
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
					  
					  if ( MCR.Option.switched("cache") ) {
					    var c = MCR.Cache.get('chapters');
					    if ( !c[String(MCR.Global.request.manga)] ) {
					      c[String(MCR.Global.request.manga)] = {};
					    }
					    c[String(MCR.Global.request.manga)][String(MCR.Global.request.chapter)] = MCR.TMP.list;
					    
					    MCR.Cache.set('chapters', c);
					  }
				  },
				  
				  doPage1 = function (doc, cached) {
				    
				    if ( cached ) {} else {
				      $('article ul').html( imgTag(0) );
				    }
				    
				    MCR.Global.manga.chapter['number'] = MCR.Global.request.chapter;
				    var sss, ss, s = $('script:last', doc).contents().text();
				    s = s.split("\n");
				    ss = s.indexOf("function omvKeyPressed(e) {");
				    sss = s.splice(0, ss).join("\n");
				    
				    var s = $('script:last', doc).contents().text(),
				        ss = s.split("\n"),
				        sss = ss.indexOf("function omvKeyPressed(e) {"),
				        ssss = ss.splice(0, sss).join("\n");
				    eval(ssss);
				    
				    MCR.Global.manga.id = document['mangaid'];
				    
				    $.getJSON('/actions/selector/?id='+MCR.Global.manga.id+'&which=0', function(j) {
				      MCR.Global.manga.chapters = j;
				      
				      var i, k;
				      for ( i in j ) {
				        k = j[i];
				        if ( String(k.chapter) == MCR.Global.request.chapter ) {
				          MCR.Global.manga.chapter['name'] = j[i]['chapter_name'];
				          MCR.Global.manga.chapter.index = i;
				        }
				      }
				      
				      updateSelect();
				      
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
				      if ( typeof img.attr('src') !== 'undefined' /*&& MCR.TMP.page <= 2 /* DEBUG */ ) {
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
			  
			  if ( MCR.Option.switched("cache") ) {
				  // Cache is enabled
				  if ( MCR.Cache.get('chapters')[String(MCR.Global.request.manga)] ) {
					  // Cache has this manga
					  if ( MCR.Cache.get('chapters')[String(MCR.Global.request.manga)][String(MCR.Global.request.chapter)] ) {
						  // Cache has this chapter
						  MCR.TMP.list = MCR.Cache.get('chapters')[String(MCR.Global.request.manga)][String(MCR.Global.request.chapter)];
						  
						  MCR.TMP.page = 1;
						  MCR.Tool.getFake(makeUrl(), function (doc) {
						    doPage1(doc, true);
						  });
						  
						  updateDisplay();
						  return;
					  }
				  }
			  }
			  
		    MCR.TMP.list = [];
			  MCR.TMP.page = 1;
			  mainLoop();
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
	
  MCR.UI.init();
	MCR.Option.init();
	MCR.Cache.init();
	MCR.Do.panel.init();
  
  MCR.Info.show();
  
	MCR.Get.chapter();
});
