"use strict";

(function(window) {

  var Ui = function() {
    var manga = chapterno = chaptername = artist = author = release = rstatus = "";
    var navs = ['info', 'options', 'hotkeys', 'theme', 'favs', 'mark'];
    var buttons = ['previous', 'next', 'reload', 'home', 'info', 'options', 'permalink', 'hotkeys', 'theme', 'favs', 'mark'];
    var hotkeys = {
      'next': 68, 'previous': 65, 'home': 87, 'reload': 83,
      'info': 73, 'options': 79, 'hotkeys': 72, 'theme': 84, 'favs': 70, 'mark': 66,
      'theme1': 49, 'theme2': 50, 'theme3': 51,
      'favadd': -1, 'favdel': -1, 'favtog': -1,
      'markadd': -1, 'markdel': -1, 'marktog': -1
    };
    var self = this;
    var k;
    
    /**
     * Change the status message.
     *
     * @param  message  The message to be used.
     * @return void
     */
    this.setStatus = function(/** String */ message) {
      message = message || '';
      var title = message + (message == '' ? '' : ' / ');
      $('#status').text(message);
      
      $('title').text( title + chapterno + ": " + chaptername + " / " + manga );
    };
    
    /**
     * Changes the manga info. All are optional and will default to their
     * previous values or `""`.
     * 
     * @param  _manga        The manga's name.
     * @param  _chapterno    The chapter's number.
     * @param  _chaptername  The chapter's title.
     * @param  _artist       The artist.
     * @param  _author       The author.
     * @param  _release      The release date.
     * @param  _rstatus      The release status.
     * @return void
     */
    this.setInfo = function(/** String  */ _manga,
                            /** Integer */ _chapterno,
                            /** String  */ _chaptername,
                            /** String  */ _artist,
                            /** String  */ _author,
                            /** Integer */ _release,
                            /** String  */ _rstatus) {
      manga       = _manga       || manga;
      chapterno   = _chapterno   || chapterno;
      chaptername = _chaptername || chaptername;
      artist      = _artist      || artist;
      author      = _author      || author;
      release     = _release     || release;
      rstatus     = _rstatus     || rstatus;
      
      var $info = $('nav#info');
      $('h1', $info).text(manga);
      $('h2', $info).text(chapterno + ": " + chaptername);
      $('date', $info).text(release);
      $('#stat', $info).text(rstatus);
      
      if (artist == '') { artist = author; }
      if (artist == '') {
        $('#arthor').html('Author / Artist unknown.');
      } else {
        if (author == '') { author = artist; }
        $('#arthor').html('Story / Art by <strong>' + author + '</strong> / <strong>' + artist + '</strong>.');
      }
    };
    
    /**
     * Adds an option to nav#options. Each option has an id: #option-<name>.
     * The `default_state` is optional, and will default to `false`.
     * 
     * @param  name           A unique name for that option.
     * @param  description    A description for that option.
     * @param  default_state  Optional. Defaults to false.
     * @return void
     */
    this.addOption = function(/** String */ name, /** String */ description, /** Boolean */ default_state) {
      $('nav#options').append('<p id="option-'+name+'"><label><input type="checkbox" /> '+description+'</label></p>');
      if (default_state === true) $('#option-'+name+' input').attr('checked', 'checked');
      hotkeys['opt'+name] = -1;
    };
    
    /**
     * Sets the state of an option.
     *
     * @param  name   The unique name of the option.
     * @param  state  Optional. Defaults to false.
     * @return void
     */
    this.setOption = function(/** String */ name, /** Boolean */ state) {
      $('#option-'+name+' input').removeAttr('checked');
      if (state) $('#option-'+name+' input').attr('checked', 'checked');
    };
    
    /**
     * Gets the state of an option.
     * 
     * @param  name       The unique name of the option.
     * @return {Boolean}  The current state of the option.
     */
    this.getOption = function(/** String */ name) {
      return $('#option-'+name+' input').is(':checked');
    };
    
    /**
     * Shows the main nav.
     *
     * @return void
     */
    this.showMain = function() {
      $('nav#main')
        .clearQueue()
        .animate({top:'0px'}, 'fast');
    };
    
    /**
     * Hides the main nav, but only if there are no other navs shown.
     *
     * @return void
     */
    this.hideMain = function() {
      if ($('nav#main').data('let') === false) {
        $('div#mask').fadeOut();
        $('nav#main')
          .clearQueue()
          .animate({top:'-36px'}, 'fast');
      }
    };
    
    /**
     * Hides all navs (except #main), then shows the specified one.     
     * 
     * @param  name  The id of the nav.
     * @return void
     */
    this.showNav = function(/** String */ name) {
      for (n in navs) {
        if (navs[n] != name) {
          this.hideNav(navs[n]);
        }
      }
      $('div#mask').fadeIn();
      $('nav#main').data('let', true);
      $('nav#'+name).show('fast');
      $(window).trigger("navshown", [name]);
    };
    
    /**
     * Hides the specified nav.
     * 
     * @param  name  The nav to hide.
     * @return void
     */
    this.hideNav = function(/** String */ name) {
      if (name != 'main') {
        $('nav#main').data('let', false);
        $('nav#'+name).hide('fast');
        $(window).trigger("navhidden", [name]);
      }
    };
    
    /**
     * Gets the `e.which` value currently associated with the hotkey event.
     *
     * @param  name  The name of the hotkey event without the `key` prefix.
     * @return {Integer} `e.which` value or -1 if not associated.
     */
    this.getHotkey = function(/** String */ name) {
      return hotkeys[name];
    }
    
    /**
     * Associate a hotkey event with an `e.which` value. The value should be
     * unique, but this is not enforced.
     * 
     * @param  name  The name of the hotkey event without the `key` prefix.
     * @param  key   The new `e.which` value.
     * @return void
     */
    this.setHotkey = function(/** String */ name, /** Integer */ key) {
      hotkeys[name] = key;
    };
    
    /**
     * Changes the UI colours. Colours must be [r, g, b, a] where each component
     * goes from 0 to 255 except opacity which goes from 0.0 to 1.0.
     *
     * @param  background  Colour for the background.
     * @param  text        Colour for the text.
     * @param  border      Colour for the borders.
     * @return void
     */
    this.changeColours = function(/** Array */ background, /** Array */ text, /** Array */ border) {
      function colorStyle(/** Array */ color) {
        var colour;
        
        if (Modernizr.rgba) {
          colour = 'rgba('+color[0]+', '+color[1]+', '+color[2]+', '+color[3]+')';
        } else {
          colour = 'rgb('+color[0]+', '+color[1]+', '+color[2]+')';
        }
        
        return colour;
      }
      
      var ruls = {columnRule: colorStyle(border)};
      ruls[Modernizr.prefixed('columnRuleColor')] = colorStyle(border);
      
      $('.has-bg').css('background-color', colorStyle(background));
      $('.has-border').css('border-color', colorStyle(border));
      $('.has-rule').css(ruls);
      $('body').css('color', colorStyle(text));
    };

    /**
     * Displays a chapter.
     * 
     * @param  pages  An array of image urls.
     * @return void
     */
    this.display = function(/** Array */ pages) {
      var p, $p = $('article ul');
      $('li', $p).remove();
      for (var p in pages) {
        $p.append('<li><img src="'+pages[p]+'" /></li>');
      }
    };
    
    this.updateURL = function(mng, chp) {
      if (Modernizr.history) {
        history.pushState({
            manga: mng,
            chapter: chp+1
          },
          $('title').text(),
          "http://www.mangareader.net/"+mng+"/"+(chp+1)
        );
      }
      $('#button-permalink').attr('href', "http://www.mangareader.net/"+mng+"/"+(chp+1));
    };
    
    
    $('head').append('<style>'+Ç.data.css+'</style>');
    $('body > *').not('script, #container').remove();
    $('body').append(Ç.data.html).add('header nav').addClass('has-bg');
    $('header nav').addClass('has-border');
    
    $('nav#main').hover(function() {
      self.showMain();
      $(this).data('hover', true);
    }, function() {
      self.hideMain();
      $(this).data('hover', false);
    }).data('hover', false);
    
    for (k in navs) {
      (function(name, that) {
        $(window).bind("key"+name+" hit"+name, function() {
          if ($('nav#'+name).is(':hidden')) {
            that.showNav(name);
            that.showMain();
          } else {
            that.hideNav(name);
            if ($('nav#main').data('hover') === false) {
              that.hideMain();
            }
          }
        });
      })(navs[k], this);
    }
    
    for (k in buttons) {
      (function(name) {
        $('#button-'+name).click(function() {
          $(window).trigger("hit"+name);
        });
      })(buttons[k]);
      $('#button-'+buttons[k]+' img').attr('src', 'data:image/png;base64,'+Ç.data[buttons[k]]);
    }
    
    $(window).keydown(function(e) {
      for (k in hotkeys) {
        if (hotkeys[k] == e.which) {
          $(window).trigger('key'+k);
        }
      }
    });
    
    $('div#mask').click(function(e) {
      if ($('nav#main').data('let') === true) {
        e.preventDefault();
        e.stopImmediatePropagation();
        
        for (k in navs) {
          self.hideNav(navs[k]);
        }
        self.hideMain();
      }
    });
  };  
  
  window.Ç.Ui = Ui;

})(window);