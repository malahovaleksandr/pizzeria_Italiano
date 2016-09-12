$(document).ready(function(){
    console.log('подключен hide_menu ');
});
var humburger=$('.header__nav_svg-burger'),
    close_hide_Menu=$('.header__nav_svg-burger_close'),
    hide_menu=$('.menu-tel'),
    testHide=1;//показатель когда показывать и прятать меню

humburger.on('click',function(){//показать меню
           if(testHide==1){
               hide_menu.fadeIn(10);
               hide_menu.animate({
                   'right': '0'
               });
               testHide=0;
           }

});
close_hide_Menu.on('click',function(){//спрятать меню
    if(testHide==0){
        hide_menu.animate({
            'right':'-100%'
        });
        hide_menu.fadeOut();
        testHide=1;
    }

});
