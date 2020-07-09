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

});

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
