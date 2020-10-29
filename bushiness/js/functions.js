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

/** shop_crm */
function consoleBusinessUrl() {
    if ($.inArray(location.hostname, stagingDomains()) >= 0) {
        return 'https://crmstg.synchrolife.jp';
    }
    return 'https://console-business.synchrolife.jp';
}

/** 代理店識別子 */
function agencyIdentifier() {
    if ($.inArray(location.hostname, defaultDomains()) < 0) {
        return location.hostname.split(".")[0];
    }
    return "";
}

/** 広告流入であればtrue */
function adInflowReferrer() {
    var params = getParams();
    return params["referrer"];
}

/**
 * @returns {string[]}
 */
function defaultDomains() {
    return [
        "lp-business-dev.synchrolife.jp",
        "business.synchrolife.jp",
    ];
}

/**
 * @returns {string[]}
 */
function stagingDomains() {
    return [
        "lp-business-dev.synchrolife.jp",
        "agency-test.synchrolife.jp",
    ];
}

/** GAイベント */
function sendNewsClickEvent(news_title) {
    gtag('event', 'ニュースを押した', {
        'event_category': '加盟店LP',
        'event_label': news_title
    });
}

function sendCaseClickEvent(case_title) {
    gtag('event', '加盟店導入事例を押した', {
        'event_category': '加盟店LP',
        'event_label': case_title
    });
}

/** 加盟店仮申し込み */
function shopRegisterAction() {

    $(".message_area").hide();

    var t = $("#shopRegister");
    var r = "";

    // 広告流入
    var adInflow = adInflowReferrer();
    if (adInflow) {
        r += "&ad_inflow=" + adInflow;
    }

    // 代理店識別子
    var a = agencyIdentifier();
    if (a !== "") {
        r += "&agency_identifier=" + a;
    }

    //GAイベント発火
    gtag('event', '今すぐ申し込むボタンを押した', {
        'event_category': '加盟店LP',
        'event_label': $("#shop_name").serialize() + r
    });

    var url = consoleBusinessUrl();
    $.LoadingOverlay("show");

    // Submit
    $.ajax({
        url: url + "/register/user/mail",
        type: "POST",
        data: t.serialize() + r,
        dataType: "json",
        accept: "application/json",
        timeout: 5000,
        crossDomain : true,
    })
    .done( (data, textStatus) => {
        t[0].reset();
        var m = "メールの送信が完了しました。ご入力いただいたメールアドレス宛に届いたメールから引き続きアカウント登録をおこなってください。";
        $("#info_message_area").find("div").html(m);
        $("#info_message_area").show();
    })
    .fail( (jqXHR, textStatus, errorThrown) => {
        if (jqXHR.responseJSON) {
            var err = jqXHR.responseJSON.errors;
            var m = [];
            for (var i = 0; i < err.length; i ++) {
                m[i] = err[i].messages[0];
            }
            $("#error_message_area").find("div").html(m.join("<br>"));
        } else {
            $("#error_message_area").find("div").html("エラーが発生しました。お手数ですが再送信をお願いします。");
        }

        $("#error_message_area").show();
    })
    .always( (data) => {
        $.LoadingOverlay("hide");
        $(".message_area").click(function() {
            $(".message_area").hide();
        });
    });
};