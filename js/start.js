/* start.js */
function initialize(method){
  /* set _basic as global variable, so the app can use its environments */
  window._basic=new AppBasic;
  /* initialize the basic */
  return _basic.init(method);
}

