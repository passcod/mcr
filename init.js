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
	MCR.Do.panel.init();
	MCR.Get.init();
  
  MCR.Info.show();
	
	MCR.Get.chapter();
  
	console.log('Hey', Chapter.ep);
	
	$(window).bind("popstate", function() {
		MCR.Global.request = MCR.Tool.parseUrl(window.location);
		MCR.Get.chapter();
	});
});
