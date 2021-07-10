---
layout  : post
title   : 텔레그램 봇 스켈레톤 만들기
summary : node.js, heroku로 만드는 텔레그램 챗봇
date    : 2017-03-12 21:08:16 +0900
tag     : node-js telegram heroku chatbot bot
toc     : true
comment : true
public  : true
---
* TOC
{:toc}

심심해서 텔레그램 봇을 만들어 보았다.  
봇을 만든 과정을 요약해 남겨본다.

## 준비물
1. 텔레그램 API TOKEN
1. [Heroku](https://heroku.com/) 계정
    * 무료로 봇을 돌리기 위해 Heroku를 선택했다.
1. [uptimerobot.com](https://uptimerobot.com/) 계정
    * Heroku 앱의 sleep 을 방지하기 위한 꼼수.

## 텔레그램 API TOKEN 얻기
텔레그램에서 [@BotFather](https://telegram.me/botfather)를 찾아 다음 순서대로 말을 걸면 된다.

1. `/start` : @BotFather를 활성화한다.
1. `/newbot` : 새로운 봇을 만들어달라고 요청한다.

이후로는 @BotFather가 봇의 이름을 물어보니 적당한 이름을 요청하면 된다.
그러면 @BotFather가 답변으로 API TOKEN을 보내준다.

자세한 내용은 [공식 문서](https://core.telegram.org/bots) 참고.

## 코딩

*package.json*
```json
{
  "name": "telegram-bot",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js",
    "dev_start": "export $(cat .config) && node index.js"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/johngrib/telegram-bot.git"
  },
  "author": "John Grib",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/johngrib/telegram-bot/issues"
  },
  "homepage": "https://github.com/johngrib/telegram-bot#readme",
  "dependencies": {
    "express": "^4.15.2",
    "get-json": "0.0.3",
    "node-telegram-bot-api": "^0.27.0"
  }
}
```

*index.js*
```javascript
require('./bot');
require('./web');
```

*bot.js* : bot의 비즈니스 로직이 들어갈 곳이다.

```javascript
const TelegramBot = require('node-telegram-bot-api');

const getToken = (function(){
    const token = process.env.TELEGRAM_TOKEN;
    return function() {
        return token;
    };
})();

const bot = new TelegramBot(getToken(), {polling: true});

bot.onText(/\/echo (.+)/, (msg, match) => {

    const chatId = msg.chat.id;
    const resp = match[1];

    bot.sendMessage(chatId, resp);
});
```

*web.js* : http end-point를 만들어 준다.
```javascript
var express = require('express');
var packageInfo = require('./package.json');

var app = express();

app.get('/', function (req, res) {
    res.json({ version: packageInfo.version });
});

var server = app.listen(process.env.PORT, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Web server started at http://%s:%s', host, port);
});
```

## web.js는 왜 있는 거죠?

사실 bot.js만 있어도 봇은 돌아간다. 즉 web.js는 일종의 군더더기 코드라 할 수 있다.  
이게 필요한 이유는 이 코드를 Heroku에서 구동하기로 결정했기 때문이다.  

Heroku는 일정 시간 동안 deploy한 앱에 접속 요청이 없을 경우, 앱을 sleep 시켜버린다.
물론 sleep 이 된다고 해서 영원한 잠에 빠지거나 하는 건 아니고, 다음 요청이 있을 때까지 죽여 놓는 것이다.
새로운 요청을 받으면 앱을 새로 구동한 다음 웹 페이지를 보여준다.
평범한 블로그나 웹 사이트라면 sleep 상태라고 해도 10~30초 정도만 기다리면 되는 것이다.

하지만 실험을 해보니 봇은 웹이 아니어서 그런지 한 번 sleep 상태로 빠져들면 다시는 깨어나지 않았다.

그래서 나온 꼼수가 http end point를 만든 다음, 주기적으로 ping을 보내주는 서비스에 봇의 http end point를 등록해서 봇이 잠들지 않도록 해주는 것이다. 이런 서비스들 중 하나가 바로 [uptimerobot.com](https://uptimerobot.com/). 무료로 가입할 수 있고, 사용법도 단순하다.

위의 코드를 Heroku에 배포한 다음, uptimerobot에 uri를 등록해 두면 봇 스켈레톤이 완성되는 셈이다.

## Config Variable 설정

배포하기 전에 Heroku Dashboard 에서 Config Variable에 `TELEGRAM_TOKEN`을 등록해 준다.  
이렇게 등록한 값은 node.js 코드에서 `process.env.TELEGRAM_TOKEN` 으로 접근할 수 있다.

## 배포

Heroku는 배포가 쉬워서 좋다.
```sh
$ git push heroku master
```

## 테스트

봇이 잘 돌아가는지 텔레그램으로 확인해 본다. 위의 코드대로라면 `/echo test` 등으로 확인 가능하다.

## sleep 방지 처리

[uptimerobot.com](https://uptimerobot.com/)에 봇의 도메인 주소를 등록해 준다.


## Links
* [https://github.com/johngrib/telegram-bot](https://github.com/johngrib/telegram-bot)
* [https://mvalipour.github.io/node.js/2015/11/10/build-telegram-bot-nodejs-heroku](https://mvalipour.github.io/node.js/2015/11/10/build-telegram-bot-nodejs-heroku)
