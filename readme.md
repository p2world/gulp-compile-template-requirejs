# [gulp](https://github.com/wearefractal/gulp)-compile-template-requirejs

> Compile [Underscore templates](http://underscorejs.org/#template) too).

## Synopsis

Compile tpl file into a js file, ready for use with requirejs

## Install

Install with [npm](https://www.npmjs.org/package/gulp-template-compile)

```
npm install --save-dev gulp-compile-template-requirejs
```

## Example

### `gulpfile.js`

```js
var gulp = require('gulp');
var template = require('gulp-compile-template-requirejs');

gulp.task('default', function () {
	gulp.src('src/*.tpl')
		.pipe(template())
		.pipe(gulp.dest('dist'));
});
```
### `header.tpl`
```html
<h1>Hello World</h1>
```

### `header.js`
```js
define('path/header', function () { return function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<h1>Hello World</h1>\n';
}
return __p;
}; });

```

### `view.js`
```js
define(['marionette', 'path/header'], function (Marionette, HeaderTemplate) {
    "use strict";
    var HeaderView = Marionette.LayoutView.extend({
        template: HeaderTemplate
    });
});

```

