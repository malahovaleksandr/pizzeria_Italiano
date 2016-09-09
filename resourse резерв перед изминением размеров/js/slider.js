$(document).ready(function(){
        console.log('подключен slider ');
    });


var i=1,
    intervalSlide=10000;

//автоматическое перелистывание
var interval= setInterval(function(){
    console.log('interval work');
    slide();
    if(i==2){
        i=-1;
    }
    ++i;
},intervalSlide);

//при нажатии влево сработает перемотка
 $('.slider_arrow-left').on('click',function(){
     console.log('left ');
     slide();
     if(i==2){
         i=-1;
     }
     ++i;
 });

//при нажатии вправо сработает перемотка
$('.slider_arrow-right').on('click',function(){
    slide();
    if(i<0){
        i=2;
    }
    --i;
});

//функция для перелистывания слайда если нажимать на стрелки
function slide (){
     var   container=$('.slider-contant'),//находим контейнер в котором все слайды
           item=container.find('.slider_layer'),//находим все li со слайдами
           activSlide=container.find('.slider-layer_activ');//находим слайд с активным классом

    activSlide.removeClass('slider-layer_activ');//удаляем актив класс у Li которая была видна
    item.eq(i).addClass('slider-layer_activ');//добавляем активный класс
}





















//первый вариант
// var i=1,
//     intervalSlide=10000;
//
// //автоматическое перелистывание
// var interval= setInterval(function(){
//     console.log('interval work');
//     slide();
//     if(i==2){
//         i=-1;
//     }
//     ++i;
// },intervalSlide);
//
// //при нажатии влево сработает перемотка
//  $('.slider_arrow-left').on('click',function(){
//      console.log('left ');
//      slide();
//      if(i==2){
//          i=-1;
//      }
//      ++i;
//  });
//
// //при нажатии вправо сработает перемотка
// $('.slider_arrow-right').on('click',function(){
//     slide();
//     if(i<0){
//         i=2;
//     }
//     --i;
// });
//
// //функция для перелистывания слайда если нажимать на стрелки
// function slide (){
//      var   container=$('.slider-contant'),//находим контейнер в котором все слайды
//            item=container.find('.slider_layer'),//находим все li со слайдами
//            activSlide=container.find('.slider-layer_activ');//находим слайд с активным классом
//
//     activSlide.removeClass('slider-layer_activ');//удаляем актив класс у Li которая была видна
//     item.eq(i).addClass('slider-layer_activ');//добавляем активный класс
// }
