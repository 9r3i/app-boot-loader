/* AppBootLoader.js */
;function AppBootLoader(host,appname){
this.version='1.2.2';
this.host=host;
this.app={
  version:1,
  name:appname,
  key:null,
};
this.data={
  version:0,
  style:[],
  script:[],
  constant:{},
};
/* initialize */
this.init=function(cb,dl,er){
  var data=this.database(),_this=this;
  cb=typeof cb==='function'?cb:function(r){
    return r.loadScript(ABL_START);
  };
  dl=typeof dl==='function'?dl:function(e){
    return _this.loader(e);
  };
  er=typeof er==='function'?er:function(e){
    return _this.error(e);
  };
  if(!data){
    return this.update(r=>{
      _this.updated=true;
      return _this.init(cb,dl);
    },dl,er);
  }this.data=data;
  this.app.version=data.version;
  if(!this.load(data)){
    this.database(false);
    return this.splash({
      status:'error',
      message:'Invalid app data.'
    });
  }
  if(this.updated){
    return cb(_this);
  }
  return this.push(r=>{
    return cb(_this);
  },dl);
};
/* load data */
this.load=function(r){
  if(typeof r==='object'&&r!==null
    &&typeof r.version==='number'
    &&Array.isArray(r.style)
    &&Array.isArray(r.script)
    &&typeof r.constant==='object'
    &&r.constant!==null){
    for(var i in r.constant){
      window[i]=r.constant[i];
    }
    for(var i in r.style){
      this.loadStyle(r.style[i].toString());
    }
    for(var i in r.script){
      this.loadScript(r.script[i].toString());
    }return true;
  }return false;
};
/* push to the loader */
this.push=function(cb,dl,i){
  cb=typeof cb==='function'?cb:function(){};
  dl=typeof dl==='function'?dl:function(e){
    return _this.loader(e);
  };
  i=typeof i==='number'?parseInt(i,0xa):0;
  var e={loaded:i,total:0x64,type:'progress'},
      _this=this;dl(e);
  return setTimeout(()=>{
    if(i>=e.total){return cb(true);}
    i+=Math.floor(Math.random()*0xb);
    i=Math.min(i,e.total);
    _this.push(cb,dl,i);
  },0x20);
};
/* console log */
this.log=function(e){
  this.splash(e);
  console.log(e);
};
/* error log */
this.error=function(e){
  var l=document.getElementById('abl-loader');
  if(l){
    var m=l.parentNode;
    m.parentNode.removeChild(m);
  }
  this.splash(e);
  console.error(e);
};
this.splash=function(e){
  var i='abl-splash',s='',
      n=document.getElementById(i);
  if(n){n.parentNode.removeChild(n);}
  n=this.buildElement('div',null,{id:i});
  n.appendTo(document.body);
  n.style.maxWidth='80vw';
  n.style.height='auto';
  n.style.maxHeight='80vh';
  n.style.backgroundColor='#fff';
  n.style.color='#555';
  n.style.boxShadow='0px 0px 3px #fff';
  n.style.position='fixed';
  n.style.zIndex='999999';
  n.style.top='10vh';
  n.style.left='-300vw';
  n.style.opacity='0.9';
  n.style.transition='all 0.3s ease 0s';
  n.style.overflow='hidden auto';
  n.style.whiteSpace='pre-wrap';
  n.style.textAlign='center';
  n.style.display='block';
  n.style.fontFamily='system-ui,monospace';
  n.style.fontSize='13px';
  n.style.margin='0px auto';
  n.style.padding='10px 20px';
  n.style.borderRadius='7px';
  n.style.border='1px solid #ddd';
  if(typeof e==='string'){
    s=e;
  }else if(typeof e==='object'&&e!==null
    &&e.hasOwnProperty('message')
    &&typeof e.message==='string'){
    s=(typeof e.status==='string'&&e.status=='error'
       &&!e.message.match(/^error/i)?'Error: ':'')
     +e.message;
  }else{
    s=JSON.stringify(e);
    n.style.textAlign='left';
    n.style.wordBreak='break-all';
    n.style.fontFamily='monospace';
    n.style.fontSize='11px';
  }
  n.innerText=s;
  var o=n.offsetWidth/2;
  setTimeout(()=>{
    if(n){n.style.left='calc(50vw - '+o+'px)';}
    setTimeout(()=>{
      if(n){n.style.top='-300vh';}
      setTimeout(()=>{
        if(n){n.parentNode.removeChild(n);}
      },0x64);
    },0xbb8);
  },0x20);
  return n;
};
this.loader=function(e){
  var q=Math.floor(e.loaded/e.total*0x64),
  p=(q.toString().match(/^\d+$/)?q:0)+'%',
  i='abl-loader',m=null,
  l=document.getElementById(i),
  r={
    parent:m,
    progress:l,
    loaded:e.loaded,
    total:e.total,
    type:e.type,
    id:i,
    percent:p,
  };
  if(l){
    l.style.width=p;
    m=l.parentNode;
    r.parent=m;
    if(e.loaded==e.total){
      m.parentNode.removeChild(m);
    }return r;
  }
  l=this.buildElement('div',null,{id:i}),
  m=this.buildElement('div',null,{},[l]);
  m.appendTo(document.body);
  r.parent=m;
  r.progress=l;
  l.style.width=p;
  l.style.height='5px';
  l.style.backgroundColor='#37b';
  l.style.boxShadow='0px 0px 3px #37b';
  l.style.position='fixed';
  l.style.zIndex='99999';
  l.style.top='0px';
  l.style.left='0px';
  m.style.width='100%';
  m.style.height='5px';
  m.style.backgroundColor='#ccc';
  m.style.boxShadow='0px 0px 3px #bbb';
  m.style.position='fixed';
  m.style.zIndex='99999';
  m.style.top='0px';
  m.style.left='0px';
  m.style.right='0px';
  return r;
};
/* get data */
this.update=function(cb,dl,er){
  var _this=this,
    time=(new Date).getTime(),
    token=(Math.floor(time/0x3e8)+0x12c).toString(0x24);
  cb=typeof cb==='function'?cb:function(){};
  dl=typeof dl==='function'?dl:function(e){
    return _this.loader(e);
  };
  er=typeof er==='function'?er:function(e){
    return _this.error(e);
  };
  /* ur,cb,dt,tx,hd,up,dl,er */
  this.post(this.toString(this.host),r=>{
    if(typeof r==='object'&&r!==null
      &&typeof r.version==='number'
      &&Array.isArray(r.style)
      &&Array.isArray(r.script)
      &&typeof r.constant==='object'
      &&r.constant!==null
      &&r.version>_this.data.version){
      _this.database(r);
      return cb(r);
    }return er(r);
  },{
    token:token,
    version:this.data.version,
    time:time,
    app:this.toString(this.app.name),
    key:this.toString(this.app.key),
  },false,null,null,dl,er);
};
/* get/set data */
this.database=function(data){
  var k='abl-data-'+this.app.name;
  if(typeof data==='object'&&data!==null){
    return localStorage.setItem(k,JSON.stringify(data));
  }else if(data===false){
    return localStorage.removeItem(k);
  }var dt=localStorage.getItem(k);
  if(!dt){return false;}
  var res=false;
  try{res=JSON.parse(dt);}catch(e){}
  return res;
};
/* remove all element */
this.removeAllElement=function(){
  var ch=document.head.childNodes,i=ch.length;
  while(i--){document.head.removeChild(ch[i]);}
  var cb=document.body.childNodes,i=cb.length;
  while(i--){document.body.removeChild(cb[i]);}
};
/* build element */
this.buildElement=function(tag,text,attr,children,html,content){
  var div=document.createElement(typeof tag==='string'?tag:'div');
  div.appendTo=function(el){
    if(typeof el.appendChild==='function'){
      el.appendChild(this);
      return true;
    }return false;
  };
  if(typeof text==='string'){
    div.innerText=text;
  }
  if(typeof attr==='object'&&attr!==null){
    for(var i in attr){
      div.setAttribute(i,attr[i]);
    }
  }
  if(Array.isArray(children)){
    for(var i=0;i<children.length;i++){
      div.appendChild(children[i]);
    }
  }
  if(typeof html==='string'){
    div.innerHTML=html;
  }
  if(typeof content==='string'){
    div.textContent=content;
  }
  div.args={
    tag:tag,
    text:text,
    attr:attr,
    children:children,
    html:html,
    content:content,
  };
  return div;
};
/* load style from string */
this.loadStyle=function(s){
  var c=document.createElement('style');
  c.rel='stylesheet';
  c.type='text/css';
  c.media='screen';
  c.textContent=s;
  document.head.appendChild(c);
  return c;
};
/* load script from string */
this.loadScript=function(s){
  if(typeof s!=='string'){return;}
  var j=document.createElement('script');
  j.type='text/javascript';
  j.async=true;
  j.textContent=s;
  document.head.appendChild(j);
  return j;
};
/* array of number --> to string */
this.toString=function(a){
  if(null===a){return (0x10faa9).toString(0x24);}
  if(typeof a===(0x4ea3aa4c3df5).toString(0x24)){
    return (0x4ea3aa4c3df5).toString(0x24);
  }
  if(typeof a===(0x55f57d43).toString(0x24)
    ||typeof a===(0x67e4c42c).toString(0x24)
    ||typeof a===(0x5ec2b639f).toString(0x24)
    ||typeof a===(0x1213796ebd7).toString(0x24)
    ||typeof a===(0x297e2079).toString(0x24)
    ||typeof a===(0x686136a5).toString(0x24)){
    return a.toString(0x24);
  }
  var r=String.raw({raw:[]});
  if(typeof a===(0x57a71a6d).toString(0x24)){
    for(var i in a){
      if(typeof a[i]===(0x57a71a6d).toString(0x24)){
        for(var o in a[i]){
          r+=String.fromCharCode(a[i][o]);
        }continue;
      }r+=this.toString(a[i]);
    }
  }return r;
};
/* post method stream */
this.post=function(ur,cb,dt,tx,hd,up,dl,er){
  ur=typeof ur==='string'?ur:ur===null?'null':ur.toString();
  cb=typeof cb==='function'?cb:function(){};
  dt=typeof dt==='object'&&dt!==null?dt:{};
  tx=typeof tx==='boolean'?tx:true;
  hd=typeof hd==='object'&&hd!==null?hd:{};
  up=typeof up==='function'?up:function(){};
  dl=typeof dl==='function'?dl:function(){};
  er=typeof er==='function'?er:cb;
  this.uniform=function(data){
    var ret=[];
    for(var d in data){
      if(typeof data[d]=='object'&&data[d]!==null){
        ret.push(this.uniform(data[d]));
      }else{
        ret.push(encodeURIComponent(d)+'='
          +encodeURIComponent(data[d]));
      }
    }return ret.join('&');
  };
  var xhr=new XMLHttpRequest();
  xhr.open('POST',ur,true);
  hd['Content-type']='application/x-www-form-urlencoded';
  for(var i in hd){xhr.setRequestHeader(i,hd[i]);}
  xhr.upload.onprogress=up;
  xhr.addEventListener('progress',dl,false);
  xhr.onreadystatechange=function(e){
    if(xhr.readyState==0x04){
      if(xhr.status==0xc8){
        var text=xhr.responseText?xhr.responseText:'';
        if(tx){return cb(text,xhr);}
        var res=null;
        try{res=JSON.parse(text);}catch(e){res=text;}
        return cb(res,xhr);
      }else if(xhr.status==0x00){
        return er('Error: No internet connection.',xhr);
      }return er('Error: '+xhr.status+' - '+xhr.statusText+'.',xhr);
    }else if(xhr.readyState<0x04){
      return false;
    }return er('Error: '+xhr.status+' - '+xhr.statusText+'.',xhr);
  };
  xhr.send(this.uniform(dt));
  return xhr;
};
};
