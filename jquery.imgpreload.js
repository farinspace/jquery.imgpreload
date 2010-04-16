/*

Copyright (c) 2009 Dimas Begunoff, http://www.farinspace.com

Licensed under the MIT license
http://en.wikipedia.org/wiki/MIT_License

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

*/

function imgpreload(imgs,settings)
{
	// settings = { each:Function, all:Function }
	if (settings instanceof Function) { settings = {all:settings}; }

	// use of typeof required
	// https://developer.mozilla.org/En/Core_JavaScript_1.5_Reference/Operators/Special_Operators/Instanceof_Operator#Description
	if (typeof imgs == "string") { imgs = [imgs]; }

	var loaded = [];
	var t = imgs.length;
	var i = 0;

	for (i; i<t; i++)
	{
		var img = new Image();
		img.onload = function()
		{
			loaded.push(this);
			if (settings.each instanceof Function) { settings.each.call(this); }
			if (loaded.length>=t && settings.all instanceof Function) { settings.all.call(loaded); }
		};
		img.src = imgs[i];
	}
}

if (typeof jQuery != "undefined")
{
	(function($){

		// extend jquery (because i love jQuery)
		$.imgpreload = imgpreload;

		// public
		$.fn.imgpreload = function(settings)
		{
			settings = $.extend({},$.fn.imgpreload.defaults,(settings instanceof Function)?{all:settings}:settings);

			this.each(function()
			{
				var elem = this;

				imgpreload($(this).attr('src'),function()
				{
					if (settings.each instanceof Function) { settings.each.call(elem); }
				});
			});

			// declare urls and loop here (loop a second time) to prevent
			// pollution of above closure with unnecessary variables

			var urls = [];

			this.each(function()
			{
				urls.push($(this).attr('src'));
			});

			var selection = this;

			imgpreload(urls,function()
			{
				if (settings.all instanceof Function) { settings.all.call(selection); }
			});

			return this;
		};

		// public
		$.fn.imgpreload.defaults =
		{
			each: null // callback invoked when each image in a group loads
			, all: null // callback invoked when when the entire group of images has loaded
		};

	})(jQuery);
}

/*

	Usage:

	$('#content img').imgpreload(function()
	{
		// this = jQuery image object selection
		// callback executes when all images are loaded
	});

	$('#content img').imgpreload
	({
		each: function()
		{
			// this = dom image object
			// callback executes when each image loads
		},
		all: function()
		{
			// this = jQuery image object selection
			// callback executes when all images are loaded
		}
	});

	$.imgpreload('/images/a.gif',function()
	{
		// this = new image object
		// callback
	});

	$.imgpreload(['/images/a.gif','/images/b.gif'],function()
	{
		// this = array of new image objects
		// callback executes when all images are loaded
	});

	$.imgpreload(['/images/a.gif','/images/b.gif'],
	{
		each: function()
		{
			// this = new image object
			// callback executes on every image load
		},
		all: function()
		{
			// this = array of new image objects
			// callback executes when all images are loaded
		}
	});

*/