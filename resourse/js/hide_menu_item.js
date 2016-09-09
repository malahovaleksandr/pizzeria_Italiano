$(document).ready(function(){
    console.log('подключен hide_menu ');
});
var humburger=$('.header__nav_svg-burger'),
    hide_menu=$('.wrapper__header__nav'),
    testHide=1;//показатель когда показывать и прятать меню

humburger.on('click',function(){
    if(controlAnimate==1){

        if(testHide>0)
        {
            hide_menu.fadeIn(10);
            hide_menu.animate({
                'right':'0'
            });
            testHide=0;
        }
        else{
            hide_menu.animate({
                'right':'-100%'
            });
            hide_menu.fadeOut();
            testHide=1;
        }
    }
});