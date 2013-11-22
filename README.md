## [jQuery Image Preload Plugin][imgpreload]

The jQuery imgpreload plugin lets you preload images before and/or after the DOM is loaded.

**Tested:** IE6, IE7, IE8, IE9, FF, Chrome, Safari

## Usage

### Callbacks

The following are the callbacks provided, you can change them globally or override the defaults by passing the settings object to the imgpreload method.

    $.fn.imgpreload.defaults =
    {
        each: null // callback invoked when each image in a group loads
        , all: null // callback invoked when when the entire group of images has loaded
    };

### After DOM loaded

The following illustrates using the plugin to preload images after the dom has loaded.
```
$('#content img').imgpreload(function()
{
    // this = array of dom image objects
    // check for success with: $(this[i]).data('loaded')
    // callback executes when all images are loaded
});
```
```
$('#content img').imgpreload
({
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
```

### Before DOM loaded

To preload images before the dom has loaded, for instance in the HEAD of the document, you would have to use specific image paths.
```
$.imgpreload('/images/a.gif',function()
{
    // this = array of dom image objects
    // check for success with: $(this[i]).data('loaded')
});
```
```
$.imgpreload(['/images/a.gif','/images/b.gif'],function()
{
    // this = array of dom image objects
    // check for success with: $(this[i]).data('loaded')
    // callback executes when all images are loaded
});
```
```
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
```
## License

MIT http://en.wikipedia.org/wiki/MIT_License

[imgpreload]: http://farinspace.com/jquery-image-preload-plugin/ "jQuery Image Preload Plugin"
