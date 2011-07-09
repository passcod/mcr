"use strict";

(function(window) {

  var Ui = function() {
    var manga = title = chaptername = "",
        artist = author = rstatus = dir = "",
        chapterno = release = 0,
        description = cover = genera = "";
    var navs = ['info', 'options', 'hotkeys'];
    var buttons = ['previous', 'next', 'reload', 'home', 'info', 'options', 'permalink', 'hotkeys'];
    var options = [];
    var hotkeys = {
      'next': 68, 'previous': 65, 'home': 87, 'reload': 83,
      'info': 73, 'options': 79, 'hotkeys': 72
    };
    var self = this;
    var k;
    
    /**
     * Returns the value if non-empty, or the default else.
     */
    var def = function(val, def) {
      if (val === "" || val === undefined || val === null) {
        return def;
      }
      return val;
    };
    
    /**
     * @return True if n is a number
     */
    var isNumber = function(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
    
    /**
     * Change the status message.
     *
     * @param  message  The message to be used.
     * @return void
     */
    this.setStatus = function(/** String */ message) {
      message = message || '';
      var msg = message + (message == '' ? '' : ' / ');
      $('#status').text(message);
      
      $('title').text( msg + chapterno + chaptername + " / " + title );
    };
    
    this.updateURL = function() {
      if (Modernizr.history) {
        history.pushState({
            manga: manga,
            chapter: chapterno
          },
          $('title').text(),
          "http://www.mangareader.net/"+manga+"/"+chapterno
        );
      }
      $('#button-permalink').attr('href', "http://www.mangareader.net/"+manga+"/"+chapterno);
    };
    
    /**
     * Changes the manga info. All are optional and will default to their
     * previous values or `""`. Do NOT use `false` to use the default.
     * 
     * @param  _manga        The manga's name.
     * @param  _chapterno    The chapter's number.
     * @param  _chaptername  The chapter's title.
     * @param  _artist       The artist.
     * @param  _author       The author.
     * @param  _release      The release date.
     * @param  _rstatus      The release status.
     * @param  _dir          The reading direction.
     * @param  _genera       The genre(s).
     * @param  _description  The manga's description.
     * @param  _cover        URL to the manga's cover image.
     * @return void
     *
     * @todo   Use a single object instead of many params.
     */
    this.setInfo = function(/** String  */ _manga,
                            /** Integer */ _chapterno,
                            /** String  */ _chaptername,
                            /** String  */ _artist,
                            /** String  */ _author,
                            /** Integer */ _release,
                            /** String  */ _rstatus,
                            /** String  */ _dir,
                            /** String  */ _genera,
                            /** String  */ _description,
                            /** String  */ _cover) {
      manga       = def(_manga,       manga);
      chapterno   = def(_chapterno+1, chapterno);
      chaptername = def(_chaptername, chaptername);
      artist      = def(_artist,      artist);
      author      = def(_author,      author);
      release     = def(_release,     release);
      rstatus     = def(_rstatus,     rstatus);
      dir         = def(_dir,         dir);
      genera      = def(_genera,      genera);
      description = def(_description, description);
      cover       = def(_cover,       cover);
      
      title = manga.replace(/-/g, ' ').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
        return $1.toUpperCase();
      });
      
      if (chaptername !== "") {
        chaptername = ": "+chaptername;
      }
      
      var $info = $('nav#info');
      $('h1', $info).text(title);
      $('h2', $info).text(chapterno + chaptername);
      $('date', $info).text(release);
      $('#stat', $info).text(rstatus);
      $('#cover', $info).attr('src', cover);
      $('#description', $info).text(description);
      $('#dir', $info).text('Direction : '+dir);
      
      for (var i in genera.split(' ')) {
        $('#genre').append('<li>'+genera.split(' ')[i]+'</li>');
      }
      
      if (author == artist) {
        $('#arthor').html('Story / Art by <strong>' + author + '</strong>.');
      } else {
        if (artist == '') { artist = author; }
        if (artist == '') {
          $('#arthor').html('Author / Artist unknown.');
        } else {
          if (author == '') { author = artist; }
          $('#arthor').html('Story / Art by <strong>' + author + '</strong> / <strong>' + artist + '</strong>.');
        }
      }
    };
    
    /**
     * Adds an option to nav#options. Each option has an id: #option-<name>.
     * The `default_state` is optional, and will default to `false`.
     * 
     * name           A unique name for that option.
     * description    A description for that option.
     * default        Optional. Defaults to false.
     * able           Optional. Defaults to true.
     * hotkey         Optional. Defaults to -1;
     * 
     * @param  definition  An object containing the above settings.
     * @return void
     */
    this.addOption = function(/** Object */ definition) {
      definition['default'] = def(definition['default'], false);
      definition['able'] = def(definition['able'], true);
      definition['hotkey'] = def(definition['hotkey'], -1);
      
      $('nav#options').append('<p id="option-'+definition["name"]+'"><label><input type="checkbox" /> '+definition["description"]+'</label></p>');
      
      var $opt = $('#option-'+definition["name"]+' input');
      
      if (definition["default"] === true) $opt.attr('checked', 'checked');
      if (definition["able"] === false) $opt.attr('disabled', 'disabled');
      
      hotkeys['opt'+definition["name"]] = definition["hotkey"];
      
      options.push(definition['name']);
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
      if (state) {$('#option-'+name+' input').attr('checked', 'checked');}
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
     * Sets the able state of an option and returns it.
     *
     * @param  name  The unique name of the option.
     * @param  able  Optional. Defaults to the previous value.
     * @return void
     */
    this.ableOption = function(/** String */ name, /** Boolean */ able) {
      var $opt = $('#option-'+name+' input');
      var able = def(able, $opt.attr('disabled') !== "disabled");
      
      $opt.removeAttr('disabled');
      if (!able) {$opt.attr('disabled', 'disabled');}
      
      return able;
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
    var changeColours = function(/** Array */ background, /** Array */ text, /** Array */ border) {
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
      $("html:not(:animated),body:not(:animated)").animate({ scrollTop: 0, scrollLeft: 0}, 500 );
    };
    
    
    /* Options */
    
    this.do_spacing    = function(bool) {
      $('article').toggleClass('spaced', !!bool);
    };
    this.do_horizontal = function(bool) {
      $('article').toggleClass('horizontal', !!bool);
      
      if (bool) {
        var k, t = $('body').width(); $p = $('article img');
        for (k in $p) {
          if (isNumber(k)) {
            t += $($p[k]).width() + 50;
          }
        }
        $('article, article ul').width(t);
      } else {
        $('article, article ul').width('100%');
      }
    };
    this.do_forced800  = function(bool) {
      $('article').toggleClass('forced800', !!bool);
    };
    this.do_fullwidth  = function(bool) {
      $('#container').toggleClass('fullwidth', !!bool);
    };
    this.do_invert = function(bool) {
      if (bool) {
        changeColours(
          [0, 0, 0, 0.95],
          [200, 200, 200, 1],
          [50, 50, 50, 0.2]
        );
      } else {
        changeColours(
          [255, 255, 255, 0.8],
          [0, 0, 0, 1],
          [200, 200, 200, 0.2]
        );
      }
    };
    
    
    $('head').append('<style>'+Ç.data.css+'</style>');
    $('body > *').not('script, #container').remove();
    $('body').append(Ç.data.html).add('header nav').addClass('has-bg');
    $('header nav').addClass('has-border');
    $('#version').text(Ç.data.version);
    
    changeColours(
      [255, 255, 255, 0.8],
      [0, 0, 0, 1],
      [200, 200, 200, 0.2]
    );
    
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
    
    this.postInit = function() {
      for (k in options) {
        (function(name) {
          $('#option-'+name).click(function() {
            $(window).trigger("hitopt"+name);
          });
        })(options[k]);
      }
    };
    
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