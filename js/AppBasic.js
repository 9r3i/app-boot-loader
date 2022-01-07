/* AppBasic.js -- requires AppBootLoader.js */
;function AppBasic(host){
this.version=210;
/* get appname from hatm meta tag */
this.meta=document.querySelector('meta[name="appname"]');
this.appname=this.meta?this.meta.content:'';
this.abl=new AppBootLoader(host,this.appname);
this.progress=this.abl.buildElement('progress');
this.percent=this.abl.buildElement('span','0% Loading...');
this.section=null;
this.parent=null;
this.loaded=null;
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


