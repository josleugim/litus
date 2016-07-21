$(document).on("ready", function(){
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 30,
        loop: true
    });
    $(".navbar-header button.navbar-toggle").on("click", function(){
        if($(this).hasClass("collapsed")){
            $("header nav").css('height' , "300px");
        }else{
            $("header nav").css('height' , "90px");
        }
    });
})