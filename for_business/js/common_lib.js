$(function(){

	var ww = $(window).width();
	var wh = $(window).height();

	if($('.disp_switch').size() > 0){

		$('.disp_switch').parent('section:first-child').find('.disp_switch').addClass('opened');
		$('.disp_switch').parent('section:first-child').find('.inner').show();

		$('.disp_switch').click(function(){
			$(this).toggleClass('opened');
			$(this).next('.inner').slideToggle();
		});

	}

	$('.btn_back').click(function(){ history.back(); });

	// ページ内アンカー押したときの位置調整（ナビ固定のため）
	$('a[href^=#]').click(function(){
		var href = $(this).attr('href');
		if(href != '#pagetop'){
			var target = $(href == '#' || href == '' ? 'html' : href);
			var pos = target.offset().top;
			$('body,html').animate({scrollTop:pos}, 400, 'swing');
			return false;
		}else{
			$('body,html').animate({scrollTop:0}, 400, 'swing');
			return false;
		}
	});

	// オリジナルラジオボタン
	$('.radio_list li').each(function(i){
		if($('.radio_list li').eq(i).find('input').prop('checked') == true){
			$('.radio_list li').eq(i).addClass('active');
		}
	});

	// オリジナルラジオボタン押したとき
	$('.radio_list li').click(function(){
		$(this).siblings('li').removeClass('active');
		$(this).addClass('active');
	});

	// 固定コンテンツ
	$(window).scroll(function(){
		var wrapperH = $('#wrapper').height();
		var footerH = $('footer').height();
		var fixCH = $('#fixed_contact').height();
		var scH = wrapperH - wh + fixCH
		if ($(window).scrollTop() > scH) {
            $('#fixed_contact').css('position','relative');
        } else {
            $('#fixed_contact').css('position','fixed');
        }
	});

	// aタグにパラメータを引き回す
	$('a').click(function () {
		var href = $(this).attr('href');
		$(this).attr('href', href + location.search);
		return true;
	});

	// console-businessのドメイン
	$('a').each(function () {
		var href = $(this).attr('href');
		if ($.inArray(location.hostname, stagingDomains()) >= 0 && href) {
			var a = $(this).attr('href', href.replace('console-business.synchrolife.jp', 'crmstg.synchrolife.jp'));
			href = $(a).attr('href');
		}
		if ($.inArray(location.hostname, defaultDomains()) < 0 && href) {
			var subDomain = location.hostname.split(".");
			$(this).attr('href', href.replace(/synchrolife\.jp\/register$/, 'synchrolife.jp/register/contact/' + subDomain[0]));
		}
	});
});

/** クエリパラメータ取得 */
function getParams() {
	var params = [];
	var key = [];

	var location_search = location.search.substr(1).split('&');
	for (var i = 0; i < location_search.length; i++) {
		key = location_search[i].split("=");
		params[key[0]] = key[1];
	}
	return (params);
}

/** 広告流入であればtrue */
function isAdInflow() {
	var params = getParams();
	return params["referrer"] === "google" &&
		params["utm_campaign"] === "restaurants" &&
		params["utm_content"] === "business" &&
		params["utm_medium"] === "cpc" &&
		params["utm_source"] === "google";
}

/**
 * @returns {string[]}
 */
function defaultDomains() {
	return [
		"lp-business-dev.synchrolife.jp",
		"business.synchrolife.jp",
	]
}

/**
 * @returns {string[]}
 */
function stagingDomains() {
	return [
		"lp-business-dev.synchrolife.jp",
		"agency-test.synchrolife.jp",
	]
}

// $(window).on('load',function(){
// 
// 	var ww = $(window).width();
// 	var wh = $(window).height();
// 
// 	if($('#point_sec').size() > 0){ $('#point_sec dl').tile(3); }
// 	if($('#voice_sec').size() > 0){ $('#voice_sec .box').tile(3); }
// 
// 	// 遷移時にハッシュが付いてたときの位置調整（ナビ固定のため）
// 	var url = $(location).attr('href');
// 	var url_sp = url.split('?anc=');
// 	var hash = '#' + url_sp[url_sp.length - 1];
// 	var target  = $(hash);
// 	var pos = target.offset().top;
// 	$('html, body').animate({scrollTop:pos}, 400, 'swing');
// 
// });
