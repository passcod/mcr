/*!
 * jQuery JavaScript Library v1.6.1
 * http://jquery.com/
 *
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Thu May 12 15:04:36 2011 -0400
 */
(function(a,b){function cy(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cv(a){if(!cj[a]){var b=f("<"+a+">").appendTo("body"),d=b.css("display");b.remove();if(d==="none"||d===""){ck||(ck=c.createElement("iframe"),ck.frameBorder=ck.width=ck.height=0),c.body.appendChild(ck);if(!cl||!ck.createElement)cl=(ck.contentWindow||ck.contentDocument).document,cl.write("<!doctype><html><body></body></html>");b=cl.createElement(a),cl.body.appendChild(b),d=f.css(b,"display"),c.body.removeChild(ck)}cj[a]=d}return cj[a]}function cu(a,b){var c={};f.each(cp.concat.apply([],cp.slice(0,b)),function(){c[this]=a});return c}function ct(){cq=b}function cs(){setTimeout(ct,0);return cq=f.now()}function ci(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ch(){try{return new a.XMLHttpRequest}catch(b){}}function cb(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function ca(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function b_(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bF.test(a)?d(a,e):b_(a+"["+(typeof e=="object"||f.isArray(e)?b:"")+"]",e,c,d)});else if(!c&&b!=null&&typeof b=="object")for(var e in b)b_(a+"["+e+"]",b[e],c,d);else d(a,b)}function b$(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bU,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=b$(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=b$(a,c,d,e,"*",g));return l}function bZ(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bQ),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bD(a,b,c){var d=b==="width"?bx:by,e=b==="width"?a.offsetWidth:a.offsetHeight;if(c==="border")return e;f.each(d,function(){c||(e-=parseFloat(f.css(a,"padding"+this))||0),c==="margin"?e+=parseFloat(f.css(a,"margin"+this))||0:e-=parseFloat(f.css(a,"border"+this+"Width"))||0});return e}function bn(a,b){b.src?f.ajax({url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bf,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)}function bm(a){f.nodeName(a,"input")?bl(a):a.getElementsByTagName&&f.grep(a.getElementsByTagName("input"),bl)}function bl(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bk(a){return"getElementsByTagName"in a?a.getElementsByTagName("*"):"querySelectorAll"in a?a.querySelectorAll("*"):[]}function bj(a,b){var c;if(b.nodeType===1){b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase();if(c==="object")b.outerHTML=a.outerHTML;else if(c!=="input"||a.type!=="checkbox"&&a.type!=="radio"){if(c==="option")b.selected=a.defaultSelected;else if(c==="input"||c==="textarea")b.defaultValue=a.defaultValue}else a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value);b.removeAttribute(f.expando)}}function bi(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c=f.expando,d=f.data(a),e=f.data(b,d);if(d=d[c]){var g=d.events;e=e[c]=f.extend({},d);if(g){delete e.handle,e.events={};for(var h in g)for(var i=0,j=g[h].length;i<j;i++)f.event.add(b,h+(g[h][i].namespace?".":"")+g[h][i].namespace,g[h][i],g[h][i].data)}}}}function bh(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function X(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(S.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function W(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function O(a,b){return(a&&a!=="*"?a+".":"")+b.replace(A,"`").replace(B,"&")}function N(a){var b,c,d,e,g,h,i,j,k,l,m,n,o,p=[],q=[],r=f._data(this,"events");if(!(a.liveFired===this||!r||!r.live||a.target.disabled||a.button&&a.type==="click")){a.namespace&&(n=new RegExp("(^|\\.)"+a.namespace.split(".").join("\\.(?:.*\\.)?")+"(\\.|$)")),a.liveFired=this;var s=r.live.slice(0);for(i=0;i<s.length;i++)g=s[i],g.origType.replace(y,"")===a.type?q.push(g.selector):s.splice(i--,1);e=f(a.target).closest(q,a.currentTarget);for(j=0,k=e.length;j<k;j++){m=e[j];for(i=0;i<s.length;i++){g=s[i];if(m.selector===g.selector&&(!n||n.test(g.namespace))&&!m.elem.disabled){h=m.elem,d=null;if(g.preType==="mouseenter"||g.preType==="mouseleave")a.type=g.preType,d=f(a.relatedTarget).closest(g.selector)[0],d&&f.contains(h,d)&&(d=h);(!d||d!==h)&&p.push({elem:h,handleObj:g,level:m.level})}}}for(j=0,k=p.length;j<k;j++){e=p[j];if(c&&e.level>c)break;a.currentTarget=e.elem,a.data=e.handleObj.data,a.handleObj=e.handleObj,o=e.handleObj.origHandler.apply(e.elem,arguments);if(o===!1||a.isPropagationStopped()){c=e.level,o===!1&&(b=!1);if(a.isImmediatePropagationStopped())break}}return b}}function L(a,c,d){var e=f.extend({},d[0]);e.type=a,e.originalEvent={},e.liveFired=b,f.event.handle.call(c,e),e.isDefaultPrevented()&&d[0].preventDefault()}function F(){return!0}function E(){return!1}function m(a,c,d){var e=c+"defer",g=c+"queue",h=c+"mark",i=f.data(a,e,b,!0);i&&(d==="queue"||!f.data(a,g,b,!0))&&(d==="mark"||!f.data(a,h,b,!0))&&setTimeout(function(){!f.data(a,g,b,!0)&&!f.data(a,h,b,!0)&&(f.removeData(a,e,!0),i.resolve())},0)}function l(a){for(var b in a)if(b!=="toJSON")return!1;return!0}function k(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(j,"$1-$2").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNaN(d)?i.test(d)?f.parseJSON(d):d:parseFloat(d)}catch(g){}f.data(a,c,d)}else d=b}return d}var c=a.document,d=a.navigator,e=a.location,f=function(){function H(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(H,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/\d/,n=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,o=/^[\],:{}\s]*$/,p=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,q=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,r=/(?:^|:|,)(?:\s*\[)+/g,s=/(webkit)[ \/]([\w.]+)/,t=/(opera)(?:.*version)?[ \/]([\w.]+)/,u=/(msie) ([\w.]+)/,v=/(mozilla)(?:.*? rv:([\w.]+))?/,w=d.userAgent,x,y,z,A=Object.prototype.toString,B=Object.prototype.hasOwnProperty,C=Array.prototype.push,D=Array.prototype.slice,E=String.prototype.trim,F=Array.prototype.indexOf,G={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=n.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.6.1",length:0,size:function(){return this.length},toArray:function(){return D.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?C.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),y.done(a);return this},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(D.apply(this,arguments),"slice",D.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:C,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;y.resolveWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").unbind("ready")}},bindReady:function(){if(!y){y=e._Deferred();if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",z,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",z),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&H()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a&&typeof a=="object"&&"setInterval"in a},isNaN:function(a){return a==null||!m.test(a)||isNaN(a)},type:function(a){return a==null?String(a):G[A.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;if(a.constructor&&!B.call(a,"constructor")&&!B.call(a.constructor.prototype,"isPrototypeOf"))return!1;var c;for(c in a);return c===b||B.call(a,c)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw a},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(o.test(b.replace(p,"@").replace(q,"]").replace(r,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(b,c,d){a.DOMParser?(d=new DOMParser,c=d.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b)),d=c.documentElement,(!d||!d.nodeName||d.nodeName==="parsererror")&&e.error("Invalid XML: "+b);return c},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:E?function(a){return a==null?"":E.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?C.call(c,a):e.merge(c,a)}return c},inArray:function(a,b){if(F)return F.call(b,a);for(var c=0,d=b.length;c<d;c++)if(b[c]===a)return c;return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=D.call(arguments,2),g=function(){return a.apply(c,f.concat(D.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h){var i=a.length;if(typeof c=="object"){for(var j in c)e.access(a,j,c[j],f,g,d);return a}if(d!==b){f=!h&&f&&e.isFunction(d);for(var k=0;k<i;k++)g(a[k],c,f?d.call(a[k],k,g(a[k],c)):d,h);return a}return i?g(a[0],c):b},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=s.exec(a)||t.exec(a)||u.exec(a)||a.indexOf("compatible")<0&&v.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){G["[object "+b+"]"]=b.toLowerCase()}),x=e.uaMatch(w),x.browser&&(e.browser[x.browser]=!0,e.browser.version=x.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?z=function(){c.removeEventListener("DOMContentLoaded",z,!1),e.ready()}:c.attachEvent&&(z=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",z),e.ready())});return e}(),g="done fail isResolved isRejected promise then always pipe".split(" "),h=[].slice;f.extend({_Deferred:function(){var a=[],b,c,d,e={done:function(){if(!d){var c=arguments,g,h,i,j,k;b&&(k=b,b=0);for(g=0,h=c.length;g<h;g++)i=c[g],j=f.type(i),j==="array"?e.done.apply(e,i):j==="function"&&a.push(i);k&&e.resolveWith(k[0],k[1])}return this},resolveWith:function(e,f){if(!d&&!b&&!c){f=f||[],c=1;try{while(a[0])a.shift().apply(e,f)}finally{b=[e,f],c=0}}return this},resolve:function(){e.resolveWith(this,arguments);return this},isResolved:function(){return!!c||!!b},cancel:function(){d=1,a=[];return this}};return e},Deferred:function(a){var b=f._Deferred(),c=f._Deferred(),d;f.extend(b,{then:function(a,c){b.done(a).fail(c);return this},always:function(){return b.done.apply(b,arguments).fail.apply(this,arguments)},fail:c.done,rejectWith:c.resolveWith,reject:c.resolve,isRejected:c.isResolved,pipe:function(a,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[c,"reject"]},function(a,c){var e=c[0],g=c[1],h;f.isFunction(e)?b[a](function(){h=e.apply(this,arguments),h&&f.isFunction(h.promise)?h.promise().then(d.resolve,d.reject):d[g](h)}):b[a](d[g])})}).promise()},promise:function(a){if(a==null){if(d)return d;d=a={}}var c=g.length;while(c--)a[g[c]]=b[g[c]];return a}}),b.done(c.cancel).fail(b.cancel),delete b.cancel,a&&a.call(b,b);return b},when:function(a){function i(a){return function(c){b[a]=arguments.length>1?h.call(arguments,0):c,--e||g.resolveWith(g,h.call(b,0))}}var b=arguments,c=0,d=b.length,e=d,g=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred();if(d>1){for(;c<d;c++)b[c]&&f.isFunction(b[c].promise)?b[c].promise().then(i(c),g.reject):--e;e||g.resolveWith(g,b)}else g!==a&&g.resolveWith(g,d?[a]:[]);return g.promise()}}),f.support=function(){var a=c.createElement("div"),b=c.documentElement,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r;a.setAttribute("className","t"),a.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=a.getElementsByTagName("*"),e=a.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};f=c.createElement("select"),g=f.appendChild(c.createElement("option")),h=a.getElementsByTagName("input")[0],j={leadingWhitespace:a.firstChild.nodeType===3,tbody:!a.getElementsByTagName("tbody").length,htmlSerialize:!!a.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55$/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:h.value==="on",optSelected:g.selected,getSetAttribute:a.className!=="t",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0},h.checked=!0,j.noCloneChecked=h.cloneNode(!0).checked,f.disabled=!0,j.optDisabled=!g.disabled;try{delete a.test}catch(s){j.deleteExpando=!1}!a.addEventListener&&a.attachEvent&&a.fireEvent&&(a.attachEvent("onclick",function b(){j.noCloneEvent=!1,a.detachEvent("onclick",b)}),a.cloneNode(!0).fireEvent("onclick")),h=c.createElement("input"),h.value="t",h.setAttribute("type","radio"),j.radioValue=h.value==="t",h.setAttribute("checked","checked"),a.appendChild(h),k=c.createDocumentFragment(),k.appendChild(a.firstChild),j.checkClone=k.cloneNode(!0).cloneNode(!0).lastChild.checked,a.innerHTML="",a.style.width=a.style.paddingLeft="1px",l=c.createElement("body"),m={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"};for(q in m)l.style[q]=m[q];l.appendChild(a),b.insertBefore(l,b.firstChild),j.appendChecked=h.checked,j.boxModel=a.offsetWidth===2,"zoom"in a.style&&(a.style.display="inline",a.style.zoom=1,j.inlineBlockNeedsLayout=a.offsetWidth===2,a.style.display="",a.innerHTML="<div style='width:4px;'></div>",j.shrinkWrapBlocks=a.offsetWidth!==2),a.innerHTML="<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>",n=a.getElementsByTagName("td"),r=n[0].offsetHeight===0,n[0].style.display="",n[1].style.display="none",j.reliableHiddenOffsets=r&&n[0].offsetHeight===0,a.innerHTML="",c.defaultView&&c.defaultView.getComputedStyle&&(i=c.createElement("div"),i.style.width="0",i.style.marginRight="0",a.appendChild(i),j.reliableMarginRight=(parseInt((c.defaultView.getComputedStyle(i,null)||{marginRight:0}).marginRight,10)||0)===0),l.innerHTML="",b.removeChild(l);if(a.attachEvent)for(q in{submit:1,change:1,focusin:1})p="on"+q,r=p in a,r||(a.setAttribute(p,"return;"),r=typeof a[p]=="function"),j[q+"Bubbles"]=r;return j}(),f.boxModel=f.support.boxModel;var i=/^(?:\{.*\}|\[.*\])$/,j=/([a-z])([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!l(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g=f.expando,h=typeof c=="string",i,j=a.nodeType,k=j?f.cache:a,l=j?a[f.expando]:a[f.expando]&&f.expando;if((!l||e&&l&&!k[l][g])&&h&&d===b)return;l||(j?a[f.expando]=l=++f.uuid:l=f.expando),k[l]||(k[l]={},j||(k[l].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?k[l][g]=f.extend(k[l][g],c):k[l]=f.extend(k[l],c);i=k[l],e&&(i[g]||(i[g]={}),i=i[g]),d!==b&&(i[f.camelCase(c)]=d);if(c==="events"&&!i[c])return i[g]&&i[g].events;return h?i[f.camelCase(c)]:i}},removeData:function(b,c,d){if(!!f.acceptData(b)){var e=f.expando,g=b.nodeType,h=g?f.cache:b,i=g?b[f.expando]:f.expando;if(!h[i])return;if(c){var j=d?h[i][e]:h[i];if(j){delete j[c];if(!l(j))return}}if(d){delete h[i][e];if(!l(h[i]))return}var k=h[i][e];f.support.deleteExpando||h!=a?delete h[i]:h[i]=null,k?(h[i]={},g||(h[i].toJSON=f.noop),h[i][e]=k):g&&(f.support.deleteExpando?delete b[f.expando]:b.removeAttribute?b.removeAttribute(f.expando):b[f.expando]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d=null;if(typeof a=="undefined"){if(this.length){d=f.data(this[0]);if(this[0].nodeType===1){var e=this[0].attributes,g;for(var h=0,i=e.length;h<i;h++)g=e[h].name,g.indexOf("data-")===0&&(g=f.camelCase(g.substring(5)),k(this[0],g,d[g]))}}return d}if(typeof a=="object")return this.each(function(){f.data(this,a)});var j=a.split(".");j[1]=j[1]?"."+j[1]:"";if(c===b){d=this.triggerHandler("getData"+j[1]+"!",[j[0]]),d===b&&this.length&&(d=f.data(this[0],a),d=k(this[0],a,d));return d===b&&j[1]?this.data(j[0]):d}return this.each(function(){var b=f(this),d=[j[0],c];b.triggerHandler("setData"+j[1]+"!",d),f.data(this,a,c),b.triggerHandler("changeData"+j[1]+"!",d)})},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,c){a&&(c=(c||"fx")+"mark",f.data(a,c,(f.data(a,c,b,!0)||0)+1,!0))},_unmark:function(a,c,d){a!==!0&&(d=c,c=a,a=!1);if(c){d=d||"fx";var e=d+"mark",g=a?0:(f.data(c,e,b,!0)||1)-1;g?f.data(c,e,g,!0):(f.removeData(c,e,!0),m(c,d,"mark"))}},queue:function(a,c,d){if(a){c=(c||"fx")+"queue";var e=f.data(a,c,b,!0);d&&(!e||f.isArray(d)?e=f.data(a,c,f.makeArray(d),!0):e.push(d));return e||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e;d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),d.call(a,function(){f.dequeue(a,b)})),c.length||(f.removeData(a,b+"queue",!0),m(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){typeof a!="string"&&(c=a,a="fx");if(c===b)return f.queue(this[0],a);return this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(){var c=this;setTimeout(function(){f.dequeue(c,b)},a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f._Deferred(),!0))h++,l.done(m);m();return d.promise()}});var n=/[\n\t\r]/g,o=/\s+/,p=/\r/g,q=/^(?:button|input)$/i,r=/^(?:button|input|object|select|textarea)$/i,s=/^a(?:rea)?$/i,t=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,u=/\:/,v,w;f.fn.extend({attr:function(a,b){return f.access(this,a,b,!0,f.attr)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,a,b,!0,f.prop)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){if(f.isFunction(a))return this.each(function(b){var c=f(this);c.addClass(a.call(this,b,c.attr("class")||""))});if(a&&typeof a=="string"){var b=(a||"").split(o);for(var c=0,d=this.length;c<d;c++){var e=this[c];if(e.nodeType===1)if(!e.className)e.className=a;else{var g=" "+e.className+" ",h=e.className;for(var i=0,j=b.length;i<j;i++)g.indexOf(" "+b[i]+" ")<0&&(h+=" "+b[i]);e.className=f.trim(h)}}}return this},removeClass:function(a){if(f.isFunction(a))return this.each(function(b){var c=f(this);c.removeClass(a.call(this,b,c.attr("class")))});if(a&&typeof a=="string"||a===b){var c=(a||"").split(o);for(var d=0,e=this.length;d<e;d++){var g=this[d];if(g.nodeType===1&&g.className)if(a){var h=(" "+g.className+" ").replace(n," ");for(var i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){var d=f(this);d.toggleClass(a.call(this,c,d.attr("class"),b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(o);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ";for(var c=0,d=this.length;c<d;c++)if((" "+this[c].className+" ").replace(n," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e=this[0];if(!arguments.length){if(e){c=f.valHooks[e.nodeName.toLowerCase()]||f.valHooks[e.type];if(c&&"get"in c&&(d=c.get(e,"value"))!==b)return d;return(e.value||"").replace(p,"")}return b}var g=f.isFunction(a);return this.each(function(d){var e=f(this),h;if(this.nodeType===1){g?h=a.call(this,d,e.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.nodeName.toLowerCase()]||f.valHooks[this.type];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c=a.selectedIndex,d=[],e=a.options,g=a.type==="select-one";if(c<0)return null;for(var h=g?c:0,i=g?c+1:e.length;h<i;h++){var j=e[h];if(j.selected&&(f.support.optDisabled?!j.disabled:j.getAttribute("disabled")===null)&&(!j.parentNode.disabled||!f.nodeName(j.parentNode,"optgroup"))){b=f(j).val();if(g)return b;d.push(b)}}if(g&&!d.length&&e.length)return f(e[c]).val();return d},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attrFix:{tabindex:"tabIndex"},attr:function(a,c,d,e){var g=a.nodeType;if(!a||g===3||g===8||g===2)return b;if(e&&c in f.attrFn)return f(a)[c](d);if(!("getAttribute"in a))return f.prop(a,c,d);var h,i,j=g!==1||!f.isXMLDoc(a);c=j&&f.attrFix[c]||c,i=f.attrHooks[c],i||(!t.test(c)||typeof d!="boolean"&&d!==b&&d.toLowerCase()!==c.toLowerCase()?v&&(f.nodeName(a,"form")||u.test(c))&&(i=v):i=w);if(d!==b){if(d===null){f.removeAttr(a,c);return b}if(i&&"set"in i&&j&&(h=i.set(a,d,c))!==b)return h;a.setAttribute(c,""+d);return d}if(i&&"get"in i&&j)return i.get(a,c);h=a.getAttribute(c);return h===null?b:h},removeAttr:function(a,b){var c;a.nodeType===1&&(b=f.attrFix[b]||b,f.support.getSetAttribute?a.removeAttribute(b):(f.attr(a,b,""),a.removeAttributeNode(a.getAttributeNode(b))),t.test(b)&&(c=f.propFix[b]||b)in a&&(a[c]=!1))},attrHooks:{type:{set:function(a,b){if(q.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},tabIndex:{get:function(a){var c=a.getAttributeNode("tabIndex");return c&&c.specified?parseInt(c.value,10):r.test(a.nodeName)||s.test(a.nodeName)&&a.href?0:b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e=a.nodeType;if(!a||e===3||e===8||e===2)return b;var g,h,i=e!==1||!f.isXMLDoc(a);c=i&&f.propFix[c]||c,h=f.propHooks[c];return d!==b?h&&"set"in h&&(g=h.set(a,d,c))!==b?g:a[c]=d:h&&"get"in h&&(g=h.get(a,c))!==b?g:a[c]},propHooks:{}}),w={get:function(a,c){return a[f.propFix[c]||c]?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=b),a.setAttribute(c,c.toLowerCase()));return c}},f.attrHooks.value={get:function(a,b){if(v&&f.nodeName(a,"button"))return v.get(a,b);return a.value},set:function(a,b,c){if(v&&f.nodeName(a,"button"))return v.set(a,b,c);a.value=b}},f.support.getSetAttribute||(f.attrFix=f.propFix,v=f.attrHooks.name=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&d.nodeValue!==""?d.nodeValue:b},set:function(a,b,c){var d=a.getAttributeNode(c);if(d){d.nodeValue=b;return b}}},f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})})),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex)}})),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var x=Object.prototype.hasOwnProperty,y=/\.(.*)$/,z=/^(?:textarea|input|select)$/i,A=/\./g,B=/ /g,C=/[^\w\s.|`]/g,D=function(a){return a.replace(C,"\\$&")};f.event={add:function(a,c,d,e){if(a.nodeType!==3&&a.nodeType!==8){if(d===!1)d=E;else if(!d)return;var g,h;d.handler&&(g=d,d=g.handler),d.guid||(d.guid=f.guid++);var i=f._data(a);if(!i)return;var j=i.events,k=i.handle;j||(i.events=j={}),k||(i.handle=k=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.handle.apply(k.elem,arguments):b}),k.elem=a,c=c.split(" ");var l,m=0,n;while(l=c[m++]){h=g?f.extend({},g):{handler:d,data:e},l.indexOf(".")>-1?(n=l.split("."),l=n.shift(),h.namespace=n.slice(0).sort().join(".")):(n=[],h.namespace=""),h.type=l,h.guid||(h.guid=d.guid);var o=j[l],p=f.event.special[l]||{};if(!o){o=j[l]=[];if(!p.setup||p.setup.call(a,e,n,k)===!1)a.addEventListener?a.addEventListener(l,k,!1):a.attachEvent&&a.attachEvent("on"+l,k)}p.add&&(p.add.call(a,h),h.handler.guid||(h.handler.guid=d.guid)),o.push(h),f.event.global[l]=!0}a=null}},global:{},remove:function(a,c,d,e){if(a.nodeType!==3&&a.nodeType!==8){d===!1&&(d=E);var g,h,i,j,k=0,l,m,n,o,p,q,r,s=f.hasData(a)&&f._data(a),t=s&&s.events;if(!s||!t)return;c&&c.type&&(d=c.handler,c=c.type);if(!c||typeof c=="string"&&c.charAt(0)==="."){c=c||"";for(h in t)f.event.remove(a,h+c);return}c=c.split(" ");while(h=c[k++]){r=h,q=null,l=h.indexOf(".")<0,m=[],l||(m=h.split("."),h=m.shift(),n=new RegExp("(^|\\.)"+f.map(m.slice(0).sort(),D).join("\\.(?:.*\\.)?")+"(\\.|$)")),p=t[h];if(!p)continue;if(!d){for(j=0;j<p.length;j++){q=p[j];if(l||n.test(q.namespace))f.event.remove(a,r,q.handler,j),p.splice(j--,1)}continue}o=f.event.special[h]||{};for(j=e||0;j<p.length;j++){q=p[j];if(d.guid===q.guid){if(l||n.test(q.namespace))e==null&&p.splice(j--,1),o.remove&&o.remove.call(a,q);if(e!=null)break}}if(p.length===0||e!=null&&p.length===1)(!o.teardown||o.teardown.call(a,m)===!1)&&f.removeEvent(a,h,s.handle),g=null,delete t[h]}if(f.isEmptyObject(t)){var u=s.handle;u&&(u.elem=null),delete s.events,delete s.handle,f.isEmptyObject(s)&&f.removeData(a,b,!0)}}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){var h=c.type||c,i=[],j;h.indexOf("!")>=0&&(h=h.slice(0,-1),j=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if(!!e&&!f.event.customEvent[h]||!!f.event.global[h]){c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.exclusive=j,c.namespace=i.join("."),c.namespace_re=new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)");if(g||!e)c.preventDefault(),c.stopPropagation();if(!e){f.each(f.cache,function(){var a=f.expando,b=this[a];b&&b.events&&b.events[h]&&f.event.trigger(c,d,b.handle.elem
)});return}if(e.nodeType===3||e.nodeType===8)return;c.result=b,c.target=e,d=d?f.makeArray(d):[],d.unshift(c);var k=e,l=h.indexOf(":")<0?"on"+h:"";do{var m=f._data(k,"handle");c.currentTarget=k,m&&m.apply(k,d),l&&f.acceptData(k)&&k[l]&&k[l].apply(k,d)===!1&&(c.result=!1,c.preventDefault()),k=k.parentNode||k.ownerDocument||k===c.target.ownerDocument&&a}while(k&&!c.isPropagationStopped());if(!c.isDefaultPrevented()){var n,o=f.event.special[h]||{};if((!o._default||o._default.call(e.ownerDocument,c)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)){try{l&&e[h]&&(n=e[l],n&&(e[l]=null),f.event.triggered=h,e[h]())}catch(p){}n&&(e[l]=n),f.event.triggered=b}}return c.result}},handle:function(c){c=f.event.fix(c||a.event);var d=((f._data(this,"events")||{})[c.type]||[]).slice(0),e=!c.exclusive&&!c.namespace,g=Array.prototype.slice.call(arguments,0);g[0]=c,c.currentTarget=this;for(var h=0,i=d.length;h<i;h++){var j=d[h];if(e||c.namespace_re.test(j.namespace)){c.handler=j.handler,c.data=j.data,c.handleObj=j;var k=j.handler.apply(this,g);k!==b&&(c.result=k,k===!1&&(c.preventDefault(),c.stopPropagation()));if(c.isImmediatePropagationStopped())break}}return c.result},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(a){if(a[f.expando])return a;var d=a;a=f.Event(d);for(var e=this.props.length,g;e;)g=this.props[--e],a[g]=d[g];a.target||(a.target=a.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),!a.relatedTarget&&a.fromElement&&(a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement);if(a.pageX==null&&a.clientX!=null){var h=a.target.ownerDocument||c,i=h.documentElement,j=h.body;a.pageX=a.clientX+(i&&i.scrollLeft||j&&j.scrollLeft||0)-(i&&i.clientLeft||j&&j.clientLeft||0),a.pageY=a.clientY+(i&&i.scrollTop||j&&j.scrollTop||0)-(i&&i.clientTop||j&&j.clientTop||0)}a.which==null&&(a.charCode!=null||a.keyCode!=null)&&(a.which=a.charCode!=null?a.charCode:a.keyCode),!a.metaKey&&a.ctrlKey&&(a.metaKey=a.ctrlKey),!a.which&&a.button!==b&&(a.which=a.button&1?1:a.button&2?3:a.button&4?2:0);return a},guid:1e8,proxy:f.proxy,special:{ready:{setup:f.bindReady,teardown:f.noop},live:{add:function(a){f.event.add(this,O(a.origType,a.selector),f.extend({},a,{handler:N,guid:a.handler.guid}))},remove:function(a){f.event.remove(this,O(a.origType,a.selector),a)}},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}}},f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!this.preventDefault)return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?F:E):this.type=a,b&&f.extend(this,b),this.timeStamp=f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=F;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=F;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=F,this.stopPropagation()},isDefaultPrevented:E,isPropagationStopped:E,isImmediatePropagationStopped:E};var G=function(a){var b=a.relatedTarget;a.type=a.data;try{if(b&&b!==c&&!b.parentNode)return;while(b&&b!==this)b=b.parentNode;b!==this&&f.event.handle.apply(this,arguments)}catch(d){}},H=function(a){a.type=a.data,f.event.handle.apply(this,arguments)};f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={setup:function(c){f.event.add(this,b,c&&c.selector?H:G,a)},teardown:function(a){f.event.remove(this,b,a&&a.selector?H:G)}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(a,b){if(!f.nodeName(this,"form"))f.event.add(this,"click.specialSubmit",function(a){var b=a.target,c=b.type;(c==="submit"||c==="image")&&f(b).closest("form").length&&L("submit",this,arguments)}),f.event.add(this,"keypress.specialSubmit",function(a){var b=a.target,c=b.type;(c==="text"||c==="password")&&f(b).closest("form").length&&a.keyCode===13&&L("submit",this,arguments)});else return!1},teardown:function(a){f.event.remove(this,".specialSubmit")}});if(!f.support.changeBubbles){var I,J=function(a){var b=a.type,c=a.value;b==="radio"||b==="checkbox"?c=a.checked:b==="select-multiple"?c=a.selectedIndex>-1?f.map(a.options,function(a){return a.selected}).join("-"):"":f.nodeName(a,"select")&&(c=a.selectedIndex);return c},K=function(c){var d=c.target,e,g;if(!!z.test(d.nodeName)&&!d.readOnly){e=f._data(d,"_change_data"),g=J(d),(c.type!=="focusout"||d.type!=="radio")&&f._data(d,"_change_data",g);if(e===b||g===e)return;if(e!=null||g)c.type="change",c.liveFired=b,f.event.trigger(c,arguments[1],d)}};f.event.special.change={filters:{focusout:K,beforedeactivate:K,click:function(a){var b=a.target,c=f.nodeName(b,"input")?b.type:"";(c==="radio"||c==="checkbox"||f.nodeName(b,"select"))&&K.call(this,a)},keydown:function(a){var b=a.target,c=f.nodeName(b,"input")?b.type:"";(a.keyCode===13&&!f.nodeName(b,"textarea")||a.keyCode===32&&(c==="checkbox"||c==="radio")||c==="select-multiple")&&K.call(this,a)},beforeactivate:function(a){var b=a.target;f._data(b,"_change_data",J(b))}},setup:function(a,b){if(this.type==="file")return!1;for(var c in I)f.event.add(this,c+".specialChange",I[c]);return z.test(this.nodeName)},teardown:function(a){f.event.remove(this,".specialChange");return z.test(this.nodeName)}},I=f.event.special.change.filters,I.focus=I.beforeactivate}f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){function e(a){var c=f.event.fix(a);c.type=b,c.originalEvent={},f.event.trigger(c,null,c.target),c.isDefaultPrevented()&&a.preventDefault()}var d=0;f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.each(["bind","one"],function(a,c){f.fn[c]=function(a,d,e){var g;if(typeof a=="object"){for(var h in a)this[c](h,d,a[h],e);return this}if(arguments.length===2||d===!1)e=d,d=b;c==="one"?(g=function(a){f(this).unbind(a,g);return e.apply(this,arguments)},g.guid=e.guid||f.guid++):g=e;if(a==="unload"&&c!=="one")this.one(a,d,e);else for(var i=0,j=this.length;i<j;i++)f.event.add(this[i],a,g,d);return this}}),f.fn.extend({unbind:function(a,b){if(typeof a=="object"&&!a.preventDefault)for(var c in a)this.unbind(c,a[c]);else for(var d=0,e=this.length;d<e;d++)f.event.remove(this[d],a,b);return this},delegate:function(a,b,c,d){return this.live(b,c,d,a)},undelegate:function(a,b,c){return arguments.length===0?this.unbind("live"):this.die(b,null,c,a)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f.data(this,"lastToggle"+a.guid)||0)%d;f.data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});var M={focus:"focusin",blur:"focusout",mouseenter:"mouseover",mouseleave:"mouseout"};f.each(["live","die"],function(a,c){f.fn[c]=function(a,d,e,g){var h,i=0,j,k,l,m=g||this.selector,n=g?this:f(this.context);if(typeof a=="object"&&!a.preventDefault){for(var o in a)n[c](o,d,a[o],m);return this}if(c==="die"&&!a&&g&&g.charAt(0)==="."){n.unbind(g);return this}if(d===!1||f.isFunction(d))e=d||E,d=b;a=(a||"").split(" ");while((h=a[i++])!=null){j=y.exec(h),k="",j&&(k=j[0],h=h.replace(y,""));if(h==="hover"){a.push("mouseenter"+k,"mouseleave"+k);continue}l=h,M[h]?(a.push(M[h]+k),h=h+k):h=(M[h]||h)+k;if(c==="live")for(var p=0,q=n.length;p<q;p++)f.event.add(n[p],"live."+O(h,m),{data:d,selector:m,handler:e,origType:h,origHandler:e,preType:l});else n.unbind("live."+O(h,m),e)}return this}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.bind(b,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0)}),function(){function u(a,b,c,d,e,f){for(var g=0,h=d.length;g<h;g++){var i=d[g];if(i){var j=!1;i=i[a];while(i){if(i.sizcache===c){j=d[i.sizset];break}if(i.nodeType===1){f||(i.sizcache=c,i.sizset=g);if(typeof b!="string"){if(i===b){j=!0;break}}else if(k.filter(b,[i]).length>0){j=i;break}}i=i[a]}d[g]=j}}}function t(a,b,c,d,e,f){for(var g=0,h=d.length;g<h;g++){var i=d[g];if(i){var j=!1;i=i[a];while(i){if(i.sizcache===c){j=d[i.sizset];break}i.nodeType===1&&!f&&(i.sizcache=c,i.sizset=g);if(i.nodeName.toLowerCase()===b){j=i;break}i=i[a]}d[g]=j}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d=0,e=Object.prototype.toString,g=!1,h=!0,i=/\\/g,j=/\W/;[0,0].sort(function(){h=!1;return 0});var k=function(b,d,f,g){f=f||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return f;var i,j,n,o,q,r,s,t,u=!0,w=k.isXML(d),x=[],y=b;do{a.exec(""),i=a.exec(y);if(i){y=i[3],x.push(i[1]);if(i[2]){o=i[3];break}}}while(i);if(x.length>1&&m.exec(b))if(x.length===2&&l.relative[x[0]])j=v(x[0]+x[1],d);else{j=l.relative[x[0]]?[d]:k(x.shift(),d);while(x.length)b=x.shift(),l.relative[b]&&(b+=x.shift()),j=v(b,j)}else{!g&&x.length>1&&d.nodeType===9&&!w&&l.match.ID.test(x[0])&&!l.match.ID.test(x[x.length-1])&&(q=k.find(x.shift(),d,w),d=q.expr?k.filter(q.expr,q.set)[0]:q.set[0]);if(d){q=g?{expr:x.pop(),set:p(g)}:k.find(x.pop(),x.length===1&&(x[0]==="~"||x[0]==="+")&&d.parentNode?d.parentNode:d,w),j=q.expr?k.filter(q.expr,q.set):q.set,x.length>0?n=p(j):u=!1;while(x.length)r=x.pop(),s=r,l.relative[r]?s=x.pop():r="",s==null&&(s=d),l.relative[r](n,s,w)}else n=x=[]}n||(n=j),n||k.error(r||b);if(e.call(n)==="[object Array]")if(!u)f.push.apply(f,n);else if(d&&d.nodeType===1)for(t=0;n[t]!=null;t++)n[t]&&(n[t]===!0||n[t].nodeType===1&&k.contains(d,n[t]))&&f.push(j[t]);else for(t=0;n[t]!=null;t++)n[t]&&n[t].nodeType===1&&f.push(j[t]);else p(n,f);o&&(k(o,h,f,g),k.uniqueSort(f));return f};k.uniqueSort=function(a){if(r){g=h,a.sort(r);if(g)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},k.matches=function(a,b){return k(a,null,null,b)},k.matchesSelector=function(a,b){return k(b,null,null,[a]).length>0},k.find=function(a,b,c){var d;if(!a)return[];for(var e=0,f=l.order.length;e<f;e++){var g,h=l.order[e];if(g=l.leftMatch[h].exec(a)){var j=g[1];g.splice(1,1);if(j.substr(j.length-1)!=="\\"){g[1]=(g[1]||"").replace(i,""),d=l.find[h](g,b,c);if(d!=null){a=a.replace(l.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},k.filter=function(a,c,d,e){var f,g,h=a,i=[],j=c,m=c&&c[0]&&k.isXML(c[0]);while(a&&c.length){for(var n in l.filter)if((f=l.leftMatch[n].exec(a))!=null&&f[2]){var o,p,q=l.filter[n],r=f[1];g=!1,f.splice(1,1);if(r.substr(r.length-1)==="\\")continue;j===i&&(i=[]);if(l.preFilter[n]){f=l.preFilter[n](f,j,d,i,e,m);if(!f)g=o=!0;else if(f===!0)continue}if(f)for(var s=0;(p=j[s])!=null;s++)if(p){o=q(p,f,s,j);var t=e^!!o;d&&o!=null?t?g=!0:j[s]=!1:t&&(i.push(p),g=!0)}if(o!==b){d||(j=i),a=a.replace(l.match[n],"");if(!g)return[];break}}if(a===h)if(g==null)k.error(a);else break;h=a}return j},k.error=function(a){throw"Syntax error, unrecognized expression: "+a};var l=k.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!j.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&k.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!j.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&k.filter(b,a,!0)}},"":function(a,b,c){var e,f=d++,g=u;typeof b=="string"&&!j.test(b)&&(b=b.toLowerCase(),e=b,g=t),g("parentNode",b,f,a,e,c)},"~":function(a,b,c){var e,f=d++,g=u;typeof b=="string"&&!j.test(b)&&(b=b.toLowerCase(),e=b,g=t),g("previousSibling",b,f,a,e,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(i,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(i,"")},TAG:function(a,b){return a[1].replace(i,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||k.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&k.error(a[0]);a[0]=d++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(i,"");!f&&l.attrMap[g]&&(a[1]=l.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(i,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=k(b[3],null,null,c);else{var g=k.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(l.match.POS.test(b[0])||l.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!k(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=l.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||k.getText([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}k.error(e)},CHILD:function(a,b){var c=b[1],d=a;switch(c){case"only":case"first":while(d=d.previousSibling)if(d.nodeType===1)return!1;if(c==="first")return!0;d=a;case"last":while(d=d.nextSibling)if(d.nodeType===1)return!1;return!0;case"nth":var e=b[2],f=b[3];if(e===1&&f===0)return!0;var g=b[0],h=a.parentNode;if(h&&(h.sizcache!==g||!a.nodeIndex)){var i=0;for(d=h.firstChild;d;d=d.nextSibling)d.nodeType===1&&(d.nodeIndex=++i);h.sizcache=g}var j=a.nodeIndex-f;return e===0?j===0:j%e===0&&j/e>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=l.attrHandle[c]?l.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=l.setFilters[e];if(f)return f(a,c,b,d)}}},m=l.match.POS,n=function(a,b){return"\\"+(b-0+1)};for(var o in l.match)l.match[o]=new RegExp(l.match[o].source+/(?![^\[]*\])(?![^\(]*\))/.source),l.leftMatch[o]=new RegExp(/(^(?:.|\r|\n)*?)/.source+l.match[o].source.replace(/\\(\d+)/g,n));var p=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(q){p=function(a,b){var c=0,d=b||[];if(e.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var f=a.length;c<f;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var r,s;c.documentElement.compareDocumentPosition?r=function(a,b){if(a===b){g=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(r=function(a,b){if(a===b){g=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],h=a.parentNode,i=b.parentNode,j=h;if(h===i)return s(a,b);if(!h)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return s(e[k],f[k]);return k===c?s(a,f[k],-1):s(e[k],b,1)},s=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),k.getText=function(a){var b="",c;for(var d=0;a[d];d++)c=a[d],c.nodeType===3||c.nodeType===4?b+=c.nodeValue:c.nodeType!==8&&(b+=k.getText(c.childNodes));return b},function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(l.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},l.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(l.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(l.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=k,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){k=function(b,e,f,g){e=e||c;if(!g&&!k.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return p(e.getElementsByTagName(b),f);if(h[2]&&l.find.CLASS&&e.getElementsByClassName)return p(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return p([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return p([],f);if(i.id===h[3])return p([i],f)}try{return p(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var m=e,n=e.getAttribute("id"),o=n||d,q=e.parentNode,r=/^\s*[+~]/.test(b);n?o=o.replace(/'/g,"\\$&"):e.setAttribute("id",o),r&&q&&(e=e.parentNode);try{if(!r||q)return p(e.querySelectorAll("[id='"+o+"'] "+b),f)}catch(s){}finally{n||m.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)k[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}k.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!k.isXML(a))try{if(e||!l.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return k(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;l.order.splice(1,0,"CLASS"),l.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?k.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?k.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:k.contains=function(){return!1},k.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var v=function(a,b){var c,d=[],e="",f=b.nodeType?[b]:b;while(c=l.match.PSEUDO.exec(a))e+=c[0],a=a.replace(l.match.PSEUDO,"");a=l.relative[a]?a+"*":a;for(var g=0,h=f.length;g<h;g++)k(a,f[g],d);return k.filter(e,d)};f.find=k,f.expr=k.selectors,f.expr[":"]=f.expr.filters,f.unique=k.uniqueSort,f.text=k.getText,f.isXMLDoc=k.isXML,f.contains=k.contains}();var P=/Until$/,Q=/^(?:parents|prevUntil|prevAll)/,R=/,/,S=/^.[^:#\[\.,]*$/,T=Array.prototype.slice,U=f.expr.match.POS,V={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(X(this,a,!1),"not",a)},filter:function(a){return this.pushStack(X(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h,i,j={},k=1;if(g&&a.length){for(d=0,e=a.length;d<e;d++)i=a[d],j[i]||(j[i]=U.test(i)?f(i,b||this.context):i);while(g&&g.ownerDocument&&g!==b){for(i in j)h=j[i],(h.jquery?h.index(g)>-1:f(g).is(h))&&c.push({selector:i,elem:g,level:k});g=g.parentNode,k++}}return c}var l=U.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(l?l.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a||typeof a=="string")return f.inArray(this[0],a?f(a):this.parent().children());return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(W(c[0])||W(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling(a.parentNode.firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c),g=T.call(arguments);P.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!V[a]?f.unique(e):e,(this.length>1||R.test(d))&&Q.test(a)&&(e=e.reverse());return this.pushStack(e,a,g.join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var Y=/ jQuery\d+="(?:\d+|null)"/g,Z=/^\s+/,$=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,_=/<([\w:]+)/,ba=/<tbody/i,bb=/<|&#?\w+;/,bc=/<(?:script|object|embed|option|style)/i,bd=/checked\s*(?:[^=]|=\s*.checked.)/i,be=/\/(java|ecma)script/i,bf=/^\s*<!(?:\[CDATA\[|\-\-)/,bg={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};bg.optgroup=bg.option,bg.tbody=bg.tfoot=bg.colgroup=bg.caption=bg.thead,bg.th=bg.td,f.support.htmlSerialize||(bg._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){if(f.isFunction(a))return this.each(function(b){var c=f(this);c.text(a.call(this,b,c.text()))});if(typeof a!="object"&&a!==b)return this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a));return f.text(this)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){return this.each(function(){f(this).wrapAll(a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f(arguments[0]);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f(arguments[0]).toArray());return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){if(a===b)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(Y,""):null;if(typeof a=="string"&&!bc.test(a)&&(f.support.leadingWhitespace||!Z.test(a))&&!bg[(_.exec(a)||["",""])[1].toLowerCase()]){a=a.replace($,"<$1></$2>");try{for(var c=0,d=this.length;c<d;c++)this[c].nodeType===1&&(f.cleanData(this[c].getElementsByTagName("*")),this[c].innerHTML=a)}catch(e){this.empty().append(a)}}else f.isFunction(a)?this.each(function(b){var c=f(this);c.html(a.call(this,b,c.html()))}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bd.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bh(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,bn)}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i=b&&b[0]?b[0].ownerDocument||b[0]:c;a.length===1&&typeof a[0]=="string"&&a[0].length<512&&i===c&&a[0].charAt(0)==="<"&&!bc.test(a[0])&&(f.support.checkClone||!bd.test(a[0]))&&(g=!0,h=f.fragments[a[0]],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[a[0]]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d=a.cloneNode(!0),e,g,h;if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bj(a,d),e=bk(a),g=bk(d);for(h=0;e[h];++h)bj(e[h],g[h])}if(b){bi(a,d);if(c){e=bk(a),g=bk(d);for(h=0;e[h];++h)bi(e[h],g[h])}}return d},clean:function(a,b,d,e){var g;b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||
b[0]&&b[0].ownerDocument||c);var h=[],i;for(var j=0,k;(k=a[j])!=null;j++){typeof k=="number"&&(k+="");if(!k)continue;if(typeof k=="string")if(!bb.test(k))k=b.createTextNode(k);else{k=k.replace($,"<$1></$2>");var l=(_.exec(k)||["",""])[1].toLowerCase(),m=bg[l]||bg._default,n=m[0],o=b.createElement("div");o.innerHTML=m[1]+k+m[2];while(n--)o=o.lastChild;if(!f.support.tbody){var p=ba.test(k),q=l==="table"&&!p?o.firstChild&&o.firstChild.childNodes:m[1]==="<table>"&&!p?o.childNodes:[];for(i=q.length-1;i>=0;--i)f.nodeName(q[i],"tbody")&&!q[i].childNodes.length&&q[i].parentNode.removeChild(q[i])}!f.support.leadingWhitespace&&Z.test(k)&&o.insertBefore(b.createTextNode(Z.exec(k)[0]),o.firstChild),k=o.childNodes}var r;if(!f.support.appendChecked)if(k[0]&&typeof (r=k.length)=="number")for(i=0;i<r;i++)bm(k[i]);else bm(k);k.nodeType?h.push(k):h=f.merge(h,k)}if(d){g=function(a){return!a.type||be.test(a.type)};for(j=0;h[j];j++)if(e&&f.nodeName(h[j],"script")&&(!h[j].type||h[j].type.toLowerCase()==="text/javascript"))e.push(h[j].parentNode?h[j].parentNode.removeChild(h[j]):h[j]);else{if(h[j].nodeType===1){var s=f.grep(h[j].getElementsByTagName("script"),g);h.splice.apply(h,[j+1,0].concat(s))}d.appendChild(h[j])}}return h},cleanData:function(a){var b,c,d=f.cache,e=f.expando,g=f.event.special,h=f.support.deleteExpando;for(var i=0,j;(j=a[i])!=null;i++){if(j.nodeName&&f.noData[j.nodeName.toLowerCase()])continue;c=j[f.expando];if(c){b=d[c]&&d[c][e];if(b&&b.events){for(var k in b.events)g[k]?f.event.remove(j,k):f.removeEvent(j,k,b.handle);b.handle&&(b.handle.elem=null)}h?delete j[f.expando]:j.removeAttribute&&j.removeAttribute(f.expando),delete d[c]}}}});var bo=/alpha\([^)]*\)/i,bp=/opacity=([^)]*)/,bq=/-([a-z])/ig,br=/([A-Z]|^ms)/g,bs=/^-?\d+(?:px)?$/i,bt=/^-?\d/,bu=/^[+\-]=/,bv=/[^+\-\.\de]+/g,bw={position:"absolute",visibility:"hidden",display:"block"},bx=["Left","Right"],by=["Top","Bottom"],bz,bA,bB,bC=function(a,b){return b.toUpperCase()};f.fn.css=function(a,c){if(arguments.length===2&&c===b)return this;return f.access(this,a,c,!0,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)})},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bz(a,"opacity","opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{zIndex:!0,fontWeight:!0,opacity:!0,zoom:!0,lineHeight:!0,widows:!0,orphans:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d;if(h==="number"&&isNaN(d)||d==null)return;h==="string"&&bu.test(d)&&(d=+d.replace(bv,"")+parseFloat(f.css(a,c))),h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(bz)return bz(a,c)},swap:function(a,b,c){var d={};for(var e in b)d[e]=a.style[e],a.style[e]=b[e];c.call(a);for(e in b)a.style[e]=d[e]},camelCase:function(a){return a.replace(bq,bC)}}),f.curCSS=f.css,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){var e;if(c){a.offsetWidth!==0?e=bD(a,b,d):f.swap(a,bw,function(){e=bD(a,b,d)});if(e<=0){e=bz(a,b,b),e==="0px"&&bB&&(e=bB(a,b,b));if(e!=null)return e===""||e==="auto"?"0px":e}if(e<0||e==null){e=a.style[b];return e===""||e==="auto"?"0px":e}return typeof e=="string"?e:e+"px"}},set:function(a,b){if(!bs.test(b))return b;b=parseFloat(b);if(b>=0)return b+"px"}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return bp.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle;c.zoom=1;var e=f.isNaN(b)?"":"alpha(opacity="+b*100+")",g=d&&d.filter||c.filter||"";c.filter=bo.test(g)?g.replace(bo,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){var c;f.swap(a,{display:"inline-block"},function(){b?c=bz(a,"margin-right","marginRight"):c=a.style.marginRight});return c}})}),c.defaultView&&c.defaultView.getComputedStyle&&(bA=function(a,c){var d,e,g;c=c.replace(br,"-$1").toLowerCase();if(!(e=a.ownerDocument.defaultView))return b;if(g=e.getComputedStyle(a,null))d=g.getPropertyValue(c),d===""&&!f.contains(a.ownerDocument.documentElement,a)&&(d=f.style(a,c));return d}),c.documentElement.currentStyle&&(bB=function(a,b){var c,d=a.currentStyle&&a.currentStyle[b],e=a.runtimeStyle&&a.runtimeStyle[b],f=a.style;!bs.test(d)&&bt.test(d)&&(c=f.left,e&&(a.runtimeStyle.left=a.currentStyle.left),f.left=b==="fontSize"?"1em":d||0,d=f.pixelLeft+"px",f.left=c,e&&(a.runtimeStyle.left=e));return d===""?"auto":d}),bz=bA||bB,f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)});var bE=/%20/g,bF=/\[\]$/,bG=/\r?\n/g,bH=/#.*$/,bI=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bJ=/^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bK=/^(?:about|app|app\-storage|.+\-extension|file|widget):$/,bL=/^(?:GET|HEAD)$/,bM=/^\/\//,bN=/\?/,bO=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bP=/^(?:select|textarea)/i,bQ=/\s+/,bR=/([?&])_=[^&]*/,bS=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bT=f.fn.load,bU={},bV={},bW,bX;try{bW=e.href}catch(bY){bW=c.createElement("a"),bW.href="",bW=bW.href}bX=bS.exec(bW.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bT)return bT.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bO,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bP.test(this.nodeName)||bJ.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bG,"\r\n")}}):{name:b.name,value:c.replace(bG,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.bind(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?f.extend(!0,a,f.ajaxSettings,b):(b=a,a=f.extend(!0,f.ajaxSettings,b));for(var c in{context:1,url:1})c in b?a[c]=b[c]:c in f.ajaxSettings&&(a[c]=f.ajaxSettings[c]);return a},ajaxSettings:{url:bW,isLocal:bK.test(bX[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":"*/*"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML}},ajaxPrefilter:bZ(bU),ajaxTransport:bZ(bV),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a?4:0;var o,r,u,w=l?ca(d,v,l):b,x,y;if(a>=200&&a<300||a===304){if(d.ifModified){if(x=v.getResponseHeader("Last-Modified"))f.lastModified[k]=x;if(y=v.getResponseHeader("Etag"))f.etag[k]=y}if(a===304)c="notmodified",o=!0;else try{r=cb(d,w),c="success",o=!0}catch(z){c="parsererror",u=z}}else{u=c;if(!c||a)c="error",a<0&&(a=0)}v.status=a,v.statusText=c,o?h.resolveWith(e,[r,c,v]):h.rejectWith(e,[v,c,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.resolveWith(e,[v,c]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f._Deferred(),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bI.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.done,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bH,"").replace(bM,bX[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bQ),d.crossDomain==null&&(r=bS.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bX[1]&&r[2]==bX[2]&&(r[3]||(r[1]==="http:"?80:443))==(bX[3]||(bX[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),b$(bU,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bL.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bN.test(d.url)?"&":"?")+d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bR,"$1_="+x);d.url=y+(y===d.url?(bN.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", */*; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=b$(bV,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){status<2?w(-1,z):f.error(z)}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)b_(g,a[g],c,e);return d.join("&").replace(bE,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var cc=f.now(),cd=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+cc++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=b.contentType==="application/x-www-form-urlencoded"&&typeof b.data=="string";if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(cd.test(b.url)||e&&cd.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(cd,l),b.url===j&&(e&&(k=k.replace(cd,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var ce=a.ActiveXObject?function(){for(var a in cg)cg[a](0,1)}:!1,cf=0,cg;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ch()||ci()}:ch,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,ce&&delete cg[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n),m.text=h.responseText;try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cf,ce&&(cg||(cg={},f(a).unload(ce)),cg[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var cj={},ck,cl,cm=/^(?:toggle|show|hide)$/,cn=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,co,cp=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cq,cr=a.webkitRequestAnimationFrame||a.mozRequestAnimationFrame||a.oRequestAnimationFrame;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(cu("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),e===""&&f.css(d,"display")==="none"&&f._data(d,"olddisplay",cv(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(cu("hide",3),a,b,c);for(var d=0,e=this.length;d<e;d++)if(this[d].style){var g=f.css(this[d],"display");g!=="none"&&!f._data(this[d],"olddisplay")&&f._data(this[d],"olddisplay",g)}for(d=0;d<e;d++)this[d].style&&(this[d].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(cu("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return this[e.queue===!1?"each":"queue"](function(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]),h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(f.support.inlineBlockNeedsLayout?(j=cv(this.nodeName),j==="inline"?this.style.display="inline-block":(this.style.display="inline",this.style.zoom=1)):this.style.display="inline-block"))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)k=new f.fx(this,b,i),h=a[i],cm.test(h)?k[h==="toggle"?d?"show":"hide":h]():(l=cn.exec(h),m=k.cur(),l?(n=parseFloat(l[2]),o=l[3]||(f.cssNumber[i]?"":"px"),o!=="px"&&(f.style(this,i,(n||1)+o),m=(n||1)/k.cur()*m,f.style(this,i,m+o)),l[1]&&(n=(l[1]==="-="?-1:1)*n+m),k.custom(m,n,o)):k.custom(m,h,""));return!0})},stop:function(a,b){a&&this.queue([]),this.each(function(){var a=f.timers,c=a.length;b||f._unmark(!0,this);while(c--)a[c].elem===this&&(b&&a[c](!0),a.splice(c,1))}),b||this.dequeue();return this}}),f.each({slideDown:cu("show",1),slideUp:cu("hide",1),slideToggle:cu("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default,d.old=d.complete,d.complete=function(a){d.queue!==!1?f.dequeue(this):a!==!1&&f._unmark(this),f.isFunction(d.old)&&d.old.call(this)};return d},easing:{linear:function(a,b,c,d){return c+d*a},swing:function(a,b,c,d){return(-Math.cos(a*Math.PI)/2+.5)*d+c}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,b,c){function h(a){return d.step(a)}var d=this,e=f.fx,g;this.startTime=cq||cs(),this.start=a,this.end=b,this.unit=c||this.unit||(f.cssNumber[this.prop]?"":"px"),this.now=this.start,this.pos=this.state=0,h.elem=this.elem,h()&&f.timers.push(h)&&!co&&(cr?(co=1,g=function(){co&&(cr(g),e.tick())},cr(g)):co=setInterval(e.tick,e.interval))},show:function(){this.options.orig[this.prop]=f.style(this.elem,this.prop),this.options.show=!0,this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b=cq||cs(),c=!0,d=this.elem,e=this.options,g,h;if(a||b>=e.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),e.animatedProperties[this.prop]=!0;for(g in e.animatedProperties)e.animatedProperties[g]!==!0&&(c=!1);if(c){e.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){d.style["overflow"+b]=e.overflow[a]}),e.hide&&f(d).hide();if(e.hide||e.show)for(var i in e.animatedProperties)f.style(d,i,e.orig[i]);e.complete.call(d)}return!1}e.duration==Infinity?this.now=b:(h=b-this.startTime,this.state=h/e.duration,this.pos=f.easing[e.animatedProperties[this.prop]](this.state,h,0,1,e.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){for(var a=f.timers,b=0;b<a.length;++b)a[b]()||a.splice(b--,1);a.length||f.fx.stop()},interval:13,stop:function(){clearInterval(co),co=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=(a.prop==="width"||a.prop==="height"?Math.max(0,a.now):a.now)+a.unit:a.elem[a.prop]=a.now}}}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cw=/^t(?:able|d|h)$/i,cx=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?f.fn.offset=function(a){var b=this[0],c;if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);try{c=b.getBoundingClientRect()}catch(d){}var e=b.ownerDocument,g=e.documentElement;if(!c||!f.contains(g,b))return c?{top:c.top,left:c.left}:{top:0,left:0};var h=e.body,i=cy(e),j=g.clientTop||h.clientTop||0,k=g.clientLeft||h.clientLeft||0,l=i.pageYOffset||f.support.boxModel&&g.scrollTop||h.scrollTop,m=i.pageXOffset||f.support.boxModel&&g.scrollLeft||h.scrollLeft,n=c.top+l-j,o=c.left+m-k;return{top:n,left:o}}:f.fn.offset=function(a){var b=this[0];if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);f.offset.initialize();var c,d=b.offsetParent,e=b,g=b.ownerDocument,h=g.documentElement,i=g.body,j=g.defaultView,k=j?j.getComputedStyle(b,null):b.currentStyle,l=b.offsetTop,m=b.offsetLeft;while((b=b.parentNode)&&b!==i&&b!==h){if(f.offset.supportsFixedPosition&&k.position==="fixed")break;c=j?j.getComputedStyle(b,null):b.currentStyle,l-=b.scrollTop,m-=b.scrollLeft,b===d&&(l+=b.offsetTop,m+=b.offsetLeft,f.offset.doesNotAddBorder&&(!f.offset.doesAddBorderForTableAndCells||!cw.test(b.nodeName))&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),e=d,d=b.offsetParent),f.offset.subtractsBorderForOverflowNotVisible&&c.overflow!=="visible"&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),k=c}if(k.position==="relative"||k.position==="static")l+=i.offsetTop,m+=i.offsetLeft;f.offset.supportsFixedPosition&&k.position==="fixed"&&(l+=Math.max(h.scrollTop,i.scrollTop),m+=Math.max(h.scrollLeft,i.scrollLeft));return{top:l,left:m}},f.offset={initialize:function(){var a=c.body,b=c.createElement("div"),d,e,g,h,i=parseFloat(f.css(a,"marginTop"))||0,j="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";f.extend(b.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"}),b.innerHTML=j,a.insertBefore(b,a.firstChild),d=b.firstChild,e=d.firstChild,h=d.nextSibling.firstChild.firstChild,this.doesNotAddBorder=e.offsetTop!==5,this.doesAddBorderForTableAndCells=h.offsetTop===5,e.style.position="fixed",e.style.top="20px",this.supportsFixedPosition=e.offsetTop===20||e.offsetTop===15,e.style.position=e.style.top="",d.style.overflow="hidden",d.style.position="relative",this.subtractsBorderForOverflowNotVisible=e.offsetTop===-5,this.doesNotIncludeMarginInBodyOffset=a.offsetTop!==i,a.removeChild(b),f.offset.initialize=f.noop},bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.offset.initialize(),f.offset.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=cx.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!cx.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each(["Left","Top"],function(a,c){var d="scroll"+c;f.fn[d]=function(c){var e,g;if(c===b){e=this[0];if(!e)return null;g=cy(e);return g?"pageXOffset"in g?g[a?"pageYOffset":"pageXOffset"]:f.support.boxModel&&g.document.documentElement[d]||g.document.body[d]:e[d]}return this.each(function(){g=cy(this),g?g.scrollTo(a?f(g).scrollLeft():c,a?c:f(g).scrollTop()):this[d]=c})}}),f.each(["Height","Width"],function(a,c){var d=c.toLowerCase();f.fn["inner"+c]=function(){return this[0]?parseFloat(f.css(this[0],d,"padding")):null},f.fn["outer"+c]=function(a){return this[0]?parseFloat(f.css(this[0],d,a?"margin":"border")):null},f.fn[d]=function(a){var e=this[0];if(!e)return a==null?null:this;if(f.isFunction(a))return this.each(function(b){var c=f(this);c[d](a.call(this,b,c[d]()))});if(f.isWindow(e)){var g=e.document.documentElement["client"+c];return e.document.compatMode==="CSS1Compat"&&g||e.document.body["client"+c]||g}if(e.nodeType===9)return Math.max(e.documentElement["client"+c],e.body["scroll"+c],e.documentElement["scroll"+c],e.body["offset"+c],e.documentElement["offset"+c]);if(a===b){var h=f.css(e,d),i=parseFloat(h);return f.isNaN(i)?h:i}return this.css(d,typeof a=="string"?a:a+"px")}}),a.jQuery=a.$=f})(window);
/* Modernizr 2.0.4 (Custom Build) | MIT & BSD
 * Contains: fontface | flexbox | hsla | rgba | csscolumns | cssgradients | cssreflections | csstransforms | draganddrop | hashchange | history | indexeddb | localstorage | postmessage | sessionstorage | websqldatabase | inlinesvg | svg | svgclippaths | touch | iepp | cssclasses | prefixed | teststyles | testprop | testallprops | hasevent | prefixes | domprefixes
 */
;window.Modernizr=function(a,b,c){function E(a,b){var c=a.charAt(0).toUpperCase()+a.substr(1),d=(a+" "+o.join(c+" ")+c).split(" ");return D(d,b)}function D(a,b){for(var d in a)if(k[a[d]]!==c)return b=="pfx"?a[d]:!0;return!1}function C(a,b){return!!~(""+a).indexOf(b)}function B(a,b){return typeof a===b}function A(a,b){return z(n.join(a+";")+(b||""))}function z(a){k.cssText=a}var d="2.0.4",e={},f=!0,g=b.documentElement,h=b.head||b.getElementsByTagName("head")[0],i="modernizr",j=b.createElement(i),k=j.style,l,m=Object.prototype.toString,n=" -webkit- -moz- -o- -ms- -khtml- ".split(" "),o="Webkit Moz O ms Khtml".split(" "),p={svg:"http://www.w3.org/2000/svg"},q={},r={},s={},t=[],u=function(a,c,d,e){var f,h,j,k=b.createElement("div");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:i+(d+1),k.appendChild(j);f=["&shy;","<style>",a,"</style>"].join(""),k.id=i,k.innerHTML+=f,g.appendChild(k),h=c(k,a),k.parentNode.removeChild(k);return!!h},v=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=B(e[d],"function"),B(e[d],c)||(e[d]=c),e.removeAttribute(d))),e=null;return f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),w,x={}.hasOwnProperty,y;!B(x,c)&&!B(x.call,c)?y=function(a,b){return x.call(a,b)}:y=function(a,b){return b in a&&B(a.constructor.prototype[b],c)};var F=function(c,d){var f=c.join(""),g=d.length;u(f,function(c,d){var f=b.styleSheets[b.styleSheets.length-1],h=f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"",i=c.childNodes,j={};while(g--)j[i[g].id]=i[g];e.touch="ontouchstart"in a||j.touch.offsetTop===9,e.fontface=/src/i.test(h)&&h.indexOf(d.split(" ")[0])===0},g,d)}(['@font-face {font-family:"font";src:url("https://")}',["@media (",n.join("touch-enabled),("),i,")","{#touch{top:9px;position:absolute}}"].join("")],["fontface","touch"]);q.flexbox=function(){function c(a,b,c,d){a.style.cssText=n.join(b+":"+c+";")+(d||"")}function a(a,b,c,d){b+=":",a.style.cssText=(b+n.join(c+";"+b)).slice(0,-b.length)+(d||"")}var d=b.createElement("div"),e=b.createElement("div");a(d,"display","box","width:42px;padding:0;"),c(e,"box-flex","1","width:10px;"),d.appendChild(e),g.appendChild(d);var f=e.offsetWidth===42;d.removeChild(e),g.removeChild(d);return f},q.touch=function(){return e.touch},q.postmessage=function(){return!!a.postMessage},q.websqldatabase=function(){var b=!!a.openDatabase;return b},q.indexedDB=function(){for(var b=-1,c=o.length;++b<c;)if(a[o[b].toLowerCase()+"IndexedDB"])return!0;return!!a.indexedDB},q.hashchange=function(){return v("hashchange",a)&&(b.documentMode===c||b.documentMode>7)},q.history=function(){return!!a.history&&!!history.pushState},q.draganddrop=function(){return v("dragstart")&&v("drop")},q.rgba=function(){z("background-color:rgba(150,255,150,.5)");return C(k.backgroundColor,"rgba")},q.hsla=function(){z("background-color:hsla(120,40%,100%,.5)");return C(k.backgroundColor,"rgba")||C(k.backgroundColor,"hsla")},q.csscolumns=function(){return E("columnCount")},q.cssgradients=function(){var a="background-image:",b="gradient(linear,left top,right bottom,from(#9f9),to(white));",c="linear-gradient(left top,#9f9, white);";z((a+n.join(b+a)+n.join(c+a)).slice(0,-a.length));return C(k.backgroundImage,"gradient")},q.cssreflections=function(){return E("boxReflect")},q.csstransforms=function(){return!!D(["transformProperty","WebkitTransform","MozTransform","OTransform","msTransform"])},q.fontface=function(){return e.fontface},q.localstorage=function(){try{return!!localStorage.getItem}catch(a){return!1}},q.sessionstorage=function(){try{return!!sessionStorage.getItem}catch(a){return!1}},q.svg=function(){return!!b.createElementNS&&!!b.createElementNS(p.svg,"svg").createSVGRect},q.inlinesvg=function(){var a=b.createElement("div");a.innerHTML="<svg/>";return(a.firstChild&&a.firstChild.namespaceURI)==p.svg},q.svgclippaths=function(){return!!b.createElementNS&&/SVG/.test(m.call(b.createElementNS(p.svg,"clipPath")))};for(var G in q)y(q,G)&&(w=G.toLowerCase(),e[w]=q[G](),t.push((e[w]?"":"no-")+w));z(""),j=l=null,a.attachEvent&&function(){var a=b.createElement("div");a.innerHTML="<elem></elem>";return a.childNodes.length!==1}()&&function(a,b){function s(a){var b=-1;while(++b<g)a.createElement(f[b])}a.iepp=a.iepp||{};var d=a.iepp,e=d.html5elements||"abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",f=e.split("|"),g=f.length,h=new RegExp("(^|\\s)("+e+")","gi"),i=new RegExp("<(/*)("+e+")","gi"),j=/^\s*[\{\}]\s*$/,k=new RegExp("(^|[^\\n]*?\\s)("+e+")([^\\n]*)({[\\n\\w\\W]*?})","gi"),l=b.createDocumentFragment(),m=b.documentElement,n=m.firstChild,o=b.createElement("body"),p=b.createElement("style"),q=/print|all/,r;d.getCSS=function(a,b){if(a+""===c)return"";var e=-1,f=a.length,g,h=[];while(++e<f){g=a[e];if(g.disabled)continue;b=g.media||b,q.test(b)&&h.push(d.getCSS(g.imports,b),g.cssText),b="all"}return h.join("")},d.parseCSS=function(a){var b=[],c;while((c=k.exec(a))!=null)b.push(((j.exec(c[1])?"\n":c[1])+c[2]+c[3]).replace(h,"$1.iepp_$2")+c[4]);return b.join("\n")},d.writeHTML=function(){var a=-1;r=r||b.body;while(++a<g){var c=b.getElementsByTagName(f[a]),d=c.length,e=-1;while(++e<d)c[e].className.indexOf("iepp_")<0&&(c[e].className+=" iepp_"+f[a])}l.appendChild(r),m.appendChild(o),o.className=r.className,o.id=r.id,o.innerHTML=r.innerHTML.replace(i,"<$1font")},d._beforePrint=function(){p.styleSheet.cssText=d.parseCSS(d.getCSS(b.styleSheets,"all")),d.writeHTML()},d.restoreHTML=function(){o.innerHTML="",m.removeChild(o),m.appendChild(r)},d._afterPrint=function(){d.restoreHTML(),p.styleSheet.cssText=""},s(b),s(l);d.disablePP||(n.insertBefore(p,n.firstChild),p.media="print",p.className="iepp-printshim",a.attachEvent("onbeforeprint",d._beforePrint),a.attachEvent("onafterprint",d._afterPrint))}(a,b),e._version=d,e._prefixes=n,e._domPrefixes=o,e.hasEvent=v,e.testProp=function(a){return D([a])},e.testAllProps=E,e.testStyles=u,e.prefixed=function(a){return E(a,"pfx")},g.className=g.className.replace(/\bno-js\b/,"")+(f?" js "+t.join(" "):"");return e}(this,this.document);/** @see https://sites.google.com/a/van-steenbeek.net/archive/explorer_domparser_parsefromstring */
if (typeof DOMParser === 'undefined') {
  DOMParser = function () {};
  
  DOMParser.prototype.parseFromString = function (str, contentType) {
    var xmldata;
    
    if (typeof ActiveXObject !== 'undefined') {
      xmldata = new ActiveXObject('MSXML.DomDocument');
      
      xmldata.async = false;
      xmldata.loadXML(str);
      
      return xmldata;
    } else if (typeof XMLHttpRequest !== 'undefined') {
      xmldata = new XMLHttpRequest();
      
      if (!contentType) {
        contentType = 'application/xml';
      }
      
      xmldata.open('GET', 'data:' + contentType + ';charset=utf-8,' + encodeURIComponent(str), false);
      
      if (xmldata.overrideMimeType) {
        xmldata.overrideMimeType(contentType);
      }
      
      xmldata.send(null);
      return xmldata.responseXML;
    }
  };
}


/*
 * Copyright (c) 2010- Felix "passcod" Saparelli
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do
 * so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */


/**
 * @namespace
 * A special character so this namespace is truly reserved.
 */
window.Ç = {
  data: {"html":"<div\nid='mask'>&nbsp;<\/div><div\nid='container'  class='fullwidth'> <header> <nav\nid='main'> <span\nid='links'> <a\nid='button-home' href=\"http:\/\/www.mangareader.net\"><img\nalt='Home' title='Home' \/><\/a> <a\nid='button-info'><img\nalt='Info' title='Info' \/><\/a> <a\nid='button-options'><img\nalt='Options' title='Options' \/><\/a> <a\nid='button-permalink'><img\nalt='Permalink' title='Permalink' \/><\/a> <a\nid='button-hotkeys'><img\nalt='Hotkeys' title='Hotkeys' \/><\/a> <\/span> <span\nstyle='float: right;'> <span\nid='status'>Ready<\/span> <a\nid='button-previous'><img\nalt=\"Previous\" title=\"Previous\" \/><\/a> <a\nid='button-reload'><img\nalt=\"Reload\" title=\"Reload\" \/><\/a> <a\nid='button-next'><img\nalt=\"Next\" title=\"Next\" \/><\/a> <\/span> <\/nav> <nav\nid='options' class='has-rule'><\/nav> <nav\nid='info'> <img\nid='cover' \/><h1>Manga<\/h1><h2>Chapter<\/h2><p>Released since <date\npubdate='pubdate'><\/date> and currently <i\nid='stat'><\/i><\/p><p\nid='arthor'>Story \/ Art by<\/p><p\nid='dir'><\/p><p\nid='description'>Description<\/p><ul\nid='genre'><lh>Genres:<\/lh><\/ul> <\/nav> <nav\nid='hotkeys' class='has-rule'><p><b>A<\/b>: Previous<\/p><p><b>S<\/b>: Reload<\/p><p><b>D<\/b>: Next<\/p><p><b>I<\/b>: Info<\/p><p><b>O<\/b>: Options<\/p><p><b>H<\/b>: Hotkeys (this)<\/p> <\/nav> <\/header> <article\nclass='spaced'><ul><li><img\nclass='loading' \/>Loading...<\/li><\/ul> <\/article> <footer> <nav> Userscript by <a\nhref='http:\/\/passcod.net'>passcod<\/a> - Uses <a\nhref='http:\/\/jquery.com'>jQuery<\/a> - Works best in <a\nhref='http:\/\/www.mozilla.com\/firefox\/'>Firefox 4<\/a> - Fork me on <a\nhref='https:\/\/github.com\/passcod\/Manga-ChapterReader\/'>Github<\/a> - License: <a\nhref='http:\/\/www.opensource.org\/licenses\/mit-license.php'>MIT<\/a> - Thanks for using!\n(v. <span\nid='version'><\/span>) <\/nav> <\/footer><\/div>","css":"\nhtml,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;vertical-align:baseline;color:inherit;}\nh1,h2,h3,h4,h5,h6,p,pre,ol,ul,li{margin:0.5em 0;}\narticle,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block;}\nbody{line-height:1;}\nol,ul{list-style:none;}\nblockquote,q{quotes:none;}\nblockquote:before,blockquote:after,q:before,q:after{content:'';content:none;}\ntable{border-collapse:collapse;border-spacing:0;}\nbody{font-family:Helvetica,sans-serif;}#container{width:800px;margin:5em auto;}\nheader a{text-decoration:none;}\nheader nav{top:50px;left:auto;width:800px;border:5px solid;padding:5px;display:none;z-index:100;position:fixed;font-size:0.8em;text-align:justify;}.fullwidth header nav{min-width:500px;width:90%;left:5%;}\nnav#main{top:-36px;height:24px;line-height:24px;display:block;}\nnav#main img{vertical-align:middle;}.has-rule{column-count:2;-o-column-count:2;-moz-column-count:2;-khtml-column-count:2;-webkit-column-count:2;column-count-gap:2em;-o-column-count-gap:2em;-moz-column-count-gap:2em;-khtml-column-count-gap:2em;-webkit-column-count-gap:2em;column-rule-style:solid;-o-column-rule-style:solid;-moz-column-rule-style:solid;-khtml-column-rule-style:solid;-webkit-column-rule-style:solid;column-rule-width:1px;-o-column-rule-width:1px;-moz-column-rule-width:1px;-khtml-column-rule-width:1px;-webkit-column-rule-width:1px;}\nnav#info img#cover{float:right;height:20em;margin:1em;}\nnav#info h1:before,nav#info h2:before{font-size:80%;font-weight:normal;}\nnav#info h1:before{content:'Title: ';}\nnav#info h2:before{content:'Ch: ';}\nnav#info lh{font-weight:bold;}\nnav#options p{padding:0.5em;}\narticle{text-align:center;}\narticle ul{list-style:none;padding:0 auto;float:left;}.forced800 img{width:800px;}\nfooter nav{font-size:0.7em;margin:1em auto;text-align:center;}\ninput[type=button]{border:1px solid;background-color:transparent;}\na{color:inherit;text-decoration:underline;cursor:pointer;}\na:hover,a:focus{text-decoration:none;}\nh1{font-size:1.7em;}\nh2{font-size:1.2em;}.horizontal ul{margin:0 0 1em 0;padding:0;}.horizontal li{float:left;}.spaced li{padding:0.5em;}\ndiv#mask{background:black;opacity:0.8;display:none;width:100%;height:100%;z-index:50;position:fixed;top:0px;left:0px;}","home":"iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QAAAAAAAD5Q7t\/AAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAYAAAAGAB4TKWmAAAF6ElEQVRIx42VfYiVxxWHn5l5573v\/dhd11Wv1zSJ7q5bTTWSNBqtYjQFiykV4yqVthhITAhtodAPQqlELElDExosWGhLLTSJLTTWhaaFlGKhBqSJJBFsd7VZV6PZ73W\/730\/Z6Z\/7LphSZUMzB8znDMPZ87vnCOcc9xuFcSedcvuWrCpcueiVXUNhTLgJserg\/3XRy72X584W3OnLtzOX9wK0FS\/b8\/Wneu+tXn7hi0rWpr9Ul09UkoArLVMT03Q88Hl6K3Tb595680Lx8aqJ9\/4VAAt2isPbF728\/2P79l394pWTGZJkxTn7Dw7KSXa95EKerov8YffdLx6\/p2h76bu5MgtATmxp2VH+5qO3ft3rxXOI02Tjw0FWOtwgJKSeX65HMYlnHzl5Lun37jUnrhTH34C4Iu95a2PNP\/9K\/t2rU2iBGstQgiEEAAYYwlyGs+TTE3HaK0A5kBSSjxf0vHaqXNnT\/d+KXGvjwF4N0kr2govP7ht09rhgSHsrNNNQJoZgpym\/ZGN1JUCfvfHswwNjZHLedwMxDmHlJLNO7asv36l46fAU3MRlPxHd+w8sPFvS5eUybJs\/uOpoVQKOPj17axuuwOco29wnF+\/cpregTGCnJ6LwjmH9n0+unbFvnni\/e3VrOOMB7BkeeE7nvYZHBxACIkQAqUkcWJoaqzjyW9sY1XrMsIwBmDpkgaefuyLHP3VX+i+0k8+8LHW4pzDOUeuWJSL7vS\/DZwRAe0rWzY1nq9UFhecNSilUEoRJymVchM\/+t5+2lqWEUYfJxwg52tujE7ywtHXudB5hUI+hzEGawxCKT66em3i8rlwjfL1yp3Fsv5qFkckSUKSJIxPTFIpN3Lkhwdoba5QCxOcY97OMkOpGLD+vjYudPbQebEHazJqYY3qdJUwjYOpoeSfShfb2vONepszKcZYojhhzarl\/OTwkyy\/q0ytFs8p6eYXIARiVlmFQsCWjZ\/j2vUBLl66SpYZ0iQmMSnT4+l70gi7cGR4mOnpaZIkwRjDg+vvoWlhPWEUY60jSTOSNCUzBusc6ew5SVNqYUQQ5Hh46\/1orTAmwxiDyQxC27KH9Gy1NklamyLIFwiCgJeP\/Z4Nn1\/FA\/etouu\/H\/L8S68RRQlPP7GLhzav49Bzv6Xnah9pmnHwwJd5aMs6Xjx6grGxCaw1hGFILQqxrj7zpPIH\/Vwe7SRSylmZCrLMIATUahHvnu+kWo3Zu3srCOi+fI1\/d\/YQJynDI18AoFarMjk5CTjSNMVaECrf6wmZ6\/K1jwY8TyGVQnszBWTsjL6DXA5jbmodfnzoIHGc4JyjXG5iqhoipUJrjRAzVS0tpC7f5TlVfFup2ohWapEnDVJpPM9D+x6+r9HaQ0mFFBLPU2jfY2XLZ5ByNvHA2NgUWutZgENIiUlcL6r0vlfr\/2V\/Q\/PX\/uoFPKZsiOdpPE\/R2XUVYyx9\/SPcu7aVLDNMTUe8c66LJM3mFCUEVKshzoHv+zhrQApsojtqfb8YFc458i3fXLewOPWvvCbwpEFrnxk1CoIgYEFDHdr3SdMMYyzWWtI0JUkS4jjGGIOUApOlZAaqcTY1Gi3eEHYfuzjXTRtWP35k6QL9rBYpngSpPPL5gHw+TxAE+H4OpWbaiDGGNE2JoogwDAnDkCzLZiSdWfom1TOTXcdfnNdNQ730+fFo8N5KY91u5RICX1EqlSgWi+TzeXK5HJ7nzbZuQxzH+L4\/dxdFMZmFG9XoRJSr\/Oz\/Dhx9\/6H6Jm\/4+N0L6\/YuqCtSKGhKxRLFYoEgyKO1ngNEUUStVqU6XaUWxoyOT9Bzo\/rqqFnyVPrec9EtR6badEQ1yPHvr15ceKb5jkrjgoZ6CoU8SqlZzczkxlpHGEaMjY3T3ds73DkcvjBpG4+as8\/Oe\/CWQ18\/fPizywr2idXlhkebK+WWuiAvlBTgILOWahzanoGhD\/4zOPGnvqp3PPvH4Z5PNfQ\/YbDrpbrAM\/eUAtUaaLkEIEzdwHRsuuNUdro\/\/6B6O\/\/\/AQLYD3NQ9O1lAAAAJXRFWHRjcmVhdGUtZGF0ZQAyMDA5LTExLTI4VDE3OjE4OjI4LTA3OjAwMZGyLAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxMC0wMi0yMVQyMzo1OTozOS0wNzowMPXm7hcAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTAtMDEtMTFUMDg6NDU6MjgtMDc6MDDDv8TsAAAANXRFWHRMaWNlbnNlAGh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xpY2Vuc2VzL0xHUEwvMi4xLzvBtBgAAAAldEVYdG1vZGlmeS1kYXRlADIwMDktMTEtMjhUMTQ6MzI6MDQtMDc6MDAZIezXAAAAFnRFWHRTb3VyY2UAQ3J5c3RhbCBQcm9qZWN06+PkiwAAACd0RVh0U291cmNlX1VSTABodHRwOi8vZXZlcmFsZG8uY29tL2NyeXN0YWwvpZGTWwAAAABJRU5ErkJggg==","info":"iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QAAAAAAAD5Q7t\/AAAACXBIWXMAAEnSAABJ0gGoRYr4AAAACXZwQWcAAAAYAAAAGAB4TKWmAAAFYklEQVRIx3WV229cVxXGf2vvc5k5M+74Mp7Yjq9qWrexUFKqQCsHoiJaoK0qVZSqD+0LqFUrJOABQV\/ghT8AgSpFXF54g4oCD1wCtI1ECyW9IZKQOOTuxk7q8fgy9zmXvXmYY2ecmCVt7XPOXvv71rfWOnsLt9rsN7jzqae5ePJD98DBgzMj\/YXP9gXBQ57rHdBajyCijTHrcRwvtNrh3zbq9ePnrl07fWT+SON3x48R\/vyZHXDS+xK88BrNn36Z6W\/\/uXjXyMijpYH+rwRB7pPKdYtWKdeKdP0tiLWJjePNqNM5V601fr9UWXv1xMK\/L91\/zwHzwfcP7UKgn4Tkt8y+\/MbU3WOjL5aGis\/pTHYsVkqMtVjA2HSTdDcqEbS1SBTX6tX6n5ZWV3\/49lvH3x3YO2EqP3uqC7uF\/+nwLG778MTc5Ph3RodLz5MNiiFIiokSKOWE0T5FYqCT0CUFrKP8jOfNBo433V8cPr\/w4T+XuPTGTQL1tV\/ROXYuNzc1+cJYqfQ8mUx\/ZG+mzgLjdyie3O9zZNoh4wgfbRpC01ViAatEea477ipd8AtD781+6ZubV14\/igIwy1dkbGTPodLg4LMqkx3qBd+yPXnhnqJib5\/i3mFN3hdsj58BEkf7uXz+iyODxSdOX7vibyvIP\/z1wv694y8Vh4pfiLTSt6FbUEooBoIInLyRcLacEJmdXWIBUSqjDb4Y\/rHUKKw65B5nrNA\/3Z\/ve9Bqx7W7RK8EPq5bfnMmpM8Xyg1LM7I7W3CLRIHje3OFXP4+rP2vQ+Mj+oNgn+f7E0YJ3MLgKNg\/rBm\/Q2130XBgObWSUOvcHo0FxNEDvufPDd73QMZh+n7te96Y1rpvl+DRCu4uauYnHHKeoAQurRvOryWs1C2OErTqqrwpWXlau+PF\/qHAYWpGi6gcItrukp8ogb9fjQljyyP7XPKeYLGUG5almsHVQtYR8p6QcbpEFgEh8B3Hdeg0jTE2NsZanUrc7gwL7dhyciXGChyecsl7YAy0E2jGoBNLI7LUQqHPE\/p8QRlLYmxsjDGKs68l7SgqtzpJOzKQGAgTqHUsKw3Dcs2wkhbVbLML0nMM2DSQSqvrv9FKkiiJy5utWsvh0Mu23m5errXCclVnB2MgNhAmltiwfUTszN5u1er6hTEkmIaJwvNLK4tNxetfpVKvXmy2Gqei0NjNTldyZHbCdM8fu\/38\/8wVcJNwsdlq\/Et\/76VYAZTXyh9v1Db+4ETNiq927tYCnyhpDk865P3uWjEQHppxmBlQO3wFyJJEUafx5o2N8pl4v3SPioGhPXG5Wvlrs77xl8BEoe4J0VEwP+nwmSmXMIb1tkWJ8MidLnPDeoeaQGGdsHVyvbr26uVT72wAOADrP3oMPv+D5Xw2f3Tc9Sby+aH5umiV2G6q3lqMubxhbsv3hUqyXZtACdmoebVeqxxdvH71feK63VJ10w6\/6N31qSceHhuZ+a5XGH6gqTw3tLB1H9xqCnBEyIqxXrt2qVpZfuXCwju\/KP\/yW+vbKe5NN4vve2sX361Ebu6q72WyOdcb8h03UEqLEkEhaBEcETwlBGLJRs1qsnH9gxvnT\/xk4diP\/7j55iv1LZG9CgTwgADIAkHm3s9NjB58\/MGhybn5YGB01s30DSrH80DEmjg2YavWqa1eqd64cOL6f46\/vfrer8\/RqdeAVjraQNJL4KbgWyOD0jm3tG8wN3lgb1CcHvWCQkGUUnGn0WivLa80rp1eai6fWUmBOylwM507gOmtwRaJD2TS2U+VuWlD6NTPADEQpaPTQ9BJvyW3Fzm9y1Mg9xZwla5v3ZImBYmAsIfM0POP\/g\/eMmZ7SAp1ggAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxMC0wMS0xMVQwODo1OTo0NC0wNzowMGifIO0AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTAtMDEtMTFUMDg6NTk6NDQtMDc6MDAZwphRAAAAM3RFWHRMaWNlbnNlAGh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xpY2Vuc2VzL2J5LzMuMC9W9\/ocAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAABp0RVh0U291cmNlAFRhbmdvIGhhcm0tb24taWNvbnMFMQKyAAAASnRFWHRTb3VyY2VfVVJMAGh0dHA6Ly9nbm9tZS1sb29rLm9yZy9jb250ZW50L3Nob3cucGhwL1RhbmdvK21pbmU\/Y29udGVudD03NjMxNo7adTkAAAAASUVORK5CYII=","options":"iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QAAAAAAAD5Q7t\/AAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAYAAAAGAB4TKWmAAAFXUlEQVRIx52VeWxUVRSHv\/fe7NNOZ+syVFrKEkAFa5ECLQUFW0TUaKkLAxjUGMWKCwETiBVNXBK1asU1akCsSwzFBdwJFYgG0aGWCqXFCi20087QlqHTdjoz713\/0GIpKugvubk3J797vpxzT3Klx9Y9CkBhUREPrFiBTqfDu8TL2NFjGJR36VKGa9mttxHXNKLRmDQYy86+RAz3yX\/u1wECuJz\/pjV5+dOa82dO0\/Lzp38CjDwLUPtzDbU\/1yRlX3oJb7\/3bjXgPY\/Eo4CXSkvvfnL27FkjR2dlEY1E5ljMpnBjwyGGLmXihAkA+5t+bRpRWFQ0xeVOXtjXF37G6XDGBrMtLC6m6qOPhgIKNm+pet5qNnGovp4NGzfuNZkto7sDgcRINPoGsGXQqBty6a4HS+9teOqZp8v3+fb1gjAC0dPvsOiMd8iw2WxomkZKSjKXTp6c2xuJjnWneQ6njqBlqHEoAOC56ZMnN+72+bbu8\/kGQEiqqoKmYrVahvrSFEUhEomgNxhwJadh6e8\/PG3GDKqqPqz4NwDAtmtnz5y3defur\/b5fAKQAB4yW3hVOT0kWeFwmOfLX6DN387ah9dwsqubo0eO3N7uPxH5uykarq+vmZWXn5MzhaFtymoboKz2CgZU5+LGugZKbr6F9IwsTCYLTreb6uqdMvD++QAAvn\/q8SdKp+bm6oHgYFA0i+MVLXPZ0Rih5Ug9kXh8x\/r1L71YWfl+OfDWWWN6jnF8peLZ8qUFswvc8dhAV1NruLX2xOL0Pgys\/sDG+te3r+psO\/YmcD+w6u8SnAsAUPlewZX3uNaVOe5bNGVERNao3TkXAsE5aWlS+fCWDJc0ae0uANyuJPRaFyYDOIxGkuwWQjGFmh4dBZsru9fY6+y69Awko5ET27ezo80v5QQCqEAIsJplZB3YPUnY0pPOv4L2FtHjq\/3BvnfPT7Ru\/xJzfj62Cy4gQ68Th1NTLee6\/6+Ao8dFd2DXrwl7cl9mz9RVhHsi7F6+HOPFk8i7\/Q6Mstx7KDW18n8BjrSK8N7dbXZ6Ehk\/P5ON19\/L47qLEvSSvPz7TZswFxQwr6wMCRbvd7lEU6LTfd6Ao8dE23ff+q39jX2M8k7HrGgEPqm5xmlK6E3t63utR9NOfLNsGea8PG6qqMCtKHSoInjY7Mw5J6ClRdTX\/RL2dNWFSL1xDiM9cKDa95qcKX026BkXDCaHVJU9JSUYs7PxbthIsqIQUIWvWZfg\/kfAsWbxmd9vntDl68R+1SwmXWyitvqXloRR0vJBT1soRLeqckrTbvCHw9QUF6MfNxbvpndwKwqBzmiwVbZIZwGON4snksfkXG2wJpNclE\/2VBf13\/2Ge5SUCZC4YQbbOr7gepdtsIqPg6r6eVcoRF1xMYYxo\/G++RYmScJ\/sFtLlJ0kys4\/AB1HhTsqOdbu9fX8YM30tEwv9PDboTB+v5rbHjIhXpl5RhsXuOzMd9jJCgYXHI\/FtkRPnaKhpARdZgYLyh5hnGcEHYppHgAphSsxTXgwxb3soLjsg1hXaVNcpK4ICMkxc5ENSJLBboEkm4LVYcHosiG77OCwg90BFjt3JiR4v0lPFz+NHy+ifr\/o2bpNBOfmEJybg5RSuBKA3gMHNqfMX7dQUaO0frq6Suv6cY0RUiSZRMmEWegUQ1wxSnFZRwxZ1TQGEFI\/UXGSOMcy46dWv+7xrLxw4kSW7Np1VZasfAX8BZA7DtK+\/8vxCgg9dBohSQUzElZNwSRk9EJvUFRZT0ySY6hiAEQETepHNvTq+04GBMIhoHuJ0XT6Txj+4TQogOGPcyf\/QUZZRmjCH0c7I\/47i74i\/auRPicAAAAldEVYdGNyZWF0ZS1kYXRlADIwMDktMTEtMjhUMTc6MTg6MjgtMDc6MDAxkbIsAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDEwLTAyLTIwVDIzOjI2OjE1LTA3OjAwBjtcgQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxMC0wMS0xMVQwODo0NToxNi0wNzowMB0PuFIAAAA1dEVYdExpY2Vuc2UAaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvTEdQTC8yLjEvO8G0GAAAACV0RVh0bW9kaWZ5LWRhdGUAMjAwOS0xMS0yOFQxNDozMjoxNC0wNzowMNWL7EkAAAAWdEVYdFNvdXJjZQBDcnlzdGFsIFByb2plY3Tr4+SLAAAAJ3RFWHRTb3VyY2VfVVJMAGh0dHA6Ly9ldmVyYWxkby5jb20vY3J5c3RhbC+lkZNbAAAAAElFTkSuQmCC","permalink":"iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QAAAAAAAD5Q7t\/AAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAYAAAAGAB4TKWmAAAGdElEQVRIx42WW4yVVxmGn\/Wv9R\/2ec\/ee4Y5FgaGQzmJUEEcS6qYVmyw4YYLRW28UFvTC72wTbzppQWjTdqYNiYiVZqGHgxtbZAiEClj6BSYYZQKM8NhYI7MPsw+\/fvf\/8mLpk0pbfVNVvJ9F+t78r7J+rJEGIZ8lsTX\/7zMtIyHsynz\/nTM7JGasOqO1yhWmhPVevNI03FfCE\/sucLnSHwawNxx6O6IqT\/7pZUt9\/WvyWmL2+MkIxKAsu1xdbrG4OUCl26Ug7li42itaj8Wnvje2P8FEDte+35vzvz9Q\/1dxrZ1OUCQjCmU1ABwvYCa7TFTchj8T56\/DU5Td3GqTfFD5\/WdL34SoH282fvK6CMxnQNb1+aMrlyUFV1J0nGDYtWjVHUpVl0qdQ\/HB1OXPPxAL\/1rW6nUHXPj0tjBpw9f+cFnAo4N57c\/\/vy5361ekiabNAlCOHUxj+eH1Js+NwsNposOswtNehdFWdWT4O9Dt8ikLB7c0kmx4nJyaHb\/mcsL990RUQjaxkdPnB+9WVz\/5TWt9HXGSUR1TF3DNCTduQjVho\/t+Gxekeb0xTyaJgiCANcL2fO1Ho6eneHd0QWqtn\/+0C83b9Ig\/MjBW+cK3x4anV2fSUXwfFiwPQpVl\/mKy2TeQUqNBze1sakvzdDVMgGCUtVjquAwXXAYeL\/AdMHhzYGblKrOF48OF7\/1oQN1ecaJvvbO1B4lJVJp1Joh8xUPsxFgGYqOtM6itElve4xaM2DsjM10wYYQXM\/nRw8sYd+ro9y8VSNfquH5GQ4PTH23O2cdX9sVsdUfTxWS742V+pNRRTpuEosq3ADiAjpbDB7a2snQ1TL5qke14TMx38DzQ5peyM929rLv1XGmiw6OG5KImMxXfIbGy\/3H\/lVKrO2K2Orc9Xq8UnfbLEORS+o4rs+yjhj3rMyRiil+\/fp1DCUAQXfOIpMwmVtw+MWuxTz71jUqjk9r2iLTGeXUUJ1aw8MPRebsFdsCUFFDaoYhNVdAe4vF0z9ex4ETk\/xlcI6li2LEIwopNTQhsAzFjo2t1BoeL\/9zjnozJJsyMTW4Pl1BCtCkREgpK66mAahk0nLjcau5slUYU3mbPb8ZQihJIqLjeCGxiIGSAiEEXTmLHRuyjExUOXahQCKq03A85soOjuMjhaCjLY5p6k5rS9QDUNm0VentyVwbOT+2QmiSTEaQaVFYpkJISSqm44egCUhGdY5cKFKqefgIlJKIpo8IQwLfJ50waW2JEY9Hb8Yjpg2gulrNsgzTb18Y0VcoEeB7HxxNE5iG5K5Wi1RUZ8PiGIfPFRmZbNAWl+hKIqWPH4S4jkcYhiztSdOdM+ntSb+9vDNWBtB+3h9pLu7M\/mFZXzdSSjQBnufjuR5SE2xfk2bbqiR\/HSkToGEZilozJGJo1OtNmg2PqCnZsCzFmrt7iMRiOCq9f+dq5QIogJ9uEecuDDuHnPbs7ka5gh\/Ars1tJKI6Lw3M0fA1TFMShuA0PTIRjdW9MTTP5ZYBjYagszNL0y7TqHsH9+5uH7ljm2Y2PNG367FH3\/vGKisV+h5HhvJoSuIGGpalY+gfuDM0+MryOPevS\/PiP6Y4enaW7o4UphWlurBw6+Azz91TufjMxEcvGUCk+gUt94Zv7n\/5T4lHdv8kCEMVCEkYaEQsnUzCIJswiJka+YrLpekGTTdPvubzhdVduD4MDV5sDhwffK5ai3t3blM9LjBU29yN6fILvz1wsl4u11Yu72Dd8izf6W9j29osne0JHGliRExQOoWmpKUty0KpyskjpyvH3zh5pDRftLH0VpH6qrjNAfZMSBjOo6v5Yr409dLzr5ze\/s0tK7feu75zshHThZIkUzqpFDiOR6PhMTtbYvjMpea7AyMT4+9f+7cf+NNIOU8QFMKFd8LbAGFtOBR9j98ATgmlNE1K\/8LQmLtQqk6uWr04t6R3UTqXTVpCIIqlWjA5mbfHx6aKV0YnZ+fninlNV3N+kxEITxM4Mx+PSH1YhGNPNcSyJ4aFps1LqV2xLH2Nrqu7bNvJVCp2NBaPGEpXwnFc37Gbjga1aNScj0bN67btjLiuP0LIbDi+z\/tUAEA4\/isXuLaof++klPK0EKJDaqJDaiKrlIwZhq6siOlaEaNqmvq8aepThmXOKF0thGNP3jb4c38Vn9RTb0yIVDquKV2JWs0Oi\/lK8OTuvv99EfgvGOj0IBElYNMAAAAldEVYdGNyZWF0ZS1kYXRlADIwMDktMTEtMjhUMTc6MTg6MjgtMDc6MDAxkbIsAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDEwLTAyLTIwVDIzOjI0OjIzLTA3OjAw75G+ZQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxMC0wMS0xMVQwODo0NTowNS0wNzowMOBNolEAAAA1dEVYdExpY2Vuc2UAaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvTEdQTC8yLjEvO8G0GAAAACV0RVh0bW9kaWZ5LWRhdGUAMjAwNi0xMC0wOVQwODoyMTowMi0wNjowMJ5tG4gAAAAWdEVYdFNvdXJjZQBDcnlzdGFsIFByb2plY3Tr4+SLAAAAJ3RFWHRTb3VyY2VfVVJMAGh0dHA6Ly9ldmVyYWxkby5jb20vY3J5c3RhbC+lkZNbAAAAAElFTkSuQmCC","hotkeys":"iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QAAAAAAAD5Q7t\/AAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAYAAAAGAB4TKWmAAADQklEQVRIx52Vz28bVRDHPzPvbRK7UEUoCRFtIoGlIhHaG9Bw4IcQtBeuQIm4l1SV+AdQVfUI3BD9D0AQkMgNJKhKqVCAcimVU1EqG4ljSOvaTu21900Pu2s7jRWcjPRs79t5853vfGeehcwunD9H8ZEiASNJEvZjzjkUYavR4MNzFwDw+cutRlMKBwrHEF4DHt0XAtTN7Mfa3dp1wLYBTD0x8+yhQ4cvzs\/PHY+iSPYTPY5jq1ara4acBq5vA5goFJYXFp5ZnJqaZut+AxFBGA3HgG63g\/djMjP9+OKl+g\/LwOltAJg9FY1FxHGLYuEA3W6CSAYgDIUy6\/\/23hNCwJzS6Xaf7O33nU0FIQmBuNOhHbfTwINMHkIRhGABzBgfm8DM6HQ7AJr76MNZOXUYhqjgVNF8OcWp6y0LRq1WQwARxcxQ0R1MdwAAqAgqgqiikoO4PpgqV376matXrqYMNV1DY+3cEiQPKgMMRFBVvPdsbGywXl7n6LGjRFHU8x2mlB98MEAEVBUJaWBBUrEzPRr1BtXKP5RKJQBCSEujogRJsN0AIBN1x1Lyhrp27Q++XvmGkCSsfLnC2Q\/O8vwLz\/V8GRlA029V3dZJCwsLzM7OAvDxR5+w9ssaiy8eB9sTQFoaFe09qwjBjEqlwuVLl9nc3OTWX7colUr9DhoVQHO6WeapwI57d+7w2acXeeXVl1l6b2lA04Ezo3RRelCQTFgGANvtFs1mkxt\/3uC3X3\/P5qD38X8MLMuiL2rKIrXJyUneP7PM6rer1Gr3eHfpFPPzc5gxILLtBkCWdeZnkJ3GMFSVkydP8MaJ19N7x4wQAiEkfSa7lUgQ4jjGe4\/3Ppte15vovMYq2TWSDaJ3Ec554jjOu82GMTDvI0SEdqvF+PhEOp3D7zlMwGXpWQi02vcRVbyPMDPJkg85gANqTh3Oezbv\/keSdNmLOeeYPPgYzjk6ne4WUAQaOYBWK9XVcrn80pGnj8x49Xj1o0fPNGs2m9xcL2\/cXF\/\/Lq9OzlynZ6am3jn19ltzc4ffFOTgntJPI1kIoXH779vff\/H5V6v1ev1foDVYWpfRKg7rrhHMgADEQBNoD9Mu39vXnz795u7ZA1TeG7N06sg2AAAAJXRFWHRjcmVhdGUtZGF0ZQAyMDA5LTExLTEwVDE5OjM4OjIwLTA3OjAwgH2N8QAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxMC0wMi0yMFQyMzoyNjoxOS0wNzowMMGbNvUAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTAtMDEtMTFUMDg6NTY6MzktMDc6MDCD26sFAAAAMnRFWHRMaWNlbnNlAGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvUHVibGljX2RvbWFpbj\/96s8AAAAldEVYdG1vZGlmeS1kYXRlADIwMDktMTEtMTBUMTk6Mzg6MjAtMDc6MDDfzPvFAAAAGXRFWHRTb3VyY2UAVGFuZ28gSWNvbiBMaWJyYXJ5VM\/tggAAADp0RVh0U291cmNlX1VSTABodHRwOi8vdGFuZ28uZnJlZWRlc2t0b3Aub3JnL1RhbmdvX0ljb25fTGlicmFyebzIrdYAAAAASUVORK5CYII=","previous":"iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QAAAAAAAD5Q7t\/AAAACXBIWXMAAAN2AAADdgF91YLMAAAACXZwQWcAAAAYAAAAGAB4TKWmAAADLElEQVRIx62UTWicRRjHf8\/MvB+7mzdLNhtBm5gPSFbRnNQGiumhUENRchCJHsRbK9aPi1DFj0spVsSDeBIUUXrwIkguXsVQRUEvobemeBBBW8Nu3M+878w7HvZgtBvNJv5hLjPz\/H\/8n+EZ4ag6A1SACeC924\/VoY1XgMeAbxDaqNp8beC1wwFqILFAi2rxkeKF1QdXPzodnh4bdNUMbf4M4MDf8vPjx8bfOHX81JpyqrPx48ZFoH60BGeAHsIOy5OTkx+snFx5eumhpfjaL9fyzc1NOVqCR4EWkdLqibnpudeXjy\/fOzM9QztrY50FPbjsYIBVoEc1HAvPL8wtvLj0wFJ1rDpGvVtHvJDpDOLDANZgpJzQ+rU5X6qUXqvN1tYW71ss6qKm3qljvUWJwhoLhWEBjwN1VCtrnihXyhdrs7WTczNzOtUpnV4HJw6HwyiDDeyQCZ4C\/iCWqnpyfKTy6vzU\/D3ViSpN28R6S65yrLI4cQQ6wIU5hMMAPONBJXhhIpl4fqo6NRHFEY1eA+ccLnA4019WLJGO+gkOClBrSqaO3X0hSIOXCiqO0zSl2+riIoePPV48XntycnKdk5ucPMghOCAgSRIWpxfNjZ9uyPWtLVxoUWWFGlX4EY8rOnzR44seYtBKgwjaGBz2vwGra6t+\/cv1y53dXlvfqZ6TnlR3\/S74PRUh\/UctAhHoyCBq8Mzetntl5QrO57\/bdno5K7hXfFVdl7L0B8nQb0W0B5AAocDAOd7nq2i\/34KAbt7IPsl8dtbHsmEKYW6M+TsoBikJEipkH8L+f9HHQEnlQcF8jeOc1uazSBd6kUR\/tQtAg9KCyGArzb\/pB09+1cEJ2XY2vYooHwbx\/SYyBWssmP4j6+2g42\/6D913WePgCfbq3RyUvplt9y51d7ov62awNdIZRbc0NECsAjNsi\/6pdxxS1l23mX7a3Gmdy+vybWln1Mc7MSoTRB8VAPi3HCTk3KW+arebZ9OG\/bzUTtKKSXQpNn5QjR4GAMAmkDn0QuFW1upspLjWHUnht6nxZP3nL+q9of321Zug3o44\/\/2zlGbhkjz8\/3kPoz8BIksl1CgqNG8AAAAldEVYdGNyZWF0ZS1kYXRlADIwMDktMTEtMTVUMTc6MDI6MzctMDc6MDCHD5SPAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDEwLTAyLTIwVDIzOjI2OjE1LTA3OjAwBjtcgQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxMC0wMS0xMVQwOToyNjo1MS0wNzowMIL2IOMAAABndEVYdExpY2Vuc2UAaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvYnktc2EvMy4wLyBvciBodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9MR1BMLzIuMS9bjzxjAAAAJXRFWHRtb2RpZnktZGF0ZQAyMDA5LTAzLTE5VDEwOjUyOjQ4LTA2OjAwJlq4SwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAATdEVYdFNvdXJjZQBPeHlnZW4gSWNvbnPsGK7oAAAAJ3RFWHRTb3VyY2VfVVJMAGh0dHA6Ly93d3cub3h5Z2VuLWljb25zLm9yZy\/vN6rLAAAAAElFTkSuQmCC","reload":"iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QAAAAAAAD5Q7t\/AAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAYAAAAGAB4TKWmAAADHklEQVRIx+2UTUwUZxjH\/887y7IdZ1F3Cyjsou6WgoaoQZMNZHqpGmJWohHW7XqqorholLUx8WrTXogfsTUejHTRi\/h5IGFpDQcT04tJpW3aJiXVphnGdf1AhF3HwOI+HjroBkaoFw+N\/8s78zzv8\/89z5t3Bniv\/71o2rsA4AKgALC9hU8WQAbACIDcmwASAE9VVZVn9ZpVRyRBgWx20jmXs73APvoil7v108DtI3f+vJMEoAN4MZXP79Lt8\/lK6uoDiW2RUFG5p5wEEYgIRAKCCCTMlQRIEAQJEGj+kK6vj3fGAxPGxDpN054DeGgFUDZuauhobAwWLXQtpM4z8Wwqdb9grgm8Fd5sW1u0INq2p8jpdB499e3pXZaASCSiZNKZwOKyMjofPz\/eGNx0csOGhr\/nAiS+T1R2nv3uQKw9Zs88ywQikYjS3d2NGYDm5mb3xcsXZJtNwpCuF5rmCSK6NxugtrZ2ub9y2SEhCWQyGfmzbdvd+QAx9SDLsgAAIaTXN8DavBDAUgAfAZAHBgay+XXFxcX2\/M2vJhBCsLnO1rCsqurmxeWlFwDgyqVrpVMJyayTJInzC165ud3uiXnzZENAoKJiyXh\/\/3Wf2eWH5hanqqqba1auiHfFz0EIgWAwWFL\/Sf1av98\/LkiCoiiGy+WasARUV1ePlZV7\/kgmk7yz5fPCvh8SX4TCTX+Fwk2PANhUVW2sWbkifvzYCUd2MguHwwFZcfxWX1fXFYsdLNT0IfZ6vL97vd4nlrMz8wJN0w7ubm1J3\/zxRk679w+nHiY5FG5iAAiFm\/h+Kslj6VEeHnnMI0+H+enYCI+OjfIvv\/6ca92zK63reoyZF+T70jTI2sHBwU+7zsW3px6kPjaMZx8AwOWLV229vb0d1\/v79n\/15dd2EoT2WDsMw4BTcRqlixYN7tixs7vSX3mTiG7Neq+Z2c\/MW5m5hZlbmTloxit6eno69u2Pjg8PP+JwJMRmvoWZtzCzz8pvxg+NiO4CuGsR15j5G2bm6N7oYTN8lYisz9zqiP6LmLkEQAP+\/R4uEVH6bT3e693qJWSlLt3iHKSdAAAAJXRFWHRjcmVhdGUtZGF0ZQAyMDA5LTExLTE1VDIzOjA0OjI4LTA3OjAwDCvb8gAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxMC0wMS0xMVQwOToxMDoyOC0wNzowMPgKwtMAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTAtMDEtMTFUMDk6MTA6MjgtMDc6MDCJV3pvAAAANHRFWHRMaWNlbnNlAGh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xpY2Vuc2VzL0dQTC8yLjAvbGoGqAAAACV0RVh0bW9kaWZ5LWRhdGUAMjAwOS0xMS0xNVQyMzowNDoyOC0wNzowMFOarcYAAAAXdEVYdFNvdXJjZQBHTk9NRSBJY29uIFRoZW1lwfkmaQAAACB0RVh0U291cmNlX1VSTABodHRwOi8vYXJ0Lmdub21lLm9yZy8y5JF5AAAAAElFTkSuQmCC","next":"iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QAAAAAAAD5Q7t\/AAAACXBIWXMAAAN2AAADdgF91YLMAAAACXZwQWcAAAAYAAAAGAB4TKWmAAADKElEQVRIx7WSTW9bRRSGn5n7gT9b58aNFWiUFoXGJTQgoSoNldo9v8A\/AbHkB4BEEVAhUVhRsUWqKEiIJUisQGxYgaClTZMUIS9onNqJXd+PmbkzLJwFgjpx0\/JKs5lz9D5z3jMe4\/Q6cAKYAzY4tOTYylPADpJvgVcPD\/DGVo7ywtKppY8aZxuFrZ+21lgl586TBJxgdeXllXeiqehiW7cDHesbPE\/M2pMCnOT0QnOhdeHchZK1dqU77D6TJMnNaDXqJscTJp1mPGCBxbn5udb8\/DyNRiMoF8pneru95c69zgY92pzBsf44gCWas3Ozrfp0HWUVU9GUjGrRycFw8MrADvpu6G6zjOH2YQEv0Zx5eqZVm6oRqxhtNaVyiXpUryutzg\/0IMzz\/FdvxU\/cooWbjwo4S3O6Md2qVCvEJkblisxk+KFPFEVlhzs3SAezeqh+rzUb3bQ6fOhexgNWaNaO1VphNSTJE7I8Gx2T4XDUKrUg9MMXE5Ms7\/7V\/ZOv+YMW8NukgPM0K\/VqS5YFcR6jnEJZhTKKTGVooykFJVEKSie01avpYrZD7ta4gfmnjT8WEIAJDLEfY5xB5hLpJNJIyEAqiZd6eHg0So1TR4u1K85z9i6b1yYCeEFAx3XYMvewxoICkQpkLPFiDx6A7Vtc3xG6kOZzp73FuUX\/LptMBJCexBXAVA0uc6MwLaAAsdcjJEE1RPlm\/efOL5e2TefL\/\/iMjUgKRFEgjgioAEWgAISj+AiAI8LaCj9ooV8zV9Vnxprk3zZjJxBCIIpAde\/CAOnoW4R+iPFsanP3hdX6veMXn73Vvn+H9uU2kwOkRHhu1LE3p0BQoIjMvfvO6k9skn7sF8Lt9nfr8PnDffYBCKQWiOHo5VJJylmFvO82sgfqfbObXcMjNh8o9tP4JUuJSICuIEgDSv2K09vmx7SXvGm3zfdURc6HjoO0X0RCpo5ir4Q39DO1a75K+sO3q8dqtwZ2By7bA833BeQud5Gtofp6p7fbv6rS+ApCbg3e6E5kfCAgC9JNbeLrQrtv1FZ8nSk\/4S3zKN4TqAIzny7Au\/7je\/1f+hsqTGoVnM3JawAAACV0RVh0Y3JlYXRlLWRhdGUAMjAwOS0xMS0xNVQxNzowMjozNy0wNzowMIcPlI8AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTAtMDItMjBUMjM6MjY6MTUtMDc6MDAGO1yBAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDEwLTAxLTExVDA5OjI2OjQ1LTA3OjAwuhMEbgAAAGd0RVh0TGljZW5zZQBodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9ieS1zYS8zLjAvIG9yIGh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xpY2Vuc2VzL0xHUEwvMi4xL1uPPGMAAAAldEVYdG1vZGlmeS1kYXRlADIwMDktMDMtMTlUMTA6NTI6NDgtMDY6MDAmWrhLAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAABN0RVh0U291cmNlAE94eWdlbiBJY29uc+wYrugAAAAndEVYdFNvdXJjZV9VUkwAaHR0cDovL3d3dy5veHlnZW4taWNvbnMub3JnL+83qssAAAAASUVORK5CYII=","loading":"iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QAAAAAAAD5Q7t\/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAACXZwQWcAAAAYAAAAGAB4TKWmAAADGUlEQVRIx71Uz28TRxT+ZvaXnfUSKYAQ4IC64gxpACWK4JBDlCiARE9tbu05Vw6InwcQqir4I+DCkRMRJoHE4Fg2xhCiqioS2hZSkALBgPGu49ndeT1kY2ziRCFSeNLTm3k77\/u035s3wCYbW15cvXp5L+ParSAM9xORsmFAxkJVUWZJ+j+dOnXupbr8gav6zb6+I122bTPG2EbxQUSK4zhd2WzmJoC+OoHvBz22bbO3C\/MgkhuXhHHYts3S6akeAKgTEBFnjIFIoi1uwmwzvxncq3pwvQqWcIg3ETSa2ZbAH7fn1wS79mvXity79\/NwvUpTjm9Yi3XaphO0lMirujh9Yld9L3wBXdO\/kuMt\/MCHqqhYvnWu565OwBiTS43mcL1Kk5ZVt4pkcg9crwIiAgAkTAtv3szBiBlovNaMcRARGGOyiUDT1LzjOL2t5uDv539hW8d2xIxYncBKbMGrV\/9ix\/ad4PyL0kQEx3FI09R8E4EMxMh0ZvpWOj21YpK7D\/4IVdXAvgw+VFWDV\/Vw48Z1hGHY8Af1SR5Zd6Pu3hsjKSV9+PCeSqUFKpUWSEpJkw8mFsfHx9vXqv3+t2hsciypSsw15hRFQav3iXNmEBcf794bq+cCjs7h\/uH\/6pK1Yk2lUj+oBgqHuns6tljtDAAWF6uoVr36mVgsjni8DQBQ\/vyJHj\/Jl4IaDg8ODv7TiLXqs3ln8s4+nfPc4e7eDsMwWKXyecWZRMJCrVajwpNcSUjZO9Q\/9GLdPRjqH3oRCnH0UTFXFkIgkbBWgAsh8KiYK4dCHG0FvhoBA6ABiA8MHH89+3TmWL6YLfu+D9NcIjFNC77vI1\/MlmefzhwbGDj+GkA8qmtSRWkBrkduADBSqfHK7mRnVo8pJ3fvSmqW1Q4hasgVpr2JiamRc2cvPo\/qeBQZALkWgfK1Zx5kFjr3JAuarg4nTEsvzhTc+\/cnf7ty6feZCCyMomzYtyRAdIAaYgAgeJjOzO0\/cKBALPjl2bM\/fz5\/5sI0gFrkPgARRT+qW7dxLM2LDsAYHR3dGsmnR\/lNH9Y17X8eU1F8f8i4PAAAACV0RVh0Y3JlYXRlLWRhdGUAMjAwOS0xMS0xNVQyMzowNDoyNS0wNzowMG38ujIAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTAtMDEtMTFUMDk6MTA6MjAtMDc6MDDL5Yy0AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDEwLTAxLTExVDA5OjEwOjIwLTA3OjAwurg0CAAAADR0RVh0TGljZW5zZQBodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9HUEwvMi4wL2xqBqgAAAAldEVYdG1vZGlmeS1kYXRlADIwMDktMTEtMTVUMjM6MDQ6MjUtMDc6MDAyTcwGAAAAF3RFWHRTb3VyY2UAR05PTUUgSWNvbiBUaGVtZcH5JmkAAAAgdEVYdFNvdXJjZV9VUkwAaHR0cDovL2FydC5nbm9tZS5vcmcvMuSReQAAAABJRU5ErkJggg==","version":"13.11"}
};

/** chapter.js
 * Retrieves the URLs of the pages of a chapter on MR.net asyncronously.
 * Triggers the `gotchapter` event on window when the chapter is done loading.
 */

(function(window) {
	"use strict";
	
	var Chapter = function(manga, chapter) {
		var url   = "http://www.mangareader.net/"+manga+"/"+chapter+"/",
        pages = this.pages = [],
        
        mangaid,
        loaded = false,
        
        self = this;
    
    /**
     * Returns the numeric id of the current manga.
     * 
     * @return void
     */
		this.mangaid = function() {
      return mangaid;
    };
    
    /**
     * Returns the chapter number.
     * 
     * @return void
     */
		this.num = function() {
      return chapter;
    };
    
		/**
     * Starts to request each page and extract the page's image url from it.
     * The function returns immediately, and fires `gotpage` events for every
     * loaded page, and a `gotchapter` event when all the chapter's pages are
     * loaded. If the pages were already loaded, simply fires `gotchapter`.
     *
     * @param  silent  Proceed without triggering any event.
     * @return void
     */
		var get = this.get = function() {
			if (!loaded) {
				request(url+(pages.length+1), function (doc) {
					var img = $('#img', doc).attr('src');
					
					if (typeof img !== 'undefined') {
						if (typeof mangaid === 'undefined') {
							var scr = $('script:last', doc).contents().text().split("\n"),
									mid = scr.splice(0, scr.indexOf("function omvKeyPressed(e) {"))[1];
							mangaid = mid.match(/([0-9]+);/i)[1]*1;
						}
						
            $(window).trigger("gotpage", [pages.length+1, self]);
						pages.push(img);
						get();
					} else {
            $(window).trigger("gotchapter", [pages, self]);
						loaded = true;
					}
				});
			} else {
				$(window).trigger("gotchapter", [pages, self]);
			}
		};
		
    /**
     * Performs a GET request then parses the response html and passes the
     * resulting DOM Document to the callback.
     *
     * @param  url       The url to make the request to.
     * @param  callback  The callback function.
     * @return void
     */
		var request = function (/** String */ url, /** Function */ callback) {
			$.ajax({
				type: "GET",
				url: url,
				success: function(data) {
					callback(
						(new DOMParser())
							.parseFromString(data, "text/xml")
					);
				},
				error: function() {
					callback(
						(new DOMParser())
							.parseFromString("<html><head></head><body></body></html>", "text/xml")
					);
				}
			});
		};
	};
	
	window.Ç.Chapter = Chapter;
})(window);/** manga.js
 * Retrieves and holds metadata about a manga. Fires a `gotinfo` event.
 */

(function(window) {
	"use strict";
	
	var Manga = function(manga, mangaid) {
		var chapters = {},
        numbers  = [],
        info     = {id:mangaid,name:manga},
        gotinfo  = false,
        chapter  = 0,
        
        self = this;
    
    if (!gotinfo) {    
      $.getJSON('/actions/selector/?which=0&id='+mangaid, function(j) {
        
        var i, chap, name;
        for (i in j) {
          chap = j[i];
          name = chap['name'] === undefined ? "" : chap['name'];
          
          numbers.push(chap['chapter']);
          chapters[ chap['chapter'] ] = {
            'name': name,
            'data': new Ç.Chapter(manga, chap['chapter'])
          };
        }
        
        request('/'+manga, function(doc) {
          info.description = $('#readmangasum p', doc).text();
          info.cover = $('#mangaimg img', doc).attr('src');
          
          var $props = $('#mangaproperties', doc);
          info.pubdate = $('tr:eq(2) td:last', $props).text();
          info.status  = $('tr:eq(3) td:last', $props).text();
          info.author  = $('tr:eq(4) td:last', $props).text();
          info.artist  = $('tr:eq(5) td:last', $props).text();
          info.direct  = $('tr:eq(6) td:last', $props).text();
          info.genres  = $('tr:eq(7) td:last', $props).text();
          
          $(window).trigger('gotinfo');
        });
      });
      gotinfo = true;
    }
    
    /**
     * Returns the manga info.
     */
    this.info = function() { return info; };
    
    /**
     * Returns the manga chapters.
     */
    this.chapters = function() { return chapters; };
    
    /**
     * Adds an already loaded chapter to the manga.
     * 
     * @param  chap  A chapter object.
     * @return void
     */
    this.addChapter = function(/** Chapter */ chap) {
      chapters[ chap.num() ].data = chap;
    };
    
    /**
     * Returns the Chapter object for the next chapter.
     * 
     * @return {Chapter}
     */
    this.nextChapter = function() {
      console.log('Before: '+chapter);
      if (chapter < numbers.length) {
        chapter++;
      } else {
        $(window).trigger('lastchapter');
      }
      console.log('After: '+chapter);
      self.loadChapter();
    };
    
    /**
     * Returns the Chapter object for the previous chapter.
     * 
     * @return {Chapter}
     */
    this.previousChapter = function() {
      if (chapter >= 0) {
        chapter--;
      } else {
        $(window).trigger('firstchapter');
      }
      self.loadChapter();
    };
    
    /**
     * Sets the chapter.
     *
     * @param  n  The chapter number.
     * @return void
     */
    this.setChapter = function(/** Integer */ n) {
      chapter = n-1;
    };
    
    /**
     * Gets the chapter.
     *
     * @return {Integer} The chapter number.
     */
    this.getChapter = function() {
      return chapter;
    };
    
    /**
     * Triggers the loading of the desired chapter.
     *
     * @param  n  The chapter number (optional) (will default to internal pointer).
     * @return void
     */
    this.loadChapter = function(n) {
      var chn = n || chapter;
      
      chapters[numbers[chn]].data.get();
    };
    
    /**
     * Performs a GET request then parses the response html and passes the
     * resulting DOM Document to the callback. On error, the passed DOM is
     * a blank page.
     *
     * @param  url       The url to make the request to.
     * @param  callback  The callback function.
     * @return void
     */
		var request = function (/** String */ url, /** Function */ callback) {
			$.ajax({
				type: "GET",
				url: url,
				success: function(data) {
					callback(
						(new DOMParser())
							.parseFromString(data, "text/xml")
					);
				},
				error: function() {
					callback(
						(new DOMParser())
							.parseFromString("<html><head></head><body></body></html>", "text/xml")
					);
				}
			});
		};
	};
	
	window.Ç.Manga = Manga;
})(window);"use strict";

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

})(window);$(function (){
  // Disable the annoying 'skip to next page' keyboard shortcut
  function omvKeyPressed() {}
  document.onkeydown = function() {};
  
  var options = [
    {
      "name": "spacing",
      "description": "Add spacing between pages.",
      "default": true
    },
    {
      "name": "invert",
      "description": "Black theme"
      //"hotkey": 189
    },
    {
      "name": "horizontal",
      "description": "Horizontal reading. Minimum comfortable screen height 768px, recommended 1200px."
      //"hotkey": 187
    },
    {
      "name": "forced800",
      "description": "Force image width to 800. Provides a more uniform reading experience (in vertical mode), but you might want to disable it if the text is too small to read. In horizontal mode, it is better to disable it."
    },
    {
      "name": "fullwidth",
      "description": "Allows the nav/panels to extends to the full width of the screen.",
      "default": true
    }
  ];
  
  /**
   * Parses the current URL to extract information:
   * manga name, chapter number, page number
   *
   * @return {Array} Resulting info.
   */
  var parseURL = function () {
    var U = {},
      url_str = window.location.href,
      Ro = /mangareader\.net\/[0-9]+\-[0-9]+\-([0-9]+)\/([a-z0-9\-]+)\/chapter-([0-9]+)\.html?/i.exec(url_str), // Old
      Rn = /mangareader\.net\/([a-z0-9\-]+)(\/[0-9]+)?(\/[0-9]+)?/i.exec(url_str), // New
      ss = /[\/]/; // Slash-stripper

    if ( Ro !== null ) {
      U.page    = Ro[1] ? Number(Ro[1].replace(ss, '')) : null;
      U.manga   = Ro[2] ?        Ro[2].replace(ss, '')  : null;
      U.chapter = Ro[3] ? Number(Ro[3].replace(ss, '')) : null;
    } else if ( Rn !== null ) {
      U.manga   = Rn[1] ?        Rn[1].replace(ss, '')  : null;
      U.chapter = Rn[2] ? Number(Rn[2].replace(ss, '')) : null;
      U.page    = Rn[3] ? Number(Rn[3].replace(ss, '')) : null;
    } else {
      return null;
    }

    return U;
  };
  
  
  var ui    = new Ç.Ui(),
      info  = parseURL(),
      manga = -1,
      
      gotinfo = false,
      
      c = new Ç.Chapter(info.manga, info.chapter);
  
  c.get();
  
  $(window).bind("gotchapter", function(e, pages, chap) {
      if (manga == -1) {
        manga = new Ç.Manga(info.manga, c.mangaid());
        manga.setChapter(info.chapter);
      }
      
      ui.display(pages);
      
      if (ui.getOption('horizontal')) {
        var k, t = $('body').width(); $p = $('article img');
        for (k in $p) {
          t += $($p[k]).width() + 50;
        }
        $('article, article ul').width(t);
      }
      
      if (gotinfo) {
        ui.setInfo(
          null,
          manga.getChapter(),
          manga.chapters()[manga.getChapter()].name
        );
        
        ui.setStatus('');
        ui.updateURL();
      }
    })
    
    .bind("gotinfo", function(e, page) {
      manga.addChapter(c);
      gotinfo = true;
      
      try {
      ui.setInfo(
        manga.info().name,
        manga.getChapter(),
        manga.chapters()[manga.getChapter()].name,
        manga.info().artist,
        manga.info().author,
        manga.info().pubdate,
        manga.info().status,
        manga.info().direct,
        manga.info().genres,
        manga.info().description,
        manga.info().cover
      );
      } catch(ee) {}
      
      ui.setStatus('');
      ui.updateURL();
    })
    
    .bind("gotpage", function(e, page, chap) {
      ui.setStatus('Loading Ch. '+(+chap.num())+' ('+page+')');
    })
    
    
    .bind("firstchapter", function() {
      ui.setStatus('This is the first chapter');
    })
    
    .bind("lastchapter", function() {
      ui.setStatus('This is the last chapter');
    })
    
    
    /* Navigation */
    .bind("keyreload hitreload", function() {
      window.location = $('#button-permalink').attr('href');
    })
    
    .bind("keyprevious hitprevious", function() {manga.previousChapter();})
    .bind("keynext hitnext", function() {manga.nextChapter();});
  
  for (var n in options) {
    ui.addOption(options[n]);
    
    (function(name) {
      $(window).bind("keyopt"+name+" hitopt"+name, function() {
        ui["do_"+name](ui.getOption(name));
      });
    })(options[n]['name']);
  }
  ui.postInit();
  
  ui.setStatus('Ready');
});
