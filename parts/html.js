	$('body').html(""+
"<div id='container'>"+
"	<h1 id='title'>"+
"		"+MCR.Global.manga.title+
"	</h1>"+
"	<h2 id='chapter'>"+
"		Chapter "+MCR.Global.manga.chapter["number"]+": "+MCR.Global.manga.chapter["name"]+
"	</h2>"+
"	<div id='navbar' class='white'>Chapter: "+
"		<span id='chapters' class='white'><select><option>---</option></select></span>"+
"		<span id='links'>"+
"			<a href='/'>Home</a>"+
"			/"+
"			<a id='mangalink'>Manga</a>"+
"			/"+
"			<a id='control-button'>Options</a>"+
"			/"+
"			<a id='permalink' href='"+MCR.Tool.buildUrl(MCR.Global.request.manga, MCR.Global.request.chapter)+"'>Permalink</a>"+
"		</span>"+
"		<span style='float: right;'>"+
"			<span id='status'>Ready</span>"+
"			<a id='prev'>Previous</a>"+
"			-"+
"			<a id='next'>Next</a>"+
"		</span>"+
"	</div>"+
"	<div id='control-panel' class='white'>"+
"		<div id='control-container'>"+
"			<label><small>Version: "+MCR.Info.version+"</small></label>"+
"			<label id='control-allblack'><button>Invert Colours</button></label>"+
"			<label id='control-spacing'>Spacing <input type='text' value='"+MCR.Option.get('spacing')+"' /></label>"+
"			<label id='control-hotkeys'><button>Toggle Hotkeys</button></label>"+
"			<label id='control-showfirst'><button>Load First page</button></label>"+
"			<label id='control-cache'><button>Toogle Cache</button></label>"+
"			<label id='control-cachesize'><small>Cache: <b><span>0</span>%</b> used.</small></label>"+
"			<label id='control-clearcache'><button>Clear Cache <b>(!)</b></button></label>"+
"			<label id='control-forced800'><button>Force image width</button></label>"+
"			<label id='control-ads'><button>Ads?</button></label>"+
"		</div>"+
"		<div id='control-legend'>"+
"			<div id='legend-allblack'>Toggle between a white or black background and text. Default is off (white). <b>Now: <span class='control-now'></span>.</b></div>"+
"			<div id='legend-spacing'>Customize the spacing between pages. Values must be in px or em. Default is 1em. <b>Now: <span class='control-now'></span>.</b></div>"+
"			<div id='legend-hotkeys'>Toggle hotkeys. Default is off. <b>Now: <span class='control-now'></span>.</b> Hotkeys are: <ul>"+
"				<li>[,]: Previous Chapter</li>"+
"				<li>[.]: Next Chapter</li>"+
"			</ul></div>"+
"			<div id='legend-showfirst'>Display first page of chapter while loading. Default is Off. <b>Now: <span class='control-now'></span>.</b></div>"+
"			<div id='legend-cache'><b>Cache</b> covers all of (currently only one): <ul><li>The image URL list for every chapter you visit. This will considerably reduce loading times for chapters you've already read. The limit of chapter images list it can store is roughly 3600.</li></ul> Default: Off. <b>Now: <span class='control-now'></span>.</b></div>"+
"			<div id='legend-clearcache'>Clear the image URL lists cache. <b>IRREVERSIBLE.</b></div>"+
"			<div id='legend-forced800'>All images will be forced to have a width of 800px. This can help in the case of small screens. However, for those who want to appreciate large images at their most, this option can be disabled. Default: On. <b>Now: <span class='control-now'></span>.</b></div>"+
"			<div id='legend-ads'>Support MangaReader.net by clicking on ads (These ads give me absolutely NO revenue, though). You can disable them to spare your eyes, or because you hate them. Your choice. <small>Note: ads will disappear with most Ad Blockers, anyway...</small> Default is On. <b>Now: <span class='control-now'></span>.</b></div>"+
"		</div>"+
"		<a id='control-close'>Close</a>"+
"	</div>"+
"	<div id='pages' class='forced800'>"+
"		Loading..."+
"	</div>"+
"	<div id='about'>"+
"		Userscript by <a href='http://passcod.cz.cc'>passcod</a>"+
"		- Uses <a href='http://jquery.com'>jQuery</a>"+
"		- Works best in <a href='http://www.mozilla.com/firefox/'>Firefox 4</a>"+
"		- <a href='http://www.jslint.com/'>Lint</a>'d"+
"		- License: <a href='http://www.opensource.org/licenses/mit-license.php'>MIT</a> + Attribution"+
"		- Thanks for using!"+
"	</div>"+
"	<div id='adfooter'>"+
"		<iframe width='350' height='250' frameborder='no' scrolling='no' src='http://ad.mangareader.net/btleft' class='left' />"+
"		<iframe width='350' height='250' frameborder='no' scrolling='no' src='http://ad.mangareader.net/btright' class='right' />"+
"	</div>"+
"	<div id='fakedoc'></div>"+
"</div>").addClass('white');

