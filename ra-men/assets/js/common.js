function shopsViewall() {
    var btn = $('.btn__view_all');
    var arrow = $('.btn__view_arrow');
    var list = $('.shops__list_hide');

    btn.on('click', function() {
        if ( $(this).hasClass('on') ) {
            $(this).removeClass('on');
            list.slideUp();
            arrow.text('もっと見る');
        } else {
            $(this).addClass('on');
            list.slideDown();
            arrow.text( '閉じる' );
        }
    })
}

function changeBtn() {
    var ua = navigator.userAgent;
    var app = $('.btn_app');
    var play = $('.btn_play');
    var qr = $('.btn_qr');

    if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('iPad') > 0) {
        app.each( function() {
            $(this).addClass('show');
        })
    } else if (ua.indexOf('Android') > 0) {
        play.each( function() {
            $(this).addClass('show');
        });
    } else {
        app.addClass('show');
        play.addClass('show');
        qr.addClass('show');
    }
}

$( function() {
    shopsViewall();
    changeBtn();
})