(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.StyleObserver = {}));
}(this, function (exports) { 'use strict';

	strict.custom = custom;
	var objectDiff = strict;

	function strict() {
	  return diff(null, [].slice.call(arguments, 0));
	}

	function custom(opts) {
	  return diff(opts, [].slice.call(arguments, 1));
	}

	function diff(opts, subjects) {
	  var length = subjects.length;
	  var ref = subjects[0];
	  var diff = {};
	  var equal = opts && opts.equal || isStrictEqual;
	  var c;
	  var keys;
	  var keysLength;
	  var key;
	  var u;

	  for (var i = 1; i < length; i++) {
	    c = subjects[i];
	    keys = Object.keys(c);
	    keysLength = keys.length;

	    for (u = 0; u < keysLength; u++) {
	      key = keys[u];
	      if (!equal(c[key], ref[key])) diff[key] = c[key];
	    }
	  }

	  return diff;
	}

	function isStrictEqual(a, b) {
	  return a === b;
	}

	var StyleObserver = /** @class */ (function () {
	    //Callback accepts three parameters: diff, prevStyle, nextStyle
	    function StyleObserver(callback) {
	        this.step = 0;
	        this.settings = {
	            useComputedStyle: true,
	            skipFrames: 0,
	        };
	        this.callback = callback;
	        this.styleObject = null;
	        this.diff = null;
	        this.update = this.update.bind(this);
	    }
	    StyleObserver.prototype.observe = function (targetNode, settings) {
	        this.settings = Object.assign(this.settings, settings);
	        this.node = targetNode;
	        this.update();
	    };
	    StyleObserver.prototype.update = function () {
	        if (this.node) {
	            if (this.step === 0) {
	                var styleData = {};
	                if (this.settings.useComputedStyle) {
	                    styleData = this.getStyleData();
	                }
	                else {
	                    styleData = this.getStyleDataQuick();
	                }
	                //Cloning object
	                var nextStyleObject = JSON.parse(JSON.stringify(styleData));
	                //Skip comparsion for first time when oldStyleObject is undefined
	                if (this.styleObject) {
	                    this.diff = objectDiff(this.styleObject, nextStyleObject);
	                }
	                this.styleObject = nextStyleObject;
	                if (this.diff && Object.keys(this.diff).length) {
	                    this.callback(this.diff, this.styleObject, nextStyleObject);
	                }
	            }
	            this.step = this.step < this.settings.skipFrames ? this.step + 1 : 0;
	            this.raf = requestAnimationFrame(this.update);
	        }
	    };
	    StyleObserver.prototype.getStyleDataQuick = function () {
	        return this.node.style;
	    };
	    StyleObserver.prototype.getStyleData = function () {
	        return window.getComputedStyle(this.node, null);
	    };
	    StyleObserver.prototype.dispose = function () {
	        cancelAnimationFrame(this.raf);
	        this.node = null;
	        this.callback = null;
	    };
	    return StyleObserver;
	}());
	window.StyleObserver = StyleObserver;

	exports.StyleObserver = StyleObserver;
	exports.default = StyleObserver;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
