/* test.js */
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
  /* set basic as global variable, so the app can use its environments */
  window.basic=basic;
  /* initialize the basic */
  return basic[init]();
}
