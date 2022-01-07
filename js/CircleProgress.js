/* CircleProgress.js */

;function CircleProgress(){
this.version='1.0.0';
this.loader=null;
this.isListening=false;
this.init=function(){
  this.loader=this.create();
  this.toListening();
  return this;
};
this.test=function(cb,i){
  i=i?i:0x00;
  if(i>0x64){
    if(typeof cb=='function'){
      return cb(this);
    }return this.close();
  }
  this.loading({
    loaded:i,
    total:0x64,
  });
  i++;
  var _this=this;
  setTimeout(()=>{
    _this.test(cb,i);
  },0x0a);
};
this.noListening=function(){
  if(!this.isListening){return false;}
  this.setValue(0x00);
  this.isListening=false;
  if(this.loader.circle.classList.contains('circle-progress-listening')){
    this.loader.circle.classList.remove('circle-progress-listening');
  }return true;
};
this.toListening=function(){
  this.isListening=true;
  this.loader.circle.classList.add('circle-progress-listening');
  return true;
};
this.loading=function(e){
  this.noListening();
  var p=Math.floor(e.loaded/e.total*0x64);
  return this.setValue(p);
};
this.open=function(){
  document.body.appendChild(this.loader.main);
  return true;
};
this.close=function(){
  this.loader.main=this.loader.main.parentNode.removeChild(this.loader.main);
  return true;
};
this.setValue=function(percent){
  percent=Math.max(0x00,Math.min(parseInt(percent,0x0a),0x64));
  var circum=this.loader.circle.r.baseVal.value*0x02*Math.PI;
  this.loader.circle.style.strokeDasharray=`${circum} ${circum}`;
  this.loader.circle.style.strokeDashoffset=circum-percent/0x64*circum;
  this.loader.text.innerText=percent+'%';
  return true;
};
this.create=function(){
  var main=document.createElement('div'),
  text=document.createElement('div');
  main.innerHTML=this.svg();
  var svg=main.querySelector('svg'),
  circle=main.querySelector('circle');
  main.classList.add('circle-progress');
  text.classList.add('circle-progress-text');
  main.appendChild(text);
  text.innerText='0%';
  return {
    main:main,
    svg:svg,
    circle:circle,
    text:text,
  };
};
this.svg=function(){
  return '<svg class="circle-progress-ring" width="100" height="100">'
    +'<circle class="circle-progress-ring-circle" stroke="#59d" '
      +'stroke-width="9" fill="transparent" r="42" cx="50" cy="50" />'
    +'</svg>';
};
return this.init();
};


