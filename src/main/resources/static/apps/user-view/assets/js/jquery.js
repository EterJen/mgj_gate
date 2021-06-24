$(".tm").each(function () {
    var len = $(this).text().length; //当前HTML对象text的长度
    if (len > 100) {
        var str = "";
        str = $(this).text().substring(0, 160) + "......"; //使用字符串截取，获取前30个字符，多余的字符使用"......"代替
        $(this).html(str); //将替换的值赋值给当前对象
    }
});

$(".tpxw p a").each(function () {
    var len = $(this).text().length; //当前HTML对象text的长度
    if (len > 64) {
        var str = "";
        str = $(this).text().substring(0, 64) + "...【查看详情】"; //使用字符串截取，获取前30个字符，多余的字符使用"......"代替
        $(this).html(str); //将替换的值赋值给当前对象
    }
});
$(document).ready(function () {
    const dom2 = 1024;
    const bodywidth = document.body.clientWidth;

    

    if (bodywidth < dom2) {
        $("#a2").css({
            'display': 'block',

        });
    }
    


});

window.onscroll = handleScroll;
// 页面滚动
function handleScroll() {
    // 页面滚动高度
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    const dom = 180;
    const dom2 = 1024;
    const bodywidth = document.body.clientWidth;
    // 页面滚动高度大于元素距离顶部的距离时（即滚动到该元素）

    if (scrollTop > dom && bodywidth < dom2) {
        $("#a1").css({
            'display': 'block',

        });

    }
    if (scrollTop < dom) {
        $("#a1").css({
            'display': 'none',

        });

    }
    if (scrollTop < dom) {
        $("#a2").css({
            'background-position': 'top',

        });

    }
    if (scrollTop > dom) {
        $("#a2").css({
            'background-position': 'bottom',

        });

    }
    if (bodywidth < dom2) {
        $("#a1").css({
            'display': 'blcok',

        });

    }
    

}


$(document).ready(function () {


    $('.sidebar-mid').click(function () {
        $(".msck").css("display", "block");
        $(".sidebar").css("display", "block");
        document.body.style.overflow = 'hidden';
        document.addEventListener("touchmove", mo, false);
    });
    $('.msck').click(function () {
        $(".msck").css("display", "none");
        $(".sidebar").css("display", "none");
        document.documentElement.style.position = 'static';
        document.body.style.overflow = ''; //出现滚动条
    });



});
$('.list-left li').click(function () {
    $(this).addClass("list-left-sel").siblings().removeClass("list-left-sel");

});
