$(function (){
  document.onkeydown = function() {};
  
  $('head').append("<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,400italic,700,700italic&v2' rel='stylesheet'>");
  $('head').append("<style>"+MCResources.css+"</style>");
  $('body').html(MCResources.html);
  
  var icons = ['home', 'info', 'options', 'hotkeys', 'favs', 'previous', 'next'];
  for (var i in icons) {
    $('.'+icons[i]+'-icon').attr('src', 'data:image/png;base64,'+MCResources[icons[i]]);
  }
  
  $('body > aside .close').click(function() {
    $(this).hide('fast');
    location.hash = '';
  });
  
  $(window).bind('hashchange', function() {
    var h = location.hash;
    
    if (h == '#info') {
      $('body > aside').hide('fast');
      $('body > aside#info').show('fast');
    } else if (h == '#options') {
      $('body > aside').hide('fast');
      $('body > aside#options').show('fast');
    } else if (h == '#hotkeys') {
      $('body > aside').hide('fast');
      $('body > aside#hotkeys').show('fast');
    } else if (h == '#favs') {
      $('body > aside').hide('fast');
      $('body > aside#favs').show('fast');
    } else {
      $('body > aside').hide('fast');
    }
  });
});
