/* AppBasic.js -- requires AppBootLoader.js */
;function AppBasic(host,method){
this.version=230;
/* get appname from html meta tag */
this.meta={
  name:document.querySelector('meta[name="appname"]'),
  host:document.querySelector('meta[name="apphost"]'),
  method:document.querySelector('meta[name="appmethod"]'),
};
this.config={
  appname:this.meta.name?this.meta.name.content:'',
  host:this.meta.host?this.meta.host.content:[
    0x1c8ecb0,[0x3a,0x2f,0x2f],0xa34d03540b3e6,
    [0x2e],0x4036,[0x2f],0x3636,[0x2f],0x80b5e,[0x2f]
  ],
  method:this.meta.method?this.meta.method.content:'post',
};
alert(JSON.stringify({
  meta:this.meta.host,
  config:this.config.host,
}));
this.abl=new AppBootLoader(
  this.config.host,
  this.config.appname,
  this.config.method
);
this.progress=this.abl.buildElement('progress');
this.percent=this.abl.buildElement('span','0% Loading...');
this.section=null;
this.parent=null;
this.loaded=null;
/* initializing */
this.init=function(method){
  var methods=[
    'initDefault',
    'initSplashScreenLoader',
    'initCircleProgress'
  ],
  init=typeof method==='number'
    &&methods.hasOwnProperty(method)
    ?methods[method]:methods[0];
  return this[init]();
};
/* loader */
this.loader=function(e){
  var cent=Math.floor(e.loaded/e.total*100);
  this.progress.value=e.loaded;
  this.progress.max=e.total;
  this.percent.innerText=
    (cent.toString().match(/^\d+$/)?cent:0)+'% Loading...';
};
/* silent method */
this.silent=function(){
  return false;
};
/* silent update */
this.update=function(){
  return this.abl.update(this.silent,this.silent,this.silent);
};
/* default initializing */
this.initDefault=function(){
  var _abl=this.abl,_this=this;
  /* prepare loader element */
  this.section=this.abl.buildElement('div',null,{
    'class':'abl-loader',
    'id':'abl-loader'
  },[this.progress,this.percent]);
  this.section.appendTo(document.body);
  this.parent=this.section.parentNode;
  this.loaded=function(){
    this.parent.removeChild(this.section);
  };
  /* do silent update in 7 seconds */
  setTimeout(()=>{
    return _this.update();
  },0x1b58);
  /* initialize AppBootLoader */
  return this.abl.init(r=>{
    _this.loaded();
    var script=typeof ABL_START==='string'
     ?ABL_START:'alert("loaded!")';
    return r.loadScript(script);
  },e=>{
    return _this.loader(e);
  },e=>{
    return _abl.splash(e);
  });
};
/* initialize using SplashScreenLoader.js */
this.initSplashScreenLoader=function(){
  var _abl=this.abl,_this=this;
  /* do silent update in 7 seconds */
  setTimeout(()=>{
    return _this.update();
  },0x1b58);
  /* initialize SplashScreenLoader */
  var ssl=new SplashScreenLoader;
  ssl.open();
  ssl.toListening();
  /* initialize AppBootLoader */
  return this.abl.init(r=>{
    ssl.close();
    var script=typeof ABL_START==='string'
       ?ABL_START:'alert("loaded!")';
    return r.loadScript(script);
  },e=>{
    return ssl.loading(e);
  },e=>{
    ssl.close();
    return _abl.splash(e);
  });
};
/* initialize using CircleProgress.js */
this.initCircleProgress=function(){
  var _abl=this.abl,_this=this;
  /* do silent update in 7 seconds */
  setTimeout(()=>{
    return _this.update();
  },0x1b58);
  /* initialize CircleProgress */
  var cp=new CircleProgress;
  cp.open();
  /* initialize AppBootLoader */
  return this.abl.init(r=>{
    setTimeout(()=>{
      cp.close();
      var script=typeof ABL_START==='string'
        ?ABL_START:'alert("loaded!")';
      return r.loadScript(script);
    },0x64);
  },e=>{
    return cp.loading(e);
  },e=>{
    cp.close();
    return _abl.splash(e);
  });
};
};


