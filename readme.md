# app-boot-loader
Whatever it is, I want to call it AppBootLoader.
I use this to build a simple remote app, especially for android app using cordova, so I don't have to upload package and be reviewed each time I update the code.

# Usage
```js
const app=new AppBootLoader(<hostname>, <appname>);
app.init();
```

# Using AppBasic.js
```js
function initialize(method){
  var methods=[
    'initDefault',
    'initSplashScreenLoader',
    'initCircleProgress'
  ],
  init=typeof method==='number'
    &&methods.hasOwnProperty(method)
    ?methods[method]:methods[0],
  host='https://9r3i.web.id/api/base/',
  basic=new AppBasic(host);
  window.basic=basic;
  return basic[init]();
}
```

# Sample Page

[https://9r3i.github.io/app-boot-loader/](https://9r3i.github.io/app-boot-loader/)


