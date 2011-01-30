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
	
	alert(""+
	  "This is a pre-release (beta) version. Check often for updates.\n\nAs such, features may be broken or missing. "+
	  "Please do not report these as bugs. Refer to the release notes below:"+
	  "\n\n"+
	  "* No cache.\n"+
	  "* Not possible to change options.\n"+
    "* Icons for nav panel.\n"+
    "* Faster load, lighter footprint.\n"+
    "* Fetches and displays manga description and details.\n"+
    "* No navigation yet. Have to browse the site to select manga *and* chapters.\n"
	);
});
