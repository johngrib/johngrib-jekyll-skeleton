---
layout  : post
title   : Hammerspoon 튜토리얼 02 - 클립보드 확장 기능을 만들어 봅시다
summary : 복붙을 편하게!
date    : 2017-08-04 21:32:22 +0900
tags    : hammerspoon
toc     : true
comment : true
public  : true
---
* TOC
{:toc}

# 클립보드 확장 기능을 만들어 봅시다

이번에는 클립보드를 확장하는 기능을 만들어 봅시다.

`cmd`+`c`, `cmd`+`v`로 사용 가능한 클립보드는 편리하긴 하지만 저장 공간이 하나밖에 없다는 단점이 있습니다.
한 번에 여러 문자열을 복붙할 때에는 몹시 번거롭죠.

일단 생각나는대로 아래와 같이 코드를 작성해 보았습니다. `init.lua`에 추가해 봅시다.

```lua
local pasteboard = require("hs.pasteboard")
local save = {}

-- cmd + shift + 1 입력을 받으면 cmd + c 키 이벤트를 발생시킨다
-- 그리고 0.1 초 후에 클립보드로 들어간 내용을 save[1]에 보관한다
hs.hotkey.bind({'cmd', 'shift'}, '1', function()
    hs.eventtap.keyStroke({'cmd'}, 'c')
    hs.timer.doAfter(0.1, function()
        save[1] = pasteboard.getContents()
    end)
end)

-- cmd + f1 입력을 받으면 save[1] 에 있는 내용을 클립보드에 입력한다
-- 그리고 cmd + v 키 이벤트를 발생시킨다
hs.hotkey.bind({'cmd'}, '1', function()
    if save[1] then
        pasteboard.setContents(save[1])
        hs.eventtap.keyStroke({'cmd'}, 'v')
    end
end)
```

다음의 두 가지 기능이 추가될 것입니다.

* `cmd`+`shift`+`1`: 복사한 내용을 `save[1]`에 보관한다.
* `cmd`+`1`: `save[1]`에 보관한 내용을 붙여넣는다.

이것만으로도 하나뿐이던 클립보드가 둘로 늘어난 셈이 되었습니다.

## `1`~`9`까지 붙여 봅시다

돌아가는 것을 확인했으니 `9`까지 붙여보도록 합시다. 간단한 `for` 루프를 돌리면 되겠죠?

```lua
local pasteboard = require("hs.pasteboard")
local save = {}

for index = 1, 9 do

    hs.hotkey.bind({'cmd', 'shift'}, tostring(index), function()
        hs.eventtap.keyStroke({'cmd'}, 'c')
        hs.timer.doAfter(0.1, function()
            save[index] = pasteboard.getContents()
        end)
    end)

    hs.hotkey.bind({'cmd'}, tostring(index), function()
        if save[index] then
            pasteboard.setContents(save[index])
            hs.eventtap.keyStroke({'cmd'}, 'v')
        end
    end)
end
```

이제 같은 기능이 `1`에서 `9`까지 바인딩 되었을 것입니다.

# 문제점: 단축키가 너무 많다

지금까지 이 튜토리얼을 따라오신 분이 있다면 아마도 급격하게 불어난 단축키의 수에 당황하고 있을 것입니다.

앱 활성화, 윈도우 이동, 클립보드 확장까지 합치면 20개가 가뿐하게 넘어가겠죠.
그리고 맥 기본 단축키와 겹치는 것들도 있어서 필요할 때 기본 단축키를 사용할 수 없다는 문제점도 있습니다.

문제의 근본 원인 중 하나는 `cmd`, `control`, `shift`, `option` 과 같은 modifier 키가 넷 밖에 안 된다는 겁니다.
물론 넷을 적절하게 조합해서 `cmd`+`control`+`shift`+`c` 처럼 사용할 수도 있을 것입니다.
그러나 그렇게 사용하면 불편해요. 외우는 것도 번거롭지만 사용할 때마다 손가락이 꼬입니다.

앱 활성화나 윈도우 이동, 클립보드 확장은 어쩌면 매일 쓰는 기능이 될 수도 있습니다.
modifier 키가 더 많으면 좋겠다는 생각이 드는군요.
clipboard를 전담하는 modifier 키가 하나 있으면 좋을 것 같습니다.

## 해결책: modal 기능으로 modifier 키를 추가해 줍시다

Hammerspoon에서는 이런 경우에 사용할 수 있도록 modal 기능을 제공하고 있습니다.

시험 삼아 `F12`키를 modal 키로 삼아 문제를 해결해 봅시다.

```lua
local test_mode = hs.hotkey.modal.new()

test_mode:bind({}, '1', function() hs.alert.show('test 1') end)
test_mode:bind({}, '2', function() hs.alert.show('test 2') end)

hs.hotkey.bind({}, 'f12',
    function() test_mode:enter() end,
    function() test_mode:exit() end
)
```

