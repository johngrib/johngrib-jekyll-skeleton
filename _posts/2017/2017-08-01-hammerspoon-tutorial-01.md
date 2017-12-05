---
layout  : post
title   : Hammerspoon 튜토리얼 01 - 윈도우 힌트와 이동
summary : 윈도우즈에는 있으나 맥에는 없는 그것
date    : 2017-08-01 22:47:08 +0900
tags    : hammerspoon
toc     : true
comment : true
public  : true
---
* TOC
{:toc}

# 윈도우 힌트 기능을 사용해 봅시다

[이전 글](/blog/2017/07/31/hammerspoon-tutorial-00-start)의 마지막에서는 단축키에 앱 활성화 기능을 붙여 보았습니다.  
자주 사용하는 앱 9개 정도를 골라 단축키를 바인딩하면 무척 편리하게 사용할 수 있습니다.

이번에는 앱 활성화와 함께 사용하기 좋은 기능인 `windowHints`를 사용해 봅시다.

```lua
hs.hotkey.bind({'shift'}, 'F1', hs.hints.windowHints)
```

`init.lua`를 리로드한 다음 `shift`+`f1` 키를 입력해 보면 다음과 같은 화면이 나타납니다.

![hints]({{ site.url }}/post-img/2017/2017-08-01-hammerspoon-hints.jpg)

현재 제 맥북에서 실행 중인 앱들의 아이콘이 키 힌트와 함께 나타난 것이라 보면 됩니다.

이 상태에서
* `o`를 누르면 Slack
* `j`를 누르면 IntelliJ IDEA
* `i`를 누르면 Line 메신저
* `h`를 누르면 Kitematic
이 활성화됩니다.

아직 실행되지 않은 앱은 힌트에 나타나지 않으므로 `launchOrFocus`를 완전히 대체하지는 못합니다. 그러나 많은 수의 앱을 실행시켜 둔 상태에서 `cmd`+`tab`의 사용이 불편할 때에는 꽤 도움이 될 수 있습니다.

## 힌트 문자 변경

추가로, 힌트에 사용되는 키 입력이 마음에 들지 않는다면 아래와 같은 방법으로 변경할 수 있습니다.

```lua
hs.hints.hintChars = {'1', '2', '3', '4', 'Q', 'W', 'E', 'R'}
hs.hotkey.bind({'shift'}, 'F1', hs.hints.windowHints)
```

위와 같이 하면 `1`, `2`, `3`, `4`, `Q`, `W`, `E`, `R`이 힌트 키로 나오게 됩니다. 즉 힌트 키를 왼손으로만 입력하는 것이 가능해집니다. `shift`+`F1`을 입력한 다음 `h`나 `i` 등을 입력하는 것보다 더 빠르고 쉽게 사용할 수 있겠죠.

# 윈도우를 이동시켜 봅시다

Hammerspoon을 잘 사용하려면 API 문서를 찾아 읽고 제공된 함수들을 잘 조합해야 합니다. 일반적인 프로그래밍 작업과 별다를 바 없어요. 위에서 사용해 본 힌트 기능처럼 UI까지 잘 구현된 경우는 예외적인 케이스라 할 수 있습니다.

이번에는 Hammerspoon API를 조합해서 활성화된 윈도우를 현재 화면의 위/아래/양/옆으로 이동시키는 기능을 만들어 봅시다.

