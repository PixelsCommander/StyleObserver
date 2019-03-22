# StyleObserver.js
The missing observer of DOM API

Have you ever wished to track if any styles off HTMLElement were changed? Now you can!

## Usage
```
const observer = new StyleObserver(onStylesChanges);
observer.observe(someDomNode, settingsObject);
```

Where `onStylesChanges` accepts argument which is an object describing all properties changed on the object.

## Settings
`useComputedStyle: boolean` if true styles diff is made on getComputedStyle which is slower then just compare element.style. By default is `true`.

`skipFrames: number` number of frames to skip after each check is done. By default is `0` which means no frames are going to be skipped and check happens on every frame. Skipping frames might be useful if you are looking to reduce amount of resources consumed. 
 
## License

MIT: http://mit-license.org/

Copyright 2017 Denis Radin aka [PixelsCommander](http://pixelscommander.com)

Project is a part of HTML-GL v2