'use strict';

const AWS = require('aws-sdk');
const request = require('request');

const INQUIRY_TYPES_TEXT = [
    "SynchroLife for Businessをもっと知りたい",
    "資料が欲しい",
    "加盟店向けアプリの利用イメージを見たい",
    "パートナー企業の募集に関する情報を知りたい",
    "その他お問い合わせ",
];

const FROM_MAIL_ADDRESS = process.env.STAGE === 'prd' ? "business@synchrolife.jp" : "takagi@ginkan.jp";
const TO_MAIL_ADDRESS = process.env.STAGE === 'prd' ? "business@synchrolife.jp" : "takagi@ginkan.jp";

const FOR_BIZ_API_ENDPOINT = process.env.STAGE === 'prd' ? "https://console-business.synchrolife.jp" : "https://crmstg.synchrolife.jp";
const FOR_BIZ_API_CLIENT_ID = "SynchroLife";


module.exports.handle = async event => {
  console.log(event);
  const requestBody = JSON.parse(event.body);
  console.log(requestBody);

  try {
    const message = await mail(requestBody);
    console.log(message);

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: message,
          input: event,
        },
        null,
        2
      ),
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
    };

  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: err,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
    }
  }
};

/** メインロジック */
const mail = (async(requestBody) => {
  const title = "加盟店LPサイトからお問い合わせがありました";

  const inquiry = requestBody.inquiry_types.map((v, k) => {
    return "　　" + INQUIRY_TYPES_TEXT[k]
  }).join("\n");

  const message = "加盟検討中の法人・個人向けの問い合わせ\n\n"
    + "【問い合わせ内容】\n"
    + "お名前：" + requestBody.personnel_name + "\n"
    + "電話番号：" + requestBody.tel + "\n"
    + "メールアドレス：" + requestBody.email + "\n"
    + "お問い合わせ種別：" + "\n"
    + inquiry + "\n"
    + "お問い合わせ内容：" + requestBody.comment + "\n\n"
    + "送信元：" + requestBody.referrer;

  // DBへ格納
  const adInflow = requestBody.ad_inflow === true ? 4 : 3;
  await registerConsole(requestBody.email, message, adInflow, requestBody.referrer);

  // メール送信
  await sendMail(FROM_MAIL_ADDRESS, TO_MAIL_ADDRESS, title, message);

  return message;
});

/** メールを送信する */
const sendMail = (async (source, to, subject, body) => {
  AWS.config.update({region: 'us-east-1'});

  const params = {
    Source: FROM_MAIL_ADDRESS,
    Destination: {
      ToAddresses: [
        TO_MAIL_ADDRESS,
      ],
    },
    Message: {
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: body,
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject,
      }
    }
  };

  await new AWS.SES().sendEmail(params).promise();
});

/** 4bizのAPIにお問い合わせ内容をリクエストする */
const registerConsole = (async(email, message, adInflow, referrer) => {
  const headers = {
    "Content-type": "application/x-www-form-urlencoded",
    "Accept": "application/json",
  };
  const clientSecret = await getForBizApiClientSecret();

  const client = await doPost(FOR_BIZ_API_ENDPOINT + "/api/client/login", headers, {
    client_name: FOR_BIZ_API_CLIENT_ID,
    client_secret: clientSecret
  });

  return doPost(
    FOR_BIZ_API_ENDPOINT + "/api/contact/register",
    Object.assign(headers, { "Authorization": `Bearer ${client.auth_token}` }),
    {
      "email": email,
      "message": message,
      "origin": adInflow,
      "referrer": referrer,
    },
  )
});

/** 4bizのAPIに接続するためのCredential */
const getForBizApiClientSecret = (async() => {
  AWS.config.update({region: 'ap-northeast-1'});

  const path = '/' + process.env.STAGE + '/synchrolife4biz_lp/4biz_API';
  const params = {
    Path: path,
    Recursive: true,
    WithDecryption: true
  };

  const results = await new AWS.SSM().getParametersByPath(params).promise();
  return results.Parameters.map((p) => {
    return p.Name === path + "/ClientSecret" ? p.Value : ""
  })[0];
});

/** POSTする */
const doPost = ((url, headers, body) => {
  return new Promise((resolve, reject) => {
    request({
      uri: url,
      headers: headers,
      method: 'POST',
      json: true,
      form: body
    }, (err, res, body) => {
      if (! err && res.statusCode === 200) {
        resolve(body)
      } else {
        reject(err)
      }
    })
  })
});