위의 코드를 실행한 다음, `F12`+`1`과 `F12`+`2`를 입력해 보면 화면에 `test 1`과 `test 2`가 출력됩니다.
즉 `F12`키를 `cmd`나 `option`키 처럼 사용할 수 있게 된 것입니다.

## `F12`를 사용해 단축키를 재편성해 봅시다

그렇다면 `F12` 키를 클립보드 기능 키로 사용하기로 합시다.

`F12`와 `shift`+`1`을 누르면 복사한 값을 `save[1]`에 저장하고,
`F12`와 `1`을 누르면 `save[1]`에 저장된 값을 붙여넣는다면 편리할 것 같군요.

```lua
local pasteboard = require("hs.pasteboard")
local save = {}
local test_mode = hs.hotkey.modal.new()

hs.hotkey.bind({}, 'f12',
    function() test_mode:enter() end,
    function() test_mode:exit() end
)

for index = 0, 9 do

    local key = tostring(index)
    local num = index

    test_mode:bind({'shift'}, key, function()
        hs.eventtap.keyStroke({'cmd'}, 'c')
        hs.timer.doAfter(0.1, function()
            save[num] = pasteboard.getContents()
        end)
    end)
    test_mode:bind({}, key, function()
        if save[num] then
            pasteboard.setContents(save[index])
            hs.eventtap.keyStroke({'cmd'}, 'v')
        end
    end)
end
```

위의 코드를 입력하고 실행하면 다음과 같은 단축키를 사용할 수 있게 됩니다.

* 복사
    * `F12`+`shift`+`1`: 저장공간 1에 복사
    * `F12`+`shift`+`2`: 저장공간 2에 복사
    * ...
    * `F12`+`shift`+`0`: 저장공간 0에 복사

* 붙여넣기
    * `F12`+`1`: 저장공간 1에서 가져와 붙여넣기
    * `F12`+`2`: 저장공간 2에서 가져와 붙여넣기
    * ...
    * `F10`+`0`: 저장공간 0에서 가져와 붙여넣기

이제 `F12` 키를 복붙 전담 키로 사용할 수 있게 되었네요.

## [Karabiner-Elements](https://github.com/tekezo/Karabiner-Elements)로 `F13`~`F20`까지 사용하기

`F12`키를 한 가지 기능만 전담하게 하기는 적절하지 않다고 생각하는 분도 있을 것입니다.
예를 들어, 시스템 단축키나 자주 사용하는 앱의 특정 기능을 호출할 때 `F12`를 사용하고 있다면 곤란하겠죠.

이런 경우 Hammerspoon 사용자들은
[Karabiner-Elements](https://github.com/tekezo/Karabiner-Elements)
라는 앱을 사용하여 문제를 회피합니다.
이 앱을 사용하면 키 레이아웃을 수정할 수 있는데,
저는 아래와 같은 방식으로 수정해 사용하고 있습니다.

* `capslock` 키를 `F13` 키로 변경
* 오른쪽 `cmd` 키를 `F14` 키로 변경
* 오른쪽 `option` 키를 `F15` 키로 변경

* `F13`: `h`, `j`, `k`, `l` 등 vimlike 방향키 전담
* `F14`: 마우스 조작 전담
* `F15`: 앱 선택/실행 전담
* `F16`: 윈도우 사이즈 조정/이동 전담

(사실 저는 좀 [특수한 키보드](/blog/2017/05/14/hhkb-jp-tmk)를 사용하고 있어서 `F16` 키가 있습니다.)

Karabiner-Elements와 Hammerspoon 모두
[`F20` 키 까지 지원](http://www.hammerspoon.org/docs/hs.keycodes.html#map)하니
맥에서 잘 사용하지 않는 키(`print screen`, `pause`, 오른쪽 `cmd`, 오른쪽 `option` 등등)를
이번 기회에 `F20`까지 지정하는 것을 추천합니다.

(이 기능까지 Hammerspoon에 들어있다면 참 좋겠지만, 아직은 지원되지 않습니다.)

# Links

* [Karabiner-Elements](https://github.com/tekezo/Karabiner-Elements)

* [API 문서](http://www.hammerspoon.org/docs/index.html)
    * [hs.pasteboard](http://www.hammerspoon.org/docs/hs.pasteboard.html): 클립보드 관련 API
    * [hs.keycodes.map](http://www.hammerspoon.org/docs/hs.keycodes.html#map): 사용 가능한 키 목록
    * [hs.eventtap.keyStroke](http://www.hammerspoon.org/docs/hs.eventtap.html#keyStroke)
    * [hs.timer.doAfter](http://www.hammerspoon.org/docs/hs.timer.html#doAfter)
    * [hs.hotkey.modal](http://www.hammerspoon.org/docs/hs.hotkey.modal.html)
