/*

Copyright (c) 2009 Dimas Begunoff, http://www.farinspace.com

Licensed under the MIT license
http://en.wikipedia.org/wiki/MIT_License

*/

function imgpreload(a,b){if(b instanceof Function){b={all:b}}if(typeof a=="string"){a=[a]}var c=[];var t=a.length;var i=0;for(i;i<t;i++){var d=new Image();d.onload=function(){c.push(this);if(b.each instanceof Function){b.each.call(this)}if(c.length>=t&&b.all instanceof Function){b.all.call(c)}};d.src=a[i]}}if(typeof jQuery!="undefined"){(function($){$.imgpreload=imgpreload;$.fn.imgpreload=function(b){b=$.extend({},$.fn.imgpreload.defaults,(b instanceof Function)?{all:b}:b);this.each(function(){var a=this;imgpreload($(this).attr('src'),function(){if(b.each instanceof Function){b.each.call(a)}})});var c=[];this.each(function(){c.push($(this).attr('src'))});var d=this;imgpreload(c,function(){if(b.all instanceof Function){b.all.call(d)}});return this};$.fn.imgpreload.defaults={each:null,all:null}})(jQuery)}