/** @see https://sites.google.com/a/van-steenbeek.net/archive/explorer_domparser_parsefromstring */
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


window.MCR = {"html":"<article\nclass='spaced'><ul><li>Loading...<\/li><\/ul> <\/article>","css":"html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;vertical-align:baseline;color:inherit}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:'';content:none}table{border-collapse:collapse;border-spacing:0}body{font-family:'Open Sans', Helvetica, sans-serif}article{text-align:center}article ul{list-style:none;padding:0 auto;float:left}article.forced800 img{width:800px}article.horizontal ul{margin:0 0 1em 0;padding:0}article.horizontal li{float:left}article.spaced li{padding:0.5em}a{color:inherit;text-decoration:underline;cursor:pointer}a:hover,a:focus{text-decoration:none}\r\n","home":"iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QAAAAAAAD5Q7t\/AAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAYAAAAGAB4TKWmAAAF6ElEQVRIx42VfYiVxxWHn5l5573v\/dhd11Wv1zSJ7q5bTTWSNBqtYjQFiykV4yqVthhITAhtodAPQqlELElDExosWGhLLTSJLTTWhaaFlGKhBqSJJBFsd7VZV6PZ73W\/730\/Z6Z\/7LphSZUMzB8znDMPZ87vnCOcc9xuFcSedcvuWrCpcueiVXUNhTLgJserg\/3XRy72X584W3OnLtzOX9wK0FS\/b8\/Wneu+tXn7hi0rWpr9Ul09UkoArLVMT03Q88Hl6K3Tb595680Lx8aqJ9\/4VAAt2isPbF728\/2P79l394pWTGZJkxTn7Dw7KSXa95EKerov8YffdLx6\/p2h76bu5MgtATmxp2VH+5qO3ft3rxXOI02Tjw0FWOtwgJKSeX65HMYlnHzl5Lun37jUnrhTH34C4Iu95a2PNP\/9K\/t2rU2iBGstQgiEEAAYYwlyGs+TTE3HaK0A5kBSSjxf0vHaqXNnT\/d+KXGvjwF4N0kr2govP7ht09rhgSHsrNNNQJoZgpym\/ZGN1JUCfvfHswwNjZHLedwMxDmHlJLNO7asv36l46fAU3MRlPxHd+w8sPFvS5eUybJs\/uOpoVQKOPj17axuuwOco29wnF+\/cpregTGCnJ6LwjmH9n0+unbFvnni\/e3VrOOMB7BkeeE7nvYZHBxACIkQAqUkcWJoaqzjyW9sY1XrMsIwBmDpkgaefuyLHP3VX+i+0k8+8LHW4pzDOUeuWJSL7vS\/DZwRAe0rWzY1nq9UFhecNSilUEoRJymVchM\/+t5+2lqWEUYfJxwg52tujE7ywtHXudB5hUI+hzEGawxCKT66em3i8rlwjfL1yp3Fsv5qFkckSUKSJIxPTFIpN3Lkhwdoba5QCxOcY97OMkOpGLD+vjYudPbQebEHazJqYY3qdJUwjYOpoeSfShfb2vONepszKcZYojhhzarl\/OTwkyy\/q0ytFs8p6eYXIARiVlmFQsCWjZ\/j2vUBLl66SpYZ0iQmMSnT4+l70gi7cGR4mOnpaZIkwRjDg+vvoWlhPWEUY60jSTOSNCUzBusc6ew5SVNqYUQQ5Hh46\/1orTAmwxiDyQxC27KH9Gy1NklamyLIFwiCgJeP\/Z4Nn1\/FA\/etouu\/H\/L8S68RRQlPP7GLhzav49Bzv6Xnah9pmnHwwJd5aMs6Xjx6grGxCaw1hGFILQqxrj7zpPIH\/Vwe7SRSylmZCrLMIATUahHvnu+kWo3Zu3srCOi+fI1\/d\/YQJynDI18AoFarMjk5CTjSNMVaECrf6wmZ6\/K1jwY8TyGVQnszBWTsjL6DXA5jbmodfnzoIHGc4JyjXG5iqhoipUJrjRAzVS0tpC7f5TlVfFup2ohWapEnDVJpPM9D+x6+r9HaQ0mFFBLPU2jfY2XLZ5ByNvHA2NgUWutZgENIiUlcL6r0vlfr\/2V\/Q\/PX\/uoFPKZsiOdpPE\/R2XUVYyx9\/SPcu7aVLDNMTUe8c66LJM3mFCUEVKshzoHv+zhrQApsojtqfb8YFc458i3fXLewOPWvvCbwpEFrnxk1CoIgYEFDHdr3SdMMYyzWWtI0JUkS4jjGGIOUApOlZAaqcTY1Gi3eEHYfuzjXTRtWP35k6QL9rBYpngSpPPL5gHw+TxAE+H4OpWbaiDGGNE2JoogwDAnDkCzLZiSdWfom1TOTXcdfnNdNQ730+fFo8N5KY91u5RICX1EqlSgWi+TzeXK5HJ7nzbZuQxzH+L4\/dxdFMZmFG9XoRJSr\/Oz\/Dhx9\/6H6Jm\/4+N0L6\/YuqCtSKGhKxRLFYoEgyKO1ngNEUUStVqU6XaUWxoyOT9Bzo\/rqqFnyVPrec9EtR6badEQ1yPHvr15ceKb5jkrjgoZ6CoU8SqlZzczkxlpHGEaMjY3T3ds73DkcvjBpG4+as8\/Oe\/CWQ18\/fPizywr2idXlhkebK+WWuiAvlBTgILOWahzanoGhD\/4zOPGnvqp3PPvH4Z5PNfQ\/YbDrpbrAM\/eUAtUaaLkEIEzdwHRsuuNUdro\/\/6B6O\/\/\/AQLYD3NQ9O1lAAAAJXRFWHRjcmVhdGUtZGF0ZQAyMDA5LTExLTI4VDE3OjE4OjI4LTA3OjAwMZGyLAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxMC0wMi0yMVQyMzo1OTozOS0wNzowMPXm7hcAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTAtMDEtMTFUMDg6NDU6MjgtMDc6MDDDv8TsAAAANXRFWHRMaWNlbnNlAGh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xpY2Vuc2VzL0xHUEwvMi4xLzvBtBgAAAAldEVYdG1vZGlmeS1kYXRlADIwMDktMTEtMjhUMTQ6MzI6MDQtMDc6MDAZIezXAAAAFnRFWHRTb3VyY2UAQ3J5c3RhbCBQcm9qZWN06+PkiwAAACd0RVh0U291cmNlX1VSTABodHRwOi8vZXZlcmFsZG8uY29tL2NyeXN0YWwvpZGTWwAAAABJRU5ErkJggg==","info":"iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QAAAAAAAD5Q7t\/AAAACXBIWXMAAEnSAABJ0gGoRYr4AAAACXZwQWcAAAAYAAAAGAB4TKWmAAAFYklEQVRIx3WV229cVxXGf2vvc5k5M+74Mp7Yjq9qWrexUFKqQCsHoiJaoK0qVZSqD+0LqFUrJOABQV\/ghT8AgSpFXF54g4oCD1wCtI1ECyW9IZKQOOTuxk7q8fgy9zmXvXmYY2ecmCVt7XPOXvv71rfWOnsLt9rsN7jzqae5ePJD98DBgzMj\/YXP9gXBQ57rHdBajyCijTHrcRwvtNrh3zbq9ePnrl07fWT+SON3x48R\/vyZHXDS+xK88BrNn36Z6W\/\/uXjXyMijpYH+rwRB7pPKdYtWKdeKdP0tiLWJjePNqNM5V601fr9UWXv1xMK\/L91\/zwHzwfcP7UKgn4Tkt8y+\/MbU3WOjL5aGis\/pTHYsVkqMtVjA2HSTdDcqEbS1SBTX6tX6n5ZWV3\/49lvH3x3YO2EqP3uqC7uF\/+nwLG778MTc5Ph3RodLz5MNiiFIiokSKOWE0T5FYqCT0CUFrKP8jOfNBo433V8cPr\/w4T+XuPTGTQL1tV\/ROXYuNzc1+cJYqfQ8mUx\/ZG+mzgLjdyie3O9zZNoh4wgfbRpC01ViAatEea477ipd8AtD781+6ZubV14\/igIwy1dkbGTPodLg4LMqkx3qBd+yPXnhnqJib5\/i3mFN3hdsj58BEkf7uXz+iyODxSdOX7vibyvIP\/z1wv694y8Vh4pfiLTSt6FbUEooBoIInLyRcLacEJmdXWIBUSqjDb4Y\/rHUKKw65B5nrNA\/3Z\/ve9Bqx7W7RK8EPq5bfnMmpM8Xyg1LM7I7W3CLRIHje3OFXP4+rP2vQ+Mj+oNgn+f7E0YJ3MLgKNg\/rBm\/Q2130XBgObWSUOvcHo0FxNEDvufPDd73QMZh+n7te96Y1rpvl+DRCu4uauYnHHKeoAQurRvOryWs1C2OErTqqrwpWXlau+PF\/qHAYWpGi6gcItrukp8ogb9fjQljyyP7XPKeYLGUG5almsHVQtYR8p6QcbpEFgEh8B3Hdeg0jTE2NsZanUrc7gwL7dhyciXGChyecsl7YAy0E2jGoBNLI7LUQqHPE\/p8QRlLYmxsjDGKs68l7SgqtzpJOzKQGAgTqHUsKw3Dcs2wkhbVbLML0nMM2DSQSqvrv9FKkiiJy5utWsvh0Mu23m5errXCclVnB2MgNhAmltiwfUTszN5u1er6hTEkmIaJwvNLK4tNxetfpVKvXmy2Gqei0NjNTldyZHbCdM8fu\/38\/8wVcJNwsdlq\/Et\/76VYAZTXyh9v1Db+4ETNiq927tYCnyhpDk865P3uWjEQHppxmBlQO3wFyJJEUafx5o2N8pl4v3SPioGhPXG5Wvlrs77xl8BEoe4J0VEwP+nwmSmXMIb1tkWJ8MidLnPDeoeaQGGdsHVyvbr26uVT72wAOADrP3oMPv+D5Xw2f3Tc9Sby+aH5umiV2G6q3lqMubxhbsv3hUqyXZtACdmoebVeqxxdvH71feK63VJ10w6\/6N31qSceHhuZ+a5XGH6gqTw3tLB1H9xqCnBEyIqxXrt2qVpZfuXCwju\/KP\/yW+vbKe5NN4vve2sX361Ebu6q72WyOdcb8h03UEqLEkEhaBEcETwlBGLJRs1qsnH9gxvnT\/xk4diP\/7j55iv1LZG9CgTwgADIAkHm3s9NjB58\/MGhybn5YGB01s30DSrH80DEmjg2YavWqa1eqd64cOL6f46\/vfrer8\/RqdeAVjraQNJL4KbgWyOD0jm3tG8wN3lgb1CcHvWCQkGUUnGn0WivLa80rp1eai6fWUmBOylwM507gOmtwRaJD2TS2U+VuWlD6NTPADEQpaPTQ9BJvyW3Fzm9y1Mg9xZwla5v3ZImBYmAsIfM0POP\/g\/eMmZ7SAp1ggAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxMC0wMS0xMVQwODo1OTo0NC0wNzowMGifIO0AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTAtMDEtMTFUMDg6NTk6NDQtMDc6MDAZwphRAAAAM3RFWHRMaWNlbnNlAGh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xpY2Vuc2VzL2J5LzMuMC9W9\/ocAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAABp0RVh0U291cmNlAFRhbmdvIGhhcm0tb24taWNvbnMFMQKyAAAASnRFWHRTb3VyY2VfVVJMAGh0dHA6Ly9nbm9tZS1sb29rLm9yZy9jb250ZW50L3Nob3cucGhwL1RhbmdvK21pbmU\/Y29udGVudD03NjMxNo7adTkAAAAASUVORK5CYII=","options":"iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QAAAAAAAD5Q7t\/AAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAYAAAAGAB4TKWmAAAFXUlEQVRIx52VeWxUVRSHv\/fe7NNOZ+syVFrKEkAFa5ECLQUFW0TUaKkLAxjUGMWKCwETiBVNXBK1asU1akCsSwzFBdwJFYgG0aGWCqXFCi20087QlqHTdjoz713\/0GIpKugvubk3J797vpxzT3Klx9Y9CkBhUREPrFiBTqfDu8TL2NFjGJR36VKGa9mttxHXNKLRmDQYy86+RAz3yX\/u1wECuJz\/pjV5+dOa82dO0\/Lzp38CjDwLUPtzDbU\/1yRlX3oJb7\/3bjXgPY\/Eo4CXSkvvfnL27FkjR2dlEY1E5ljMpnBjwyGGLmXihAkA+5t+bRpRWFQ0xeVOXtjXF37G6XDGBrMtLC6m6qOPhgIKNm+pet5qNnGovp4NGzfuNZkto7sDgcRINPoGsGXQqBty6a4HS+9teOqZp8v3+fb1gjAC0dPvsOiMd8iw2WxomkZKSjKXTp6c2xuJjnWneQ6njqBlqHEoAOC56ZMnN+72+bbu8\/kGQEiqqoKmYrVahvrSFEUhEomgNxhwJadh6e8\/PG3GDKqqPqz4NwDAtmtnz5y3defur\/b5fAKQAB4yW3hVOT0kWeFwmOfLX6DN387ah9dwsqubo0eO3N7uPxH5uykarq+vmZWXn5MzhaFtymoboKz2CgZU5+LGugZKbr6F9IwsTCYLTreb6uqdMvD++QAAvn\/q8SdKp+bm6oHgYFA0i+MVLXPZ0Rih5Ug9kXh8x\/r1L71YWfl+OfDWWWN6jnF8peLZ8qUFswvc8dhAV1NruLX2xOL0Pgys\/sDG+te3r+psO\/YmcD+w6u8SnAsAUPlewZX3uNaVOe5bNGVERNao3TkXAsE5aWlS+fCWDJc0ae0uANyuJPRaFyYDOIxGkuwWQjGFmh4dBZsru9fY6+y69Awko5ET27ezo80v5QQCqEAIsJplZB3YPUnY0pPOv4L2FtHjq\/3BvnfPT7Ru\/xJzfj62Cy4gQ68Th1NTLee6\/6+Ao8dFd2DXrwl7cl9mz9RVhHsi7F6+HOPFk8i7\/Q6Mstx7KDW18n8BjrSK8N7dbXZ6Ehk\/P5ON19\/L47qLEvSSvPz7TZswFxQwr6wMCRbvd7lEU6LTfd6Ao8dE23ff+q39jX2M8k7HrGgEPqm5xmlK6E3t63utR9NOfLNsGea8PG6qqMCtKHSoInjY7Mw5J6ClRdTX\/RL2dNWFSL1xDiM9cKDa95qcKX026BkXDCaHVJU9JSUYs7PxbthIsqIQUIWvWZfg\/kfAsWbxmd9vntDl68R+1SwmXWyitvqXloRR0vJBT1soRLeqckrTbvCHw9QUF6MfNxbvpndwKwqBzmiwVbZIZwGON4snksfkXG2wJpNclE\/2VBf13\/2Ge5SUCZC4YQbbOr7gepdtsIqPg6r6eVcoRF1xMYYxo\/G++RYmScJ\/sFtLlJ0kys4\/AB1HhTsqOdbu9fX8YM30tEwv9PDboTB+v5rbHjIhXpl5RhsXuOzMd9jJCgYXHI\/FtkRPnaKhpARdZgYLyh5hnGcEHYppHgAphSsxTXgwxb3soLjsg1hXaVNcpK4ICMkxc5ENSJLBboEkm4LVYcHosiG77OCwg90BFjt3JiR4v0lPFz+NHy+ifr\/o2bpNBOfmEJybg5RSuBKA3gMHNqfMX7dQUaO0frq6Suv6cY0RUiSZRMmEWegUQ1wxSnFZRwxZ1TQGEFI\/UXGSOMcy46dWv+7xrLxw4kSW7Np1VZasfAX8BZA7DtK+\/8vxCgg9dBohSQUzElZNwSRk9EJvUFRZT0ySY6hiAEQETepHNvTq+04GBMIhoHuJ0XT6Txj+4TQogOGPcyf\/QUZZRmjCH0c7I\/47i74i\/auRPicAAAAldEVYdGNyZWF0ZS1kYXRlADIwMDktMTEtMjhUMTc6MTg6MjgtMDc6MDAxkbIsAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDEwLTAyLTIwVDIzOjI2OjE1LTA3OjAwBjtcgQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxMC0wMS0xMVQwODo0NToxNi0wNzowMB0PuFIAAAA1dEVYdExpY2Vuc2UAaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvTEdQTC8yLjEvO8G0GAAAACV0RVh0bW9kaWZ5LWRhdGUAMjAwOS0xMS0yOFQxNDozMjoxNC0wNzowMNWL7EkAAAAWdEVYdFNvdXJjZQBDcnlzdGFsIFByb2plY3Tr4+SLAAAAJ3RFWHRTb3VyY2VfVVJMAGh0dHA6Ly9ldmVyYWxkby5jb20vY3J5c3RhbC+lkZNbAAAAAElFTkSuQmCC","permalink":"iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QAAAAAAAD5Q7t\/AAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAYAAAAGAB4TKWmAAAGdElEQVRIx42WW4yVVxmGn\/Wv9R\/2ec\/ee4Y5FgaGQzmJUEEcS6qYVmyw4YYLRW28UFvTC72wTbzppQWjTdqYNiYiVZqGHgxtbZAiEClj6BSYYZQKM8NhYI7MPsw+\/fvf\/8mLpk0pbfVNVvJ9F+t78r7J+rJEGIZ8lsTX\/7zMtIyHsynz\/nTM7JGasOqO1yhWmhPVevNI03FfCE\/sucLnSHwawNxx6O6IqT\/7pZUt9\/WvyWmL2+MkIxKAsu1xdbrG4OUCl26Ug7li42itaj8Wnvje2P8FEDte+35vzvz9Q\/1dxrZ1OUCQjCmU1ABwvYCa7TFTchj8T56\/DU5Td3GqTfFD5\/WdL34SoH282fvK6CMxnQNb1+aMrlyUFV1J0nGDYtWjVHUpVl0qdQ\/HB1OXPPxAL\/1rW6nUHXPj0tjBpw9f+cFnAo4N57c\/\/vy5361ekiabNAlCOHUxj+eH1Js+NwsNposOswtNehdFWdWT4O9Dt8ikLB7c0kmx4nJyaHb\/mcsL990RUQjaxkdPnB+9WVz\/5TWt9HXGSUR1TF3DNCTduQjVho\/t+Gxekeb0xTyaJgiCANcL2fO1Ho6eneHd0QWqtn\/+0C83b9Ig\/MjBW+cK3x4anV2fSUXwfFiwPQpVl\/mKy2TeQUqNBze1sakvzdDVMgGCUtVjquAwXXAYeL\/AdMHhzYGblKrOF48OF7\/1oQN1ecaJvvbO1B4lJVJp1Joh8xUPsxFgGYqOtM6itElve4xaM2DsjM10wYYQXM\/nRw8sYd+ro9y8VSNfquH5GQ4PTH23O2cdX9sVsdUfTxWS742V+pNRRTpuEosq3ADiAjpbDB7a2snQ1TL5qke14TMx38DzQ5peyM929rLv1XGmiw6OG5KImMxXfIbGy\/3H\/lVKrO2K2Orc9Xq8UnfbLEORS+o4rs+yjhj3rMyRiil+\/fp1DCUAQXfOIpMwmVtw+MWuxTz71jUqjk9r2iLTGeXUUJ1aw8MPRebsFdsCUFFDaoYhNVdAe4vF0z9ex4ETk\/xlcI6li2LEIwopNTQhsAzFjo2t1BoeL\/9zjnozJJsyMTW4Pl1BCtCkREgpK66mAahk0nLjcau5slUYU3mbPb8ZQihJIqLjeCGxiIGSAiEEXTmLHRuyjExUOXahQCKq03A85soOjuMjhaCjLY5p6k5rS9QDUNm0VentyVwbOT+2QmiSTEaQaVFYpkJISSqm44egCUhGdY5cKFKqefgIlJKIpo8IQwLfJ50waW2JEY9Hb8Yjpg2gulrNsgzTb18Y0VcoEeB7HxxNE5iG5K5Wi1RUZ8PiGIfPFRmZbNAWl+hKIqWPH4S4jkcYhiztSdOdM+ntSb+9vDNWBtB+3h9pLu7M\/mFZXzdSSjQBnufjuR5SE2xfk2bbqiR\/HSkToGEZilozJGJo1OtNmg2PqCnZsCzFmrt7iMRiOCq9f+dq5QIogJ9uEecuDDuHnPbs7ka5gh\/Ars1tJKI6Lw3M0fA1TFMShuA0PTIRjdW9MTTP5ZYBjYagszNL0y7TqHsH9+5uH7ljm2Y2PNG367FH3\/vGKisV+h5HhvJoSuIGGpalY+gfuDM0+MryOPevS\/PiP6Y4enaW7o4UphWlurBw6+Azz91TufjMxEcvGUCk+gUt94Zv7n\/5T4lHdv8kCEMVCEkYaEQsnUzCIJswiJka+YrLpekGTTdPvubzhdVduD4MDV5sDhwffK5ai3t3blM9LjBU29yN6fILvz1wsl4u11Yu72Dd8izf6W9j29osne0JHGliRExQOoWmpKUty0KpyskjpyvH3zh5pDRftLH0VpH6qrjNAfZMSBjOo6v5Yr409dLzr5ze\/s0tK7feu75zshHThZIkUzqpFDiOR6PhMTtbYvjMpea7AyMT4+9f+7cf+NNIOU8QFMKFd8LbAGFtOBR9j98ATgmlNE1K\/8LQmLtQqk6uWr04t6R3UTqXTVpCIIqlWjA5mbfHx6aKV0YnZ+fninlNV3N+kxEITxM4Mx+PSH1YhGNPNcSyJ4aFps1LqV2xLH2Nrqu7bNvJVCp2NBaPGEpXwnFc37Gbjga1aNScj0bN67btjLiuP0LIbDi+z\/tUAEA4\/isXuLaof++klPK0EKJDaqJDaiKrlIwZhq6siOlaEaNqmvq8aepThmXOKF0thGNP3jb4c38Vn9RTb0yIVDquKV2JWs0Oi\/lK8OTuvv99EfgvGOj0IBElYNMAAAAldEVYdGNyZWF0ZS1kYXRlADIwMDktMTEtMjhUMTc6MTg6MjgtMDc6MDAxkbIsAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDEwLTAyLTIwVDIzOjI0OjIzLTA3OjAw75G+ZQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxMC0wMS0xMVQwODo0NTowNS0wNzowMOBNolEAAAA1dEVYdExpY2Vuc2UAaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvTEdQTC8yLjEvO8G0GAAAACV0RVh0bW9kaWZ5LWRhdGUAMjAwNi0xMC0wOVQwODoyMTowMi0wNjowMJ5tG4gAAAAWdEVYdFNvdXJjZQBDcnlzdGFsIFByb2plY3Tr4+SLAAAAJ3RFWHRTb3VyY2VfVVJMAGh0dHA6Ly9ldmVyYWxkby5jb20vY3J5c3RhbC+lkZNbAAAAAElFTkSuQmCC","hotkeys":"iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QAAAAAAAD5Q7t\/AAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAYAAAAGAB4TKWmAAADQklEQVRIx52Vz28bVRDHPzPvbRK7UEUoCRFtIoGlIhHaG9Bw4IcQtBeuQIm4l1SV+AdQVfUI3BD9D0AQkMgNJKhKqVCAcimVU1EqG4ljSOvaTu21900Pu2s7jRWcjPRs79t5853vfGeehcwunD9H8ZEiASNJEvZjzjkUYavR4MNzFwDw+cutRlMKBwrHEF4DHt0XAtTN7Mfa3dp1wLYBTD0x8+yhQ4cvzs\/PHY+iSPYTPY5jq1ara4acBq5vA5goFJYXFp5ZnJqaZut+AxFBGA3HgG63g\/djMjP9+OKl+g\/LwOltAJg9FY1FxHGLYuEA3W6CSAYgDIUy6\/\/23hNCwJzS6Xaf7O33nU0FIQmBuNOhHbfTwINMHkIRhGABzBgfm8DM6HQ7AJr76MNZOXUYhqjgVNF8OcWp6y0LRq1WQwARxcxQ0R1MdwAAqAgqgqiikoO4PpgqV376matXrqYMNV1DY+3cEiQPKgMMRFBVvPdsbGywXl7n6LGjRFHU8x2mlB98MEAEVBUJaWBBUrEzPRr1BtXKP5RKJQBCSEujogRJsN0AIBN1x1Lyhrp27Q++XvmGkCSsfLnC2Q\/O8vwLz\/V8GRlA029V3dZJCwsLzM7OAvDxR5+w9ssaiy8eB9sTQFoaFe09qwjBjEqlwuVLl9nc3OTWX7colUr9DhoVQHO6WeapwI57d+7w2acXeeXVl1l6b2lA04Ezo3RRelCQTFgGANvtFs1mkxt\/3uC3X3\/P5qD38X8MLMuiL2rKIrXJyUneP7PM6rer1Gr3eHfpFPPzc5gxILLtBkCWdeZnkJ3GMFSVkydP8MaJ19N7x4wQAiEkfSa7lUgQ4jjGe4\/3Ppte15vovMYq2TWSDaJ3Ec554jjOu82GMTDvI0SEdqvF+PhEOp3D7zlMwGXpWQi02vcRVbyPMDPJkg85gANqTh3Oezbv\/keSdNmLOeeYPPgYzjk6ne4WUAQaOYBWK9XVcrn80pGnj8x49Xj1o0fPNGs2m9xcL2\/cXF\/\/Lq9OzlynZ6am3jn19ltzc4ffFOTgntJPI1kIoXH779vff\/H5V6v1ev1foDVYWpfRKg7rrhHMgADEQBNoD9Mu39vXnz795u7ZA1TeG7N06sg2AAAAJXRFWHRjcmVhdGUtZGF0ZQAyMDA5LTExLTEwVDE5OjM4OjIwLTA3OjAwgH2N8QAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxMC0wMi0yMFQyMzoyNjoxOS0wNzowMMGbNvUAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTAtMDEtMTFUMDg6NTY6MzktMDc6MDCD26sFAAAAMnRFWHRMaWNlbnNlAGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvUHVibGljX2RvbWFpbj\/96s8AAAAldEVYdG1vZGlmeS1kYXRlADIwMDktMTEtMTBUMTk6Mzg6MjAtMDc6MDDfzPvFAAAAGXRFWHRTb3VyY2UAVGFuZ28gSWNvbiBMaWJyYXJ5VM\/tggAAADp0RVh0U291cmNlX1VSTABodHRwOi8vdGFuZ28uZnJlZWRlc2t0b3Aub3JnL1RhbmdvX0ljb25fTGlicmFyebzIrdYAAAAASUVORK5CYII=","previous":"iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QAAAAAAAD5Q7t\/AAAACXBIWXMAAAN2AAADdgF91YLMAAAACXZwQWcAAAAYAAAAGAB4TKWmAAADLElEQVRIx62UTWicRRjHf8\/MvB+7mzdLNhtBm5gPSFbRnNQGiumhUENRchCJHsRbK9aPi1DFj0spVsSDeBIUUXrwIkguXsVQRUEvobemeBBBW8Nu3M+878w7HvZgtBvNJv5hLjPz\/H\/8n+EZ4ag6A1SACeC924\/VoY1XgMeAbxDaqNp8beC1wwFqILFAi2rxkeKF1QdXPzodnh4bdNUMbf4M4MDf8vPjx8bfOHX81JpyqrPx48ZFoH60BGeAHsIOy5OTkx+snFx5eumhpfjaL9fyzc1NOVqCR4EWkdLqibnpudeXjy\/fOzM9QztrY50FPbjsYIBVoEc1HAvPL8wtvLj0wFJ1rDpGvVtHvJDpDOLDANZgpJzQ+rU5X6qUXqvN1tYW71ss6qKm3qljvUWJwhoLhWEBjwN1VCtrnihXyhdrs7WTczNzOtUpnV4HJw6HwyiDDeyQCZ4C\/iCWqnpyfKTy6vzU\/D3ViSpN28R6S65yrLI4cQQ6wIU5hMMAPONBJXhhIpl4fqo6NRHFEY1eA+ccLnA4019WLJGO+gkOClBrSqaO3X0hSIOXCiqO0zSl2+riIoePPV48XntycnKdk5ucPMghOCAgSRIWpxfNjZ9uyPWtLVxoUWWFGlX4EY8rOnzR44seYtBKgwjaGBz2vwGra6t+\/cv1y53dXlvfqZ6TnlR3\/S74PRUh\/UctAhHoyCBq8Mzetntl5QrO57\/bdno5K7hXfFVdl7L0B8nQb0W0B5AAocDAOd7nq2i\/34KAbt7IPsl8dtbHsmEKYW6M+TsoBikJEipkH8L+f9HHQEnlQcF8jeOc1uazSBd6kUR\/tQtAg9KCyGArzb\/pB09+1cEJ2XY2vYooHwbx\/SYyBWssmP4j6+2g42\/6D913WePgCfbq3RyUvplt9y51d7ov62awNdIZRbc0NECsAjNsi\/6pdxxS1l23mX7a3Gmdy+vybWln1Mc7MSoTRB8VAPi3HCTk3KW+arebZ9OG\/bzUTtKKSXQpNn5QjR4GAMAmkDn0QuFW1upspLjWHUnht6nxZP3nL+q9of321Zug3o44\/\/2zlGbhkjz8\/3kPoz8BIksl1CgqNG8AAAAldEVYdGNyZWF0ZS1kYXRlADIwMDktMTEtMTVUMTc6MDI6MzctMDc6MDCHD5SPAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDEwLTAyLTIwVDIzOjI2OjE1LTA3OjAwBjtcgQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxMC0wMS0xMVQwOToyNjo1MS0wNzowMIL2IOMAAABndEVYdExpY2Vuc2UAaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvYnktc2EvMy4wLyBvciBodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9MR1BMLzIuMS9bjzxjAAAAJXRFWHRtb2RpZnktZGF0ZQAyMDA5LTAzLTE5VDEwOjUyOjQ4LTA2OjAwJlq4SwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAATdEVYdFNvdXJjZQBPeHlnZW4gSWNvbnPsGK7oAAAAJ3RFWHRTb3VyY2VfVVJMAGh0dHA6Ly93d3cub3h5Z2VuLWljb25zLm9yZy\/vN6rLAAAAAElFTkSuQmCC","reload":"iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QAAAAAAAD5Q7t\/AAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAYAAAAGAB4TKWmAAADHklEQVRIx+2UTUwUZxjH\/887y7IdZ1F3Cyjsou6WgoaoQZMNZHqpGmJWohHW7XqqorholLUx8WrTXogfsTUejHTRi\/h5IGFpDQcT04tJpW3aJiXVphnGdf1AhF3HwOI+HjroBkaoFw+N\/8s78zzv8\/89z5t3Bniv\/71o2rsA4AKgALC9hU8WQAbACIDcmwASAE9VVZVn9ZpVRyRBgWx20jmXs73APvoil7v108DtI3f+vJMEoAN4MZXP79Lt8\/lK6uoDiW2RUFG5p5wEEYgIRAKCCCTMlQRIEAQJEGj+kK6vj3fGAxPGxDpN054DeGgFUDZuauhobAwWLXQtpM4z8Wwqdb9grgm8Fd5sW1u0INq2p8jpdB499e3pXZaASCSiZNKZwOKyMjofPz\/eGNx0csOGhr\/nAiS+T1R2nv3uQKw9Zs88ywQikYjS3d2NGYDm5mb3xcsXZJtNwpCuF5rmCSK6NxugtrZ2ub9y2SEhCWQyGfmzbdvd+QAx9SDLsgAAIaTXN8DavBDAUgAfAZAHBgay+XXFxcX2\/M2vJhBCsLnO1rCsqurmxeWlFwDgyqVrpVMJyayTJInzC165ud3uiXnzZENAoKJiyXh\/\/3Wf2eWH5hanqqqba1auiHfFz0EIgWAwWFL\/Sf1av98\/LkiCoiiGy+WasARUV1ePlZV7\/kgmk7yz5fPCvh8SX4TCTX+Fwk2PANhUVW2sWbkifvzYCUd2MguHwwFZcfxWX1fXFYsdLNT0IfZ6vL97vd4nlrMz8wJN0w7ubm1J3\/zxRk679w+nHiY5FG5iAAiFm\/h+Kslj6VEeHnnMI0+H+enYCI+OjfIvv\/6ca92zK63reoyZF+T70jTI2sHBwU+7zsW3px6kPjaMZx8AwOWLV229vb0d1\/v79n\/15dd2EoT2WDsMw4BTcRqlixYN7tixs7vSX3mTiG7Neq+Z2c\/MW5m5hZlbmTloxit6eno69u2Pjg8PP+JwJMRmvoWZtzCzz8pvxg+NiO4CuGsR15j5G2bm6N7oYTN8lYisz9zqiP6LmLkEQAP+\/R4uEVH6bT3e693qJWSlLt3iHKSdAAAAJXRFWHRjcmVhdGUtZGF0ZQAyMDA5LTExLTE1VDIzOjA0OjI4LTA3OjAwDCvb8gAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxMC0wMS0xMVQwOToxMDoyOC0wNzowMPgKwtMAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTAtMDEtMTFUMDk6MTA6MjgtMDc6MDCJV3pvAAAANHRFWHRMaWNlbnNlAGh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xpY2Vuc2VzL0dQTC8yLjAvbGoGqAAAACV0RVh0bW9kaWZ5LWRhdGUAMjAwOS0xMS0xNVQyMzowNDoyOC0wNzowMFOarcYAAAAXdEVYdFNvdXJjZQBHTk9NRSBJY29uIFRoZW1lwfkmaQAAACB0RVh0U291cmNlX1VSTABodHRwOi8vYXJ0Lmdub21lLm9yZy8y5JF5AAAAAElFTkSuQmCC","next":"iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QAAAAAAAD5Q7t\/AAAACXBIWXMAAAN2AAADdgF91YLMAAAACXZwQWcAAAAYAAAAGAB4TKWmAAADKElEQVRIx7WSTW9bRRSGn5n7gT9b58aNFWiUFoXGJTQgoSoNldo9v8A\/AbHkB4BEEVAhUVhRsUWqKEiIJUisQGxYgaClTZMUIS9onNqJXd+PmbkzLJwFgjpx0\/JKs5lz9D5z3jMe4\/Q6cAKYAzY4tOTYylPADpJvgVcPD\/DGVo7ywtKppY8aZxuFrZ+21lgl586TBJxgdeXllXeiqehiW7cDHesbPE\/M2pMCnOT0QnOhdeHchZK1dqU77D6TJMnNaDXqJscTJp1mPGCBxbn5udb8\/DyNRiMoF8pneru95c69zgY92pzBsf44gCWas3Ozrfp0HWUVU9GUjGrRycFw8MrADvpu6G6zjOH2YQEv0Zx5eqZVm6oRqxhtNaVyiXpUryutzg\/0IMzz\/FdvxU\/cooWbjwo4S3O6Md2qVCvEJkblisxk+KFPFEVlhzs3SAezeqh+rzUb3bQ6fOhexgNWaNaO1VphNSTJE7I8Gx2T4XDUKrUg9MMXE5Ms7\/7V\/ZOv+YMW8NukgPM0K\/VqS5YFcR6jnEJZhTKKTGVooykFJVEKSie01avpYrZD7ta4gfmnjT8WEIAJDLEfY5xB5hLpJNJIyEAqiZd6eHg0So1TR4u1K85z9i6b1yYCeEFAx3XYMvewxoICkQpkLPFiDx6A7Vtc3xG6kOZzp73FuUX\/LptMBJCexBXAVA0uc6MwLaAAsdcjJEE1RPlm\/efOL5e2TefL\/\/iMjUgKRFEgjgioAEWgAISj+AiAI8LaCj9ooV8zV9Vnxprk3zZjJxBCIIpAde\/CAOnoW4R+iPFsanP3hdX6veMXn73Vvn+H9uU2kwOkRHhu1LE3p0BQoIjMvfvO6k9skn7sF8Lt9nfr8PnDffYBCKQWiOHo5VJJylmFvO82sgfqfbObXcMjNh8o9tP4JUuJSICuIEgDSv2K09vmx7SXvGm3zfdURc6HjoO0X0RCpo5ir4Q39DO1a75K+sO3q8dqtwZ2By7bA833BeQud5Gtofp6p7fbv6rS+ApCbg3e6E5kfCAgC9JNbeLrQrtv1FZ8nSk\/4S3zKN4TqAIzny7Au\/7je\/1f+hsqTGoVnM3JawAAACV0RVh0Y3JlYXRlLWRhdGUAMjAwOS0xMS0xNVQxNzowMjozNy0wNzowMIcPlI8AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTAtMDItMjBUMjM6MjY6MTUtMDc6MDAGO1yBAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDEwLTAxLTExVDA5OjI2OjQ1LTA3OjAwuhMEbgAAAGd0RVh0TGljZW5zZQBodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9ieS1zYS8zLjAvIG9yIGh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xpY2Vuc2VzL0xHUEwvMi4xL1uPPGMAAAAldEVYdG1vZGlmeS1kYXRlADIwMDktMDMtMTlUMTA6NTI6NDgtMDY6MDAmWrhLAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAABN0RVh0U291cmNlAE94eWdlbiBJY29uc+wYrugAAAAndEVYdFNvdXJjZV9VUkwAaHR0cDovL3d3dy5veHlnZW4taWNvbnMub3JnL+83qssAAAAASUVORK5CYII=","loading":"iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QAAAAAAAD5Q7t\/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAACXZwQWcAAAAYAAAAGAB4TKWmAAADGUlEQVRIx71Uz28TRxT+ZvaXnfUSKYAQ4IC64gxpACWK4JBDlCiARE9tbu05Vw6InwcQqir4I+DCkRMRJoHE4Fg2xhCiqioS2hZSkALBgPGu49ndeT1kY2ziRCFSeNLTm3k77\/u035s3wCYbW15cvXp5L+ParSAM9xORsmFAxkJVUWZJ+j+dOnXupbr8gav6zb6+I122bTPG2EbxQUSK4zhd2WzmJoC+OoHvBz22bbO3C\/MgkhuXhHHYts3S6akeAKgTEBFnjIFIoi1uwmwzvxncq3pwvQqWcIg3ETSa2ZbAH7fn1wS79mvXity79\/NwvUpTjm9Yi3XaphO0lMirujh9Yld9L3wBXdO\/kuMt\/MCHqqhYvnWu565OwBiTS43mcL1Kk5ZVt4pkcg9crwIiAgAkTAtv3szBiBlovNaMcRARGGOyiUDT1LzjOL2t5uDv539hW8d2xIxYncBKbMGrV\/9ix\/ad4PyL0kQEx3FI09R8E4EMxMh0ZvpWOj21YpK7D\/4IVdXAvgw+VFWDV\/Vw48Z1hGHY8Af1SR5Zd6Pu3hsjKSV9+PCeSqUFKpUWSEpJkw8mFsfHx9vXqv3+t2hsciypSsw15hRFQav3iXNmEBcf794bq+cCjs7h\/uH\/6pK1Yk2lUj+oBgqHuns6tljtDAAWF6uoVr36mVgsjni8DQBQ\/vyJHj\/Jl4IaDg8ODv7TiLXqs3ln8s4+nfPc4e7eDsMwWKXyecWZRMJCrVajwpNcSUjZO9Q\/9GLdPRjqH3oRCnH0UTFXFkIgkbBWgAsh8KiYK4dCHG0FvhoBA6ABiA8MHH89+3TmWL6YLfu+D9NcIjFNC77vI1\/MlmefzhwbGDj+GkA8qmtSRWkBrkduADBSqfHK7mRnVo8pJ3fvSmqW1Q4hasgVpr2JiamRc2cvPo\/qeBQZALkWgfK1Zx5kFjr3JAuarg4nTEsvzhTc+\/cnf7ty6feZCCyMomzYtyRAdIAaYgAgeJjOzO0\/cKBALPjl2bM\/fz5\/5sI0gFrkPgARRT+qW7dxLM2LDsAYHR3dGsmnR\/lNH9Y17X8eU1F8f8i4PAAAACV0RVh0Y3JlYXRlLWRhdGUAMjAwOS0xMS0xNVQyMzowNDoyNS0wNzowMG38ujIAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTAtMDEtMTFUMDk6MTA6MjAtMDc6MDDL5Yy0AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDEwLTAxLTExVDA5OjEwOjIwLTA3OjAwurg0CAAAADR0RVh0TGljZW5zZQBodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9HUEwvMi4wL2xqBqgAAAAldEVYdG1vZGlmeS1kYXRlADIwMDktMTEtMTVUMjM6MDQ6MjUtMDc6MDAyTcwGAAAAF3RFWHRTb3VyY2UAR05PTUUgSWNvbiBUaGVtZcH5JmkAAAAgdEVYdFNvdXJjZV9VUkwAaHR0cDovL2FydC5nbm9tZS5vcmcvMuSReQAAAABJRU5ErkJggg==","version":"14.00"};
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
})(window);/** chapter.js
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
	
	window.Chapter = Chapter;
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
            'data': new Chapter(manga, chap['chapter'])
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
	
	window.Manga = Manga;
})(window);(function(window) {
  "use strict";
  var Ui = function() {
    
    /** @public */
    var init = function() {
      $('head').append("<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,400italic,700,700italic&v2' rel='stylesheet'><style>"+MCR.css+"</style>");
      
      $('body').html(MCR.html);
    };
    
    return {
      init: init
    };
  };
  
  window.Ui = new Ui();
})(window);$(function (){
  document.onkeydown = function() {};
  
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
  
  Ui.init();
});
