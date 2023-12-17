/* start.js */
function initialize(mtd=0x02){
  /* set _basic as global variable, so the app can use its environments */
  window._basic=new AppBasic;
  new AppCode;
  /* initialize the basic */
  return _basic.init(mtd);
}

