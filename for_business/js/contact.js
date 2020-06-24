$('#form_button').on('click', function() {

	// 必須項目チェック
	var personnel_name = $('input[name="personnel_name"]').val();
	var tel = $('input[name="tel"]').val();
	var email = $('input[name="email"]').val();
	var emailConfirm = $('input[name="email_conf"]').val();
	var inquiry_types = $('.inquiry_type:checked').map(function() {
	  return $(this).val();
	}).get();
	var comment = $('textarea[name="comment"]').val()

	if (
		personnel_name == "" ||
		email == "" ||
		emailConfirm == "" ||
		inquiry_types.length == 0
	) {
		alert('必須の項目を入力して下さい');
		return;
	}

	// 電話番号チェック
	// if (!tel.match(/^[0-9]+$/)) {
	// 	alert("電話番号はハイフンなしの半角数字で入力して下さい");
	// 	return;
	// }

	// メールアドレスチェック
	if(!email.match(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/)) {
		alert("正しいメールアドレスの形式ではありません");
		return;
	}

	if (email != emailConfirm){
		alert("メールアドレスが一致しません");
		return;
	}

	var url = 'https://hvosdt11y4.execute-api.ap-northeast-1.amazonaws.com/prd/mail';

	if ($.inArray(location.hostname, stagingDomains()) >= 0) {
		url = 'https://vvrdwv6pd2.execute-api.ap-northeast-1.amazonaws.com/stg/mail';
	}

	$.LoadingOverlay("show");

	// 問い合わせ送信
	$.ajax({
		url: url,
		type: 'POST',
		dataType:"json",
		accept: 'application/json',
		contentType: "application/json",
		crossDomain : true,
		data: JSON.stringify ({
				'personnel_name' : personnel_name,
				'tel'	: tel,
				'email'	: email,
				'inquiry_types'	: inquiry_types,
				'comment'	: comment,
				'ad_inflow' : isAdInflow(),
				'referrer' : location.hostname,
			})
	})
	.done( (data) => {
		location.href = "./complete.html";
	})
	.fail( (data) => {
		alert("送信に失敗しました。恐れ入りますが再送信をお願いします");
	})
	.always( (data) => {
		$.LoadingOverlay("hide");
	});
});
