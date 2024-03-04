var intervalID = null, timeID = null;

window.addEventListener('scroll',function () {
  if(timeID != null) clearTimeout(timeID);

  timeID = setTimeout(function () {
    displayScrollButton();
    timeID = null;
  }, 500);
});

function displayScrollButton() {
  if(window.pageYOffset > 100){
    document.querySelector('#backToTop').style.display = 'inline-flex';
  }else{
    document.querySelector('#backToTop').style.display = 'none';
  }
}


function smoothScroll(target) {
  if(intervalID != null) return;
  if(typeof target == 'string') target = document.querySelector(target);

  // 要素のY座標取得
  target.rect = target.getBoundingClientRect();
  target.posY = target.rect.top + window.pageYOffset;

  // スクロール方向
  var dir  = (target.posY < window.pageYOffset) ? -1: +1;
  // スクロール量
  var move = 20 * dir;
  // 合計スクロール量 
  var totalScroll = window.pageYOffset;

  intervalID = setInterval(function () {

    // 終了判定
    if( (dir == +1 && totalScroll >= target.posY) ||
        (dir == -1 && totalScroll <= target.posY) ) {

      // 位置合わせ
      window.scrollTo(0,target.posY);

      clearInterval(intervalID);
      intervalID = null;
      return;
    }

    window.scrollBy(0,move);
    totalScroll += move;

  }, 10);
}