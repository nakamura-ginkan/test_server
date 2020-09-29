var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player( 'video', {
        height: '360',
        width: '640',
        videoId: 'M7lc1UVf-VE',
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
        player.playVideo();
    } else {
        player.pauseVideo();
    }
})