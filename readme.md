
[![Author](https://img.shields.io/badge/author-9r3i-lightgrey.svg)](https://github.com/9r3i)
[![License](https://img.shields.io/github/license/9r3i/app-boot-loader.svg)](https://github.com/9r3i/app-boot-loader/blob/master/license.txt)
[![Forks](https://img.shields.io/github/forks/9r3i/app-boot-loader.svg)](https://github.com/9r3i/app-boot-loader/network)
[![Stars](https://img.shields.io/github/stars/9r3i/app-boot-loader.svg)](https://github.com/9r3i/app-boot-loader/stargazers)
[![Issues](https://img.shields.io/github/issues/9r3i/app-boot-loader.svg)](https://github.com/9r3i/app-boot-loader/issues)
[![Release](https://img.shields.io/github/release/9r3i/app-boot-loader.svg)](https://github.com/9r3i/app-boot-loader/releases)
[![Package](https://img.shields.io/npm/v/app-boot-loader.svg?label=version)](https://www.npmjs.com/package/app-boot-loader)


# AppBootLoader

Whatever it is, I want to call it <strong>AppBootLoader</strong>.
I use this to build a simple remote app, especially for android app using cordova, so I don't have to upload package and be reviewed each time I update the code.


# Usage
```js
const app=new AppBootLoader(<hostname>, <appname>, [method:post]);
app.init();
```
Parameter method is optional between post and get, default: post


# Using AppBasic.js
```js
function initialize(method){
  /* set _basic as global variable, so the app can use its environments */
  window._basic=new AppBasic;
  /* initialize the basic */
  return _basic.init(method);
}
```
HTML meta tag must be add some configurations
```html
<meta name="apphost" content="https://9r3i.github.io/app-boot-loader/base/test.app" />
<meta name="appmethod" content="get" />
<meta name="appname" content="test" />
```
See more detail sample in index.html


# Sample Page

[https://9r3i.github.io/app-boot-loader/](https://9r3i.github.io/app-boot-loader/)


# Changes

From v1.2.2.210

### Changes of AppBootLoader.js v1.3.0
* add get method of stream to help static host
* optimize method uniform, the http query builder, being recursively
* add module type in app data
* add parameter method as optional, default: post

### Changes of AppBasic.js v220
* add optional stream method in constructor parameter, default: post
* add optional initialize method 0-2, default: 0
* add apphost meta tag, could be overwritten by parameter host
* add appmethod meta tag, could be overwritten by parameter method

### Others
* add start.js and remove test.js
* remove test.html, test page in index.html
* add static host with method get



