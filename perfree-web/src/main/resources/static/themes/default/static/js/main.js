new WOW().init();
const colors = ["rgb(103, 204, 134)","rgb(52, 152, 219)","rgb(251, 155, 95)","rgb(244, 126, 96)","rgb(225, 91, 100)","rgb(132, 155, 135)","rgb(143, 197, 4)"];


$('.d-category-item > span').each(function(){
    $(this).css("background-color", colors[RandomNum(0,6)]);
});

$('.d-tag-item').each(function(){
    $(this).css("background-color", colors[RandomNum(0,6)]);
});




function RandomNum(Min,Max){
    var Range = Max - Min;
    var Rand = Math.random();   
    var num = Min + Math.round(Rand * Range);
    return num;
}
