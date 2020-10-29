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
	var referrer = location.hostname;

	if (!(personnel_name && email && emailConfirm && inquiry_types.length)) {
		alert('必須の項目を入力して下さい');
		return;
	}

	// 電話番号チェック
	// if (!tel.match(/^[0-9]+$/)) {
	// 	alert("電話番号はハイフンなしの半角数字で入力して下さい");
	// 	return;
	// }

	// メールアドレスチェック
	if (!email.match(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/)) {
		alert("正しいメールアドレスの形式ではありません");
		return;
	}

	if (email != emailConfirm){
		alert("メールアドレスが一致しません");
		return;
	}

	var messages = [];
	messages.push("加盟検討中の法人・個人向けの問い合わせ\n");
	messages.push("お名前：" + personnel_name);
	messages.push("電話番号：" + tel);
	messages.push("メールアドレス：" + email);
	messages.push("お問い合わせ種別：");
	$(".inquiry_type:checked").each((i, v) => {
		messages.push("　　" + $(v).parent('label').text());
	});
	messages.push("お問い合わせ内容：" + comment + "\n");
	messages.push("送信元：" + referrer);

	var url = consoleBusinessUrl() + "/lp/contact";

	$.LoadingOverlay("show");

	var adInflow = adInflowReferrer();

	// 問い合わせ送信
	$.ajax({
		url: url,
		type: 'POST',
		dataType:"json",
		accept: 'application/json',
		contentType: "application/json",
		crossDomain : true,
		data: JSON.stringify ({
				'email'	: email,
				'contact_name' : personnel_name,
				'subject': '加盟店LPサイトからお問い合わせがありました',
				'message': messages.join("\n"),
				'origin': adInflow ? 4 : 3,
				'referrer' : referrer,
				'adInflow': adInflow,
			})
	})
	.done(data => {
		location.href = "./complete.html";
	})
	.fail(data => {
		alert("送信に失敗しました。恐れ入りますが再送信をお願いします");
	})
	.always(data => {
		$.LoadingOverlay("hide");
	});
});
