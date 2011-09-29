(function(window) {
  "use strict";
  var Ui = function() {
    
    /** @public */
    var init = function() {
      $('head').append("<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,400italic,700,700italic&v2' rel='stylesheet'><style>"+MCR.css+"</style>");
      $('body').html(MCR.html);
      
      var icons = ['home', 'info', 'options', 'hotkeys', 'favs', 'previous', 'next'];
      for (var i in icons) {
        $('.'+icons[i]+'-icon').attr('src', 'data:image/png;base64,'+MCR[icons[i]]);
      }
    };
    
    return {
      init: init
    };
  };
  
  window.Ui = new Ui();
})(window);