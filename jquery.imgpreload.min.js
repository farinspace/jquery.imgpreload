/**
* jquery.imgpreload 1.6.2 <https://github.com/farinspace/jquery.imgpreload>
* Copyright 2009-2014 Dimas Begunoff <http://farinspace.com>
* License MIT <http://opensource.org/licenses/MIT>
*/
"undefined"!=typeof jQuery&&!function(a){"use strict";a.imgpreload=function(b,c){c=a.extend({},a.fn.imgpreload.defaults,c instanceof Function?{all:c}:c),"string"==typeof b&&(b=[b]);var d=[];a.each(b,function(e,f){var g=new Image,h=f,i=g;"string"!=typeof f&&(h=a(f).attr("src")||a(f).css("background-image").replace(/^url\((?:"|')?(.*)(?:'|")?\)$/gm,"$1"),i=f),a(g).bind("load error",function(e){d.push(i),a.data(i,"loaded","error"==e.type?!1:!0),c.each instanceof Function&&c.each.call(i,d.slice(0)),d.length>=b.length&&c.all instanceof Function&&c.all.call(d),a(this).unbind("load error")}),g.src=h})},a.fn.imgpreload=function(b){return a.imgpreload(this,b),this},a.fn.imgpreload.defaults={each:null,all:null}}(jQuery);