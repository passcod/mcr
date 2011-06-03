(function(window) {
  /**
   * Parses an Object representing a CSS document and produces a raw CSS string.
   * The result can optionally be minified. The object must be of the form:
   * {
   *   "selector": {
   *     "property": "value"
   *   }
   * }
   * 
   * @author Felix "passcod" Saparelli
   * 
   * @param  css_obj   The CSS object.
   * @param  minified  Should the output be minified? Default is false.
   * @param  tab       What to use as a tab. Default is "\t", disabled when minified.
   * @return {String}  The CSS string.
   */
  
  var jCss = function() { // Static class
    this.parse: function (/** Object */ css_obj, /** Boolean */ minified, /** String */ tab) {
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
    };
  };
  
  window.jCss = jCss;
})(window);