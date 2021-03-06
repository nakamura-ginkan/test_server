function modal() {
    var btn = $('.btn__modal');
    var modal = $('.modal');
    var close = $('.modal__close');
    var target = $('html,body');

    btn.on('click', function() {
        modal.fadeIn();
        target.css('overflow','hidden');
    })

    close.on('click', function() {
        modal.fadeOut();
        target.css('overflow','auto');
    })
}

function changeBtn() {
    var ua = navigator.userAgent;
    var app = $('.btn_app');
    var play = $('.btn_play');

    if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('iPad') > 0) {
        app.each( function() {
            $(this).addClass('show');
        })
    } else if (ua.indexOf('Android') > 0) {
        play.each( function() {
            $(this).addClass('show');
        })
    } else {
        app.addClass('show');
        play.addClass('show');
    }
}

$( function() {
    modal();
    changeBtn();
})
