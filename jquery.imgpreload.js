/* v1.4 */
/*

Copyright (c) 2009 Dimas Begunoff, http://www.farinspace.com

https://github.com/farinspace/jquery.imgpreload

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

if ('undefined' != typeof jQuery)
{
	(function($){

		// extend jquery (because i love jQuery)
		$.imgpreload = function (imgs,settings)
		{
			settings = $.extend({},$.fn.imgpreload.defaults,(settings instanceof Function)?{all:settings}:settings);

			// use of typeof required
			// https://developer.mozilla.org/En/Core_JavaScript_1.5_Reference/Operators/Special_Operators/Instanceof_Operator#Description
			if ('string' == typeof imgs) { imgs = new Array(imgs); }

			var loaded = new Array();

			$.each(imgs,function(i,elem)
			{
				var img = new Image();

				var url = elem;

				var img_obj = img;

				if ('string' != typeof elem)
				{
					url = $(elem).attr('src');

					img_obj = elem;
				}

				$(img).bind('load error', function(e)
				{
					loaded.push(img_obj);

					$.data(img_obj, 'loaded', ('error'==e.type)?false:true);
					
					if (settings.each instanceof Function) { settings.each.call(img_obj); }

					// http://jsperf.com/length-in-a-variable
					if (loaded.length>=imgs.length && settings.all instanceof Function) { settings.all.call(loaded); }

					$(this).unbind('load error');
				});

				img.src = url;
			});
		};

		$.fn.imgpreload = function(settings)
		{
			$.imgpreload(this,settings);

			return this;
		};

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
		// this = array of dom image objects
		// callback executes when all images are loaded
	});

	$('#content img').imgpreload
	({
		each: function()
		{
			// this = dom image object
			// check for success with: $(this).data('loaded')
			// callback executes when each image loads
		},
		all: function()
		{
			// this = array of dom image objects
			// check for success with: $(this[i]).data('loaded')
			// callback executes when all images are loaded
		}
	});

	$.imgpreload('/images/a.gif',function()
	{
		// this = array of dom image objects
		// check for success with: $(this[i]).data('loaded')
		// callback
	});

	$.imgpreload(['/images/a.gif','/images/b.gif'],function()
	{
		// this = array of dom image objects
		// check for success with: $(this[i]).data('loaded')
		// callback executes when all images are loaded
	});

	$.imgpreload(['/images/a.gif','/images/b.gif'],
	{
		each: function()
		{
			// this = dom image object
			// check for success with: $(this).data('loaded')
			// callback executes on every image load
		},
		all: function()
		{
			// this = array of dom image objects
			// check for success with: $(this[i]).data('loaded')
			// callback executes when all images are loaded
		}
	});

*/