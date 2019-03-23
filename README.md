# StyleObserver.js
The missing observer of DOM API

Have you ever wished to track if any styles off HTMLElement were changed? Now you can!

## Usage
As any other of DOM observers StyleObserver consumes callback, target HTMLElement and settings. Observer is being initiated after `observe` method is called. 
```
const observer = new StyleObserver(callback);
observer.observe(someDomNode, settingsObject);

function callback(changes) {
    //Changes is an object containing all CSS properties changed
}
```

Where `callback` is a function which accepts JS object as an argument describing all properties changed.

## Settings
`useComputedStyle: boolean` if true styles diff is made on getComputedStyle which is slower then just compare element.style. By default is `true`.

`skipFrames: number` number of frames to skip after each check is done. By default is `0` which means no frames are going to be skipped and check happens on every frame. Skipping frames might be useful if you are looking to reduce amount of resources consumed. 
 
## License

MIT: http://mit-license.org/

Copyright 2017 Denis Radin aka [PixelsCommander](http://pixelscommander.com)

Project is a part of HTML-GL v2