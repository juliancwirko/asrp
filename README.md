# Another Select Replacement Plugin

```html
...

..all styling by CSS (smooth animations too)

...

<link href="jquery.asrp.css" rel="stylesheet"></link>
<script src="jquery.js"></script>
<script src="jquery.asrp.js"></script>
<script>
	(function(){
		$('select.asrp').asrp();
	})()
</script>

...

..or You can set your own classes:

...

<script>
	(function(){
		$('select.asrp').asrp({
			wrapperClass: 'asrp-wrapper',
			triggerClass: 'asrp-fire',
			listClass: 'asrp-list',
			listSlideClass: 'asrp-slide-down'
		});
	})()
</script>
```

## Demo
[See demo page..](http://www.redsunmedia.pl/playground/asrp/demo/)

