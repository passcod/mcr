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
