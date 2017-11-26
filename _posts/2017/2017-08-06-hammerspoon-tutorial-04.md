---
layout  : post
title   : Hammerspoon 튜토리얼 04 - 웹뷰와 urlevent 기능을 사용해 봅시다
summary : 결론은 터미널
date    : 2017-08-06 13:35:00 +0900
tags    : hammerspoon
toc     : true
comment : true
public  : true
---
* TOC
{:toc}

# 웹뷰를 사용해 봅시다

웹뷰를 사용하면 자신만의 도움말이나 메뉴판을 html로 쉽게 만들 수 있습니다.

일단 만들어 봅시다.

다음과 같이 html 파일을 작성한 다음,

```html
<ul>
    <li> first </li>
    <li> second </li>
</ul>
```

아래와 같이 webview로 작성한 파일을 불러오면 됩니다.

```lua
view = hs.webview.new({x = 10, y = 10, w = 150, h = 100})
view:windowStyle("closable")
view:windowStyle("titled")
view:windowStyle("resizable")
view:url('file:///' .. os.getenv("HOME") .. '/test/menu.html')

hs.hotkey.bind({"option"}, "h", function()
    if view and view:hswindow() then
        return view:hide()
    end
    view:show()
end)
```

그리고 `option`+`h`를 입력해 보면 아래와 같은 작은 창이 나타납니다.

![hints]({{ site.url }}/post-img/2017/2017-08-06-hammerspoon-html.png)

한 번 더 `option`+`h`를 입력하면 창은 사라집니다.

## 웹뷰의 활용

* cheatsheet 파일을 html로 작성한 다음 단축키로 지정해 두면 편리합니다.
* `:url` 함수에 로컬 html 파일이 아니라 웹 주소 url을 입력하면 빠르게 열어볼 수 있습니다.
    * 즐겨찾기보다 더 빠르게 접근할 수 있으므로 자주 들여다보는 웹 페이지를 보기 좋습니다.
    * 예) `view:url('http://www.google.com')`
* Javascript도 돌아갑니다.

# url로 Hammerspoon 함수 호출

한편 `urlevent`라는 기능을 사용하면 url로 Hammerspoon 함수를 호출할 수 있습니다.

다음과 같이 lua 코드를 작성한 다음,

```lua
hs.urlevent.bind("someAlert", function(eventName, params)
    hs.alert.show("Received someAlert")
end)
```

터미널에 가서 아래와 같이 입력하면 화면에 `Received someAlert`라는 알림이 나타납니다.

```sh
$ open -g hammerspoon://someAlert
```

이 기능을 사용하면 Hammerspoon의 거의 모든 기능을 터미널과 웹 브라우저에서 호출할 수 있게 됩니다.

## `urlevent`를 사용해 메뉴판에서 Hammerspoon 기능을 호출해 봅시다

`urlevent` 기능을 활용하면 좀 더 쓸모있는 메뉴판을 만들 수 있을 것 같네요.

메뉴판을 아래와 같이 수정해 봅시다.

```html
<ul>
    <li>
        <a href="hammerspoon://testAlert">test alert</a>
    </li>
    <li>
        <a href="hammerspoon://sendIMessage">send iMessage</a>
    </li>
</ul>
```

그리고 `urlevent`도 등록해 줍시다.

```lua
view = hs.webview.new({x = 10, y = 10, w = 150, h = 100})
view:windowStyle("closable")
view:windowStyle("titled")
view:windowStyle("resizable")
view:url('file:///' .. os.getenv("HOME") .. '/test/menu.html')

hs.hotkey.bind({"option"}, "z", function()
    if view and view:hswindow() then
        return view:hide()
    end
    view:show()
end)

-- urlevent 등록: 화면에 메시지 출력
hs.urlevent.bind("testAlert", function(eventName, params)
    hs.alert.show("test")
end)

-- urlevent 등록: iMessage 전송
hs.urlevent.bind("sendIMessage", function(eventName, params)
    local phone = '+8210........'
    hs.messages.SMS(phone, "Test iMessage")
end)
```

추가한 `urlevent`는 두 가지입니다.

* 화면에 메시지를 출력한다.
* iMessage를 전송한다. => 아이폰이나 아이패드, 맥북으로 받게 됩니다.

이제 `option`+`h`로 메뉴판을 띄운 후,

* `test Alert`을 클릭하면 화면에 `test`라는 메시지가 출력됩니다.
* `send iMessage`를 클릭하면 해당 휴대폰 번호로 iMessage를 전송합니다.

참고로 iMessage는 휴대폰 번호뿐 아니라 이메일로도 보낼 수 있습니다.

```lua
-- urlevent 등록: iMessage 전송
hs.urlevent.bind("sendIMessage", function(eventName, params)
    local email = 'test@email.com'
    hs.messages.SMS(email, "Test iMessage")
end)
```

## `urlevent`의 활용

다양한 활용이 가능하겠으나 이것 하나로 충분히 차고 넘치지 않을까 싶습니다.

* 셸 스크립트로는 곤란한 gui 작업을 Hammerspoon으로 정의하고 터미널에서 호출.

# Links

* [API 문서](http://www.hammerspoon.org/docs/index.html)
    * [hs.webview](http://www.hammerspoon.org/docs/hs.webview.html)
        * [hs.webview.windowStyle](http://www.hammerspoon.org/docs/hs.webview.html#windowStyle)
        * [hs.webview.windowMasks](http://www.hammerspoon.org/docs/hs.webview.html#windowMasks)
        * [hs.webview.url](http://www.hammerspoon.org/docs/hs.webview.html#url)
    * [hs.urlevent](http://www.hammerspoon.org/docs/hs.urlevent.html)
* [Getting Started with Hammerspoon: Sending iMessage/SMS messages](http://www.hammerspoon.org/go/#imessagesms)

