---
layout  : post
title   : Hammerspoon 튜토리얼 03 - 한영 전환 키를 만들어 봅시다
summary : Esc - 영문전환도 만들어 봅시다
date    : 2017-08-05 12:11:00 +0900
tags    : hammerspoon
toc     : true
comment : true
public  : true
---
* TOC
{:toc}

# 콘솔을 열어 봅시다

![hammerspoon icon]({{ site.url }}/post-img/2017/2017-07-31-hammerspoon-icon.png)

1. 상단 메뉴의 Hammerspoon 아이콘을 클릭하고,
1. `Console...` 을 선택하면 콘솔이 열립니다.

이제부터는 사용자에게 메시지를 전달하려는 목적이 아니라면 `hs.alert.show` 함수의 사용은 지양하고 콘솔을 사용하도록 하겠습니다.

# 입력 소스를 확인해 봅시다

한영 전환 키를 만들기 위해선 일단 입력 소스를 확인할 수 있어야 합니다.

일단 다음과 같이 lua 코드를 작성하고 실행해 봅시다.

```lua
hs.hotkey.bind({'cmd'}, 'i', function()
    local input_source = hs.keycodes.currentSourceID()
    print(input_source)
end)
```

1. 영문으로 전환 후 `cmd`+`i`
1. 한국어로 전환 후 `cmd`+`i`

그리고 콘솔을 확인해 보니 다음과 같이 나와 있습니다.

```
2017-08-05 10:43:00: com.apple.keylayout.ABC
2017-08-05 10:43:02: com.apple.inputmethod.Korean.2SetKorean
```

출력 결과를 살펴보면 각각 영문 입력 소스와 한국어(두벌식) 입력 소스의 아이디라는 것을 알 수 있습니다.

# 한영 전환 키를 만들어 봅시다

로직은 다음과 같이 단순합니다.

* 만약 영문이면 => 한국어로 전환
* 그 외의 경우 => 영어로 전환

```lua
do  -- input sorce changer
    local inputSource = {
        english = "com.apple.keylayout.ABC",
        korean = "com.apple.inputmethod.Korean.2SetKorean",
    }

    local changeInput = function()

        local current = hs.keycodes.currentSourceID()
        local nextInput = nil

        if current == inputSource.english then
            nextInput = inputSource.korean
        else
            nextInput = inputSource.english
        end
        hs.keycodes.currentSourceID(nextInput)
    end

    hs.hotkey.bind({'shift'}, 'space', changeInput)
    -- hs.hotkey.bind({}, 'F14', changeInput)
end
```

* 전역 네임스페이스를 더럽히고 싶지 않기 때문에 `do` - `end`로 스코프를 지정했습니다.
* `inputSource`: 위에서 알아낸 입력 소스의 아이디 목록입니다.

이제부터 `shift`+`space`를 입력하면 한/영 전환이 이루어집니다.
만약 윈도우즈처럼 사용하고 싶다면 오른쪽 `cmd`키를 `F14` 등으로 매핑한 다음 바인딩해주기만 하면 됩니다.

이거라면 다른 맥 컴퓨터를 구매해서 세팅할 때에도 한/영 전환 때문에 고생하지 않아도 되겠네요.

무조건 중국어로 전환하는 단축키나 무조건 태국어로 변환하는 단축키 등을 만들어 붙일 수 있으므로
3개 이상의 언어를 사용하는 경우에도 편리할 수 있겠다는 생각도 듭니다.

