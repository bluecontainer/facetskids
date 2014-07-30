!function ($) {
    $(function () {
        // carousel demo
        $('#myCarousel').carousel({
            interval: 5000
        })

        $('#myCarousel').on('slid.bs.carousel', function () {
            $('body').css('background-color', $('.item.active').css('background-color'));
        });
        $('body').css('background-color', $('.item.active').css('background-color'));

    })
}(window.jQuery)

$(document).ready(function () {
    $("#myCarousel").swiperight(function () {
        $("#myCarousel").carousel('prev');
    });
    $("#myCarousel").swipeleft(function () {
        $("#myCarousel").carousel('next');
    });
});


