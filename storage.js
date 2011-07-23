/** storage.js
 *  Provides a simple interface to persistent storage.
 *
 *  void  #set(name, data) => JSONifies data and stores it.
 *  mixed #get(name)       => Retrieves data and deJSONifies it.
 *  mixed #def(name, def)  => Gets the data, and if it doesn't
 *                            exists, returns and sets the default.
 *  void  #del(name)       => Deletes the data.
 *
 *  void             #all.set({name:data, ...})
 *  {name:data, ...} #all.get([name, ...])
 *  {name:data, ...} #all.def({name:data, ...})
 *  void             #all.del([name, ...])
 */
(function(window) {
  "use strict";
  
  var Storage = function() {
    /** @private */
    var self = this;
    /** @private */
    var prefix = "mcr-";
    
    /** @public */
    var set = function(name, data) {
      window.localStorage[prefix+name] = window.JSON.stringify(data);
    };
    
    /** @public */
    var get = function(name) {
      return window.JSON.parse(window.localStorage[prefix+name]);
    };
    
    /** @public */
    var def = function(name, def) {
      var data = self.get(name);
      if (data === null) {
        set(name, def);
        return def;
      } else {
        return data;
      }
    };
    
    /** @public */
    var del = function(name) {
      window.localStorage.removeItem(prefix+name);
    };
    
    /** @public */
    var setAll = function(obj) {
      for (var name in obj) {
        if (obj.hasOwnProperty(name)) {
          set(name, obj[name]);
        }
      }
    };
    
    /** @public */
    var getAll = function(arr) {
      var obj = {};
      for (var i in arr) {
        obj[arr[i]] = get(arr[i]);
      }
      return obj;
    };
    
    /** @public */
    var defAll = function(obj) {
      var ret = {};
      for (var name in obj) {
        if (obj.hasOwnProperty(name)) {
          ret[name] = def(name, obj[name]);
        }
      }
      return ret;
    };
    
    /** @public */
    var delAll = function(arr) {
      for (var i in arr) {
        del(arr[i]);
      }
    };
    
    return {
      set: set,
      get: get,
      def: def,
      del: del,
      all: {
        set: setAll,
        get: getAll,
        def: defAll,
        del: delAll
      }
    }
  };
  
  window.Storage = new Storage();
})(window);