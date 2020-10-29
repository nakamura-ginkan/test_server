$(function(){

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
	});

	// 法人名
	$('[name=business_type]').change(function() {
		if ($(this).val() == 1) {
			$('[name=houjin_name]').show();
		} else {
			$('[name=houjin_name]').hide();
		}
	});
});