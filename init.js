$(function (){
  // Disable the annoying 'skip to next page' keyboard shortcut
  function omvKeyPressed() {}
  document.onkeydown = function() {};
  /*
	MCR.Global.request = MCR.Tool.parseUrl(window.location);
	MCR.Global.manga.title = MCR.Tool.capitalize(MCR.Global.request.manga.replace(/-/ig, ' '));
	MCR.Global.manga.chapter = {
		"number": MCR.Global.request.chapter,
		"name": ""
	};
	*/
  var ui = new Ç.Ui();
  
  var options = {
    "spacing": {
      "description": "Add spacing between pages.",
      "default": true,
      "able": true
    },
    "horizontal": {
      "description": "Horizontal reading. Minimum comfortable screen height 768px, recommended 1200px.",
      "default": false,
      "able": true
    },
    "reverse": {
      "description": "Reverse the order of the pages. Can provide a more natural reading experience, especially in horizontal mode.",
      "default": false,
      "able": true
    },
    "forced800": {
      "description": "Force image width to 800. Provides a more uniform reading experience (in vertical mode), but you might want to disable it if the text is too small to read. In horizontal mode, it is better to disable it.",
      "default": false,
      "able": true
    },
    "preload": {
      "description": "Preload the next chapter as you are reading this one." + (Modernizr.postmessage ? '' : ' Requires a modern browser.'),
      "default": false,
      "able": Modernizr.postmessage
    }
  };
  for (var n in options) {
    ui.addOption(n, options[n]['description'], options[n]['default']);
  }
	
  /*
	$(window).bind("popstate", function() {
		MCR.Global.request = MCR.Tool.parseUrl(window.location);
		MCR.Get.chapter();
	});
  
  $(window).bind("keyprevious hitprevious", MCR.Get.previousChapter);
  $(window).bind("keynext hitnext", MCR.Get.nextChapter);*/
  $(window).bind("keyreload hitreload", function() {
    window.location = $('#permalink').attr('href');
  });
  $(window).bind("keyhome hithome", function() {
    window.location = "http://www.mangareader.net";
  });
  
  ui.changeColours(
    [255, 255, 255, 1],
    [0, 0, 0, 1],
    [199, 228, 64, 0.8]
  );
  
  ui.setStatus('Ready');
});
