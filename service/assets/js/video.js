var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player( 'video', {
        height: '360',
        width: '640',
        videoId: 'r_j_k_1oyTQ',
        events: {
            'onReady': onPlayerReady,
        }
    } );
}

function onPlayerReady(event) {
    event.target.playVideo();
}

var video = $('.post__video_box');

$(window).on('scroll', function() {
    var scroll = $(this).scrollTop();
    var height = $(this).height();
    var offset = video.offset().top;
    var pos = offset - height + ( height / 4 );

    if ( scroll > pos ) {
        if ( !video.hasClass('started') ) {
            player.playVideo();

            setTimeout( function() {
                video.addClass('started');
            }, 3000);
        }
    }
})