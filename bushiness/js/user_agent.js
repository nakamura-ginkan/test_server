(function(){

    var ua = navigator.userAgent.toUpperCase();
    var url = document.location.pathname;
    var spUrl = '/sp/index.html';

    (ua.indexOf('IPHONE') != -1 || (ua.indexOf('ANDROID') != -1 && ua.indexOf('MOBILE') != -1))?
        isSP() :
        isPC();

    function isSP(){
        if(url.match(spUrl)){
            return false;
        }else{
            location.href = spUrl;
        }
    }

    function isPC(){
        if(!url.match(spUrl)){
            return false;
        }else{
            location.href = '/index.html';
        }
    }

}());
