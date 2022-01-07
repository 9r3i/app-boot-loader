/* SplashScreenLoader.js */
;function SplashScreenLoader(){
this.version='1.0.0';
this.loader=null;
this.text='Loading...';
this.textLoaded='Loaded.';
this.init=function(){
  this.loader=this.create();
  return this;
};
this.test=function(cb,rm){
  this.open();
  this.toListening();
  var _this=this;
  setTimeout(()=>{
    _this.toLoading();
    setTimeout(()=>{
      _this.toLoaded(cb,rm);
    },0x5dc);
  },0x5dc);
  return this;
};
this.loading=function(e){
  this.noListening();
  this.noLoading();
  this.noLoaded();
  var p=Math.floor(e.loaded/e.total*0x64);
  p=p.toString().match(/^\d+$/)?p:0x00;
  var q=p+'%';
  this.loader.text.dataset.text=q+' '
    +(p===0x64?this.textLoaded:this.text);
  this.loader.progress.style.width=q;
  return true;
};
this.open=function(){
  document.body.appendChild(this.loader.main);
  return true;
};
this.close=function(){
  this.loader.main.parentNode.removeChild(this.loader.main);
  this.loader.progress.style.removeProperty('width');
  this.noListening();
  this.noLoading();
  this.noLoaded();
  return true;
};
this.noLoaded=function(){
  if(this.loader.main.classList.contains('splash-screen-loaded')){
    this.loader.main.classList.remove('splash-screen-loaded');
  }
  if(this.loader.main.classList.contains('splash-screen-text-loaded')){
    this.loader.main.classList.remove('splash-screen-text-loaded');
  }
  this.loader.text.dataset.text=this.text;
  return true;
};
this.toLoaded=function(cb,rm){
  this.noLoading();
  this.noListening();
  this.loader.main.classList.add('splash-screen-loaded');
  this.loader.text.classList.add('splash-screen-text-loaded');
  this.loader.text.dataset.text=this.textLoaded;
  if(typeof cb==='function'){cb(this);}
  return rm===false?true:this.close();
};
this.noListening=function(){
  if(this.loader.main.classList.contains('splash-screen-listening')){
    this.loader.main.classList.remove('splash-screen-listening');
  }return true;
};
this.toListening=function(){
  this.noLoading();
  this.noLoaded();
  this.loader.main.classList.add('splash-screen-listening');
  return true;
};
this.noLoading=function(){
  if(this.loader.main.classList.contains('splash-screen-loading')){
    this.loader.main.classList.remove('splash-screen-loading');
  }return true;
};
this.toLoading=function(){
  this.noListening();
  this.noLoaded();
  this.loader.main.classList.add('splash-screen-loading');
  return true;
};
this.create=function(){
  var main=document.createElement('div'),
  loader=document.createElement('div'),
  progress=document.createElement('div'),
  text=document.createElement('div');
  main.appendChild(text);
  main.appendChild(loader);
  loader.appendChild(progress);
  main.classList.add('splash-screen');
  text.classList.add('splash-screen-text');
  loader.classList.add('splash-screen-loader');
  progress.classList.add('splash-screen-progress');
  text.dataset.text=this.text;
  return {
    main:main,
    loader:loader,
    progress:progress,
    text:text,
  };
};
return this.init();
};


