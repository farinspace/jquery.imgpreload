## jQuery Image Preload Plugin

The [jQuery.imgpreload](http://farinspace.com/jquery-image-preload-plugin/) plugin lets you preload images before and after the DOM has loaded.

**Tested:** IE6, IE7, IE8, IE9+, FF, Chrome, Safari

## Usage

### Callbacks

The following are available callbacks, you may change them globally or override the defaults by passing the settings object to the imgpreload method.

    $.fn.imgpreload.defaults =
    {
        each: null // callback invoked when each image is loaded
        , all: null // callback invoked when all images have loaded
    };

### After DOM loaded

The following illustrates using the plugin to preload images after the dom has loaded (*e.g.* using jQuery selectors):
```
$('#content img').imgpreload(function()
{
    // callback invoked when all images have loaded
    // this = array of dom image objects
    // check for success with: $(this[i]).data('loaded')
});
```
```
$('img.logos').imgpreload
({
    each: function()
    {
        // callback invoked when each image is loaded
        // this = dom image object
        // check for success with: $(this).data('loaded')
    },
    all: function()
    {
        // callback invoked when all images have loaded
        // this = array of dom image objects
        // check for success with: $(this[i]).data('loaded')
    }
});
```

### Before DOM loaded

To preload images before the dom has loaded, for instance in the `head` of the document, you would have to use specific image paths.
```
$.imgpreload('/images/a.gif',function()
{
    // callback invoked when all images have loaded
    // this = array of dom image objects
    // check for success with: $(this[i]).data('loaded')
});
```

You can pass a single image path (as above) or an array of image paths.
```
$.imgpreload(['/images/a.gif','/images/b.gif'],function()
{
    // this = array of dom image objects
    // check for success with: $(this[i]).data('loaded')
    // callback executes when all images are loaded
});
```

`each` and `all` callbacks are available to use.
```
$.imgpreload(['/images/a.gif','/images/b.gif'],
{
    each: function()
    {
        // callback invoked when each image is loaded
        // this = dom image object
        // check for success with: $(this).data('loaded')
    },
    all: function()
    {
        // callback invoked when all images have loaded
        // this = array of dom image objects
        // check for success with: $(this[i]).data('loaded')
    }
});
```