Windows에 익숙하다면 활성화된 윈도우를 화면의 절반 사이즈로 조절하고 좌우로 이동시키는 `win`+`←`, `win`+`→` 단축키를 알고 있을 것입니다. 저는 맥북을 처음 쓰기 시작했을 때 이 단축키가 없어서 굉장히 불편했습니다. 맥에서 이런 기능을 사용하려면 [slate](https://github.com/jigish/slate)나 [Spectacle](https://www.spectacleapp.com/) 같은 앱을 다운받아 사용해야 합니다.

그러나 Hammerspoon을 사용하면 아래와 같은 코드로 같은 기능을 비교적 쉽게 구현할 수 있습니다.

```lua
local function move_win_to_left()
    local win = hs.window.focusedWindow()   -- 현재 활성화된 앱의 윈도우
    local frame = win:frame()
    local screen = win:screen():frame()     -- 현재 화면
    frame.x = screen.x
    frame.y = screen.y
    frame.w = screen.w / 2      -- width를 화면의 1/2 로 조정
    frame.h = screen.h
    win:setFrame(frame)
end

local function move_win_to_right()
    local win = hs.window.focusedWindow()
    local frame = win:frame()
    local screen = win:screen():frame()
    frame.x = screen.x + (screen.w / 2) -- 윈도우의 x 좌표를 화면 width의 1/2 로 조정
    frame.y = screen.y
    frame.w = screen.w / 2      -- width를 화면의 1/2 로 조정
    frame.h = screen.h
    win:setFrame(frame)
end

hs.hotkey.bind({'option', 'shift'}, 'left', move_win_to_left)
hs.hotkey.bind({'option', 'shift'}, 'right', move_win_to_right)
```

이제 `option`+`shift`+`←`와 `option`+`shift`+`→`을 입력해 보면 활성화된 앱을 좌우로 이동시킬 수 있습니다.

다음은 `option`+`shift`+`←` 으로 크롬을 이동시킨 결과를 찍은 것입니다.

![left]({{ site.url }}/post-img/2017/2017-08-01-hammerspoon-left.jpg)

## 윈도우를 다양한 방향으로 이동시켜 봅시다

좌우로 움직이게 하는 건 꽤 괜찮은 기능이지만, 썩 만족스러운 것은 아닙니다. 왼쪽 위, 오른쪽 아래로 움직인다든가 하는 기능이 들어가면 모니터를 조금 더 효율적으로 사용할 수 있을 것 같습니다.

그래서 아래와 같이 설정해보았습니다.

```lua
local function move_win(xx, yy, ww, hh)
    return function()
        local win = hs.window.focusedWindow()
        local f = win:frame()
        local max = win:screen():frame()
        f.x = max.x + (max.w/2) * xx
        f.y = max.y + (max.h/2) * yy
        f.w = max.w / ww
        f.h = max.h / hh
        win:setFrame(f)
    end
end

local left = 0
local right = 1

local top = 0
local mid = 1

local half_width = 2
local full_width = 1
local half_height = 2
local full_height = 1

local mod = {'option', 'shift'}
hs.hotkey.bind(mod, '1', move_win(left, mid, half_width, half_height))
hs.hotkey.bind(mod, '2', move_win(left, mid, full_width, half_height))
hs.hotkey.bind(mod, '3', move_win(right, mid, half_width, half_height))
hs.hotkey.bind(mod, '4', move_win(left, top, half_width, full_height))
hs.hotkey.bind(mod, '5', move_win(left, top, full_width, full_height))
hs.hotkey.bind(mod, '6', move_win(right, top, half_width, full_height))
hs.hotkey.bind(mod, '7', move_win(left, top, half_width, half_height))
hs.hotkey.bind(mod, '8', move_win(left, top, full_width, half_height))
hs.hotkey.bind(mod, '9', move_win(right, top, half_width, half_height))
```
> 대충 짠 코드이니, 그대로 사용하기보다는 자신의 취향에 맞게 코드를 다듬어 보시길 권합니다.

이렇게 하면 `option`+`shift`+`숫자`의 조합으로 윈도우를 좌/우/대각선 방향으로 모두 움직일 수 있고, 전체화면으로 사이즈를 조정하는 것도 가능합니다.

![left]({{ site.url }}/post-img/2017/2017-08-01-hammerspoon-window.gif)

# Links

* [Hammerspoon 튜토리얼 00](/blog/2017/07/31/hammerspoon-tutorial-00-start)
* [API 문서](http://www.hammerspoon.org/docs/index.html)
    * [hs.keycodes.map](http://www.hammerspoon.org/docs/hs.keycodes.html#map): 설정 가능한 키 목록을 볼 수 있습니다.
    * [hs.application.launchOrFocus](http://www.hammerspoon.org/docs/hs.application.html#launchOrFocus)
    * [hs.hints.windowHints](http://www.hammerspoon.org/docs/hs.hints.html#windowHints)
    * [hs.hints.hintChars](http://www.hammerspoon.org/docs/hs.hints.html#hintChars)
    * [hs.window.focusedWindow](http://www.hammerspoon.org/docs/hs.window.html#focusedWindow)
    * [hs.window.frame](http://www.hammerspoon.org/docs/hs.window.html#frame)
    * [hs.window.screen](http://www.hammerspoon.org/docs/hs.window.html#screen)
    * [hs.window.setFrame](http://www.hammerspoon.org/docs/hs.window.html#setFrame)
    * [hs.screen.frame](http://www.hammerspoon.org/docs/hs.screen.html#frame)
* 기타
    * [slate](https://github.com/jigish/slate)
    * [Spectacle](https://www.spectacleapp.com/)
    * [ezgif.com](https://ezgif.com/): 동영상을 gif 파일로 변환할 때 사용하였습니다.
