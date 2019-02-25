$(document).ready(function() {

    /*$(".navbar-toggle").click((function () {
        if($(".drop_menu_xs").css('display') == "none")
            $(".drop_menu_xs").css('display', 'block');
        else{
            $(".drop_menu_xs").css('display', 'none');
            $(".dropdown_menu").css('display', 'none');
        }
    }));*/


    $("#navigation").on("click","a", function (event) {
        //отменяем стандартную обработку нажатия по ссылке
        event.preventDefault();

        //забираем идентификатор бока с атрибута href
        var id  = $(this).attr('href'),

        //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top;

        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({scrollTop: top}, 1500);
    });

    $(".slide1-vstrip--button").on("click", function (event) {
        //отменяем стандартную обработку нажатия по ссылке
        event.preventDefault();

        //забираем идентификатор бока с атрибута href
        var id  = $(this).attr('href'),

        //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top;

        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({scrollTop: top}, 1500);
    });


    navi();
});

function navi() {
    var zonesAdd = [
        "slide2",
        "slide3"
    ];
    for (var i = 1; i <= 3; i++) {
        var zoneName = "slide" + i;
        var zone = document.getElementById(zoneName).getBoundingClientRect();
        var flag = true;
        var counter = 0;
        for (var j = 1; j <= 3; j++) {
            var circle = document.getElementById("dot" + j).getBoundingClientRect();
            if (circle.y >= zone.y && circle.y + circle.height < zone.y + zone.height) {
                var name = "#link-slide" + j;
                if (zonesAdd.indexOf(zoneName) >= 0) {
                    if ($(name).hasClass("link-control--active")) {
                        $(name).addClass("blue-navigation--active");
                        $(name).removeClass("blue-navigation");
                    } else {
                        $(name).addClass("blue-navigation");
                        $(name).removeClass("blue-navigation--active");
                    }
                } else {
                    $(name).removeClass("blue-navigation--active");
                    $(name).removeClass("blue-navigation");
                }
            } else {
                counter++;
                /*flag = false;*/
            }
        }

        if(counter == 0){

            for (var k = 1; k <= 3; k++) {

                if(k == i){
                    $("#link-slide" + k).addClass("link-control--active");
                    $("#link-slide" + k).removeClass("link");
                } else{
                    $("#link-slide" + k).removeClass("link-control--active");
                    $("#link-slide" + k).addClass("link");
                }

            }
        }
    }
}

$(window).scroll(navi);

$(window).load(function(){
    $('.flexslider').flexslider({
        animation: "slide",
        animationLoop: true,
        itemWidth: 340,
        itemMargin: 10,
        controlNav: true,
        pausePlay: false,
        prevText: "",
        nextText: "",
        start: function(slider){
            $('body').removeClass('loading');
        }
    });
});


