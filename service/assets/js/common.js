
function changeBtn() {
    var ua = navigator.userAgent;
    var app = $('.btn_app');
    var play = $('.btn_play');

    if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('iPad') > 0) {
        app.each(function () {
            $(this).addClass('show');
        })
    } else if (ua.indexOf('Android') > 0) {
        play.each(function () {
            $(this).addClass('show');
        });
    } else {
        app.addClass('show');
        play.addClass('show');
    }
}

function gridMasonry() {
    var grid = $('#review_grid');

    grid.masonry({
        itemSelector: '.review__item',
        gutter: '.gutter-sizer',
        isFitWidth: true
    });
}

$( function() {
    changeBtn();
    gridMasonry();
})