덧붙여, 만약 입력 소스를 변경할 때마다 `hs.alert.show`로 변경한 입력 소스의 이름을 알려준다면
유료 앱인 [isHud](https://itunes.apple.com/kr/app/ishud/id484757536?mt=12)을 설치했을 때와
똑같이 사용할 수 있습니다.

아무래도 개발자 입장에서는 직접 기능을 변경할 수 있다는 점에서 Hammerspoon이 좀 더 편리하군요.


# `f13` 키를 영문 전환 기능이 있는 `escape` 키로 만들어 봅시다

그렇다면 이번엔 Vim 사용자들에게 유용한 기능을 만들어 봅시다.

* 영문 상태에서 `f13` 키를 입력하면 `escape` 키로 작동합니다.
* 한국어 상태에서 `f13` 키를 입력하면 영문으로 전환하고 `escape` 키 입력을 보냅니다.

```lua
local caps_mode = hs.hotkey.modal.new()
local inputEnglish = "com.apple.keylayout.ABC"

local on_caps_mode = function()
    caps_mode:enter()
end

local off_caps_mode = function()

    caps_mode:exit()

    local input_source = hs.keycodes.currentSourceID()

    if not (input_source == inputEnglish) then
        hs.keycodes.currentSourceID(inputEnglish)
    end
    hs.eventtap.keyStroke({}, 'escape')
end

hs.hotkey.bind({}, 'f13', on_caps_mode, off_caps_mode)
```

* 참고: 저는 `capslock` 키를 `f13` 키로 사용하고 있으므로 모드의 이름을 `caps_mode`라고 지었습니다.

위와 같이 하면 Vim에서 `escape`를 누르기 전에 영문으로 전환하는 귀찮은 일을 하지 않아도 됩니다.

## 한글 마지막 글자가 사라지는 문제

하지만 그것은 희망 사항일 뿐이고, 실제로 터미널/터미널 Vim에서 한국어로 타이핑하다 `F13`을 입력해봐도
생각만큼 매끄럽게 작동하지 않는 것을 알 수 있습니다.

마지막 한국어 한 글자가 사라지거나, 먼저 사라졌던 한 글자가 새로 타이핑할 때 앞에 들어가는 경우가 생깁니다.
이 문제를 우회하려면 한국어로 타이핑하다가 오른쪽 방향키를 한 번 누르거나 스페이스를 하나 추가한 다음
영문 전환을 하고 `escape` 키를 누르면 됩니다. 음. 우아하진 못하군요.

사실 저는 [구름 입력기](http://gureum.io/)를 사용해왔지만 [구름 입력기에서도 비슷한 문제](https://github.com/gureum/gureum/issues/180)가
발생하기 때문에 이 문제를 Hammerspoon으로 해결하여 사용하고 있습니다.

(이건 애플이 해결해주면 좋을 텐데 언제 해줄지 모르겠네요)

우아함과 거리가 있긴 하지만 제가 사용하고 있는 해결책은 다음과 같습니다.

```lua
local input_source = hs.keycodes.currentSourceID()

if not (input_source == inputEnglish) then
    hs.eventtap.keyStroke({}, 'right')
    hs.keycodes.currentSourceID(inputEnglish)
    hs.eventtap.keyStroke({}, 'escape')
end
hs.eventtap.keyStroke({}, 'escape')
```

위와 같이 하면 맥 기본 한글 입력기, 구름 입력기, 터미널, 터미널 Vim, MacVim, 평범한 워드 프로세서
가리지 않고 기대한 대로 작동합니다.

## 덧붙임

그럼에도 불구하고 저는 구름 입력기를 사용하고 있습니다.
구름 입력기가 없으면 한글 입력 상태일 때 Vimium이 작동하지 않기 때문입니다.
이 문제도 Hammerspoon으로 해결할 수는 있겠지만 번거롭기도 하고,
Hammerspoon 설정이 너무 복잡해지는 건 바라지 않기 때문이기도 합니다.

# Links

* [API 문서](http://www.hammerspoon.org/docs/index.html)
    * [hs.keycodes.currentSourceID](http://www.hammerspoon.org/docs/hs.keycodes.html#currentSourceID)
    * [hs.eventtap.keyStroke](http://www.hammerspoon.org/docs/hs.eventtap.html#keyStroke)

* 기타
    * [isHud](https://itunes.apple.com/kr/app/ishud/id484757536?mt=12)
    * [백투더맥: 맥에서 한글/영문 입력 상태를 간편하게 확인하고 변경할 수 있는 'isHUD'](http://macnews.tistory.com/1169)
    * [구름 입력기](http://gureum.io/)
