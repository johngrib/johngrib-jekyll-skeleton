---
layout  : post
title   : Hammerspoon 튜토리얼 05 - chooser를 사용해 봅시다
summary : 클립보드 히스토리도 만들어 봅시다
date    : 2017-08-07 09:33:00 +0900
tags    : hammerspoon
toc     : true
comment : true
public  : true
---
* TOC
{:toc}

# `chooser`를 사용해 봅시다

`chooser`의 특징은 다음과 같습니다.

* 위/아래 화살표 키로 커서를 움직여 아이템을 선택할 수 있다.
* `cmd`+`숫자`로 선택하는 것도 가능.
* 검색 기능이 있다.
    * [Alfred](https://www.alfredapp.com/)와 비슷한 느낌으로 사용 가능.
    * 검색어를 타이핑하면 아래쪽 아이템이 필터링 되어 줄어든다.
* 이미지를 사용해 각 아이템 왼쪽에 아이콘을 표시할 수 있다.
* 각 아이템 아래쪽에 작은 폰트로 출력되는 설명을 추가할 수 있다.

코드로 보는 쪽이 이해가 빠르겠지요?

```lua
local chooser = hs.chooser.new(function (choice)
    hs.alert.show(choice.text)
end)

hs.hotkey.bind({'option'}, 'l', function ()
    local list = {}
    table.insert(list, {
        text = 'alert1',
        subText = '화면에 첫 번째 알림을 띄웁니다',
        -- image = hs.image.imageFromPath( 이미지 주소 .. '.jpg'),
    })
    table.insert(list, {
        text = 'alert2',
        subText = '화면에 두 번째 알림을 띄웁니다',
        -- image = hs.image.imageFromPath( 이미지 주소 .. '.jpg'),
    })
    chooser:choices(list)
    chooser:show()
end)
```

리로드한 다음, `option`+`l`을 입력하면 아래와 같은 선택기가 나옵니다.

![chooser]({{ site.url }}/post-img/2017/2017-08-07-hammerspoon-chooser.jpg)

# 클립보드 히스토리를 만들어 봅시다

`chooser`를 사용해서 무엇을 하는 것이 좋을까요?

대충 아래와 같은 도구를 만들면 재미있을 것 같습니다.

* 클립보드 히스토리 선택기
* 시스템 작업 선택기(reboot, power off, kill 등)
* 자주 사용하는 앱 선택 실행기
* 앱 레이아웃 선택기

다 그럭저럭 쓸만해 보이지만 평소 필요했던 도구인 클립보드 히스토리 선택기를 만들어 보도록 합시다.

## 기획

일단 아래와 같이 간단하게 기획을 해 보았습니다.

* 히스토리는 queue로 작동해야 한다.
    * `cmd`+`c`를 입력할 때마다 복사한 내용이 히스토리에 들어간다.
    * 히스토리에 들어간 값의 숫자가 히스토리 길이를 넘어가면 가장 오래된 값을 삭제한다.
* 히스토리 뷰어로는 `chooser`를 사용한다.
    * 히스토리 내용을 목록으로 보여준다.
    * 가장 최근에 들어간 값을 제일 위에 보여준다.
* 편의 기능
    * 같은 값을 여러 번 복사한다면(`cmd`+`c` 연타) 히스토리에 한 번만 집어넣는다.
        * 이전 히스토리가 쓸데없이 밀리는 현상을 방지할 수 있다.
    * 값을 선택하면 선택한 값을 클립보드에 넣는다.
        * 목록을 닫은 후에도 선택한 값을 `cmd`+`v`로 계속 붙여넣을 수 있게 된다.
    * 값을 선택하면 사용하던 앱으로 이동하여 값을 붙여넣는다.
        * 선택한 다음 사용자가 직접 `cmd`+`v`를 입력하는 귀찮은 일을 방지한다.
    * 목록에 복사한 값의 utf8 문자 사이즈도 같이 보여준다.
        * 붙여넣을 값의 trailing space를 파악하기 쉽다.
* 기타
    * 보안 문제가 있을 수 있으므로 히스토리는 Hammerspoon을 종료하거나 재부팅되면 사라지도록 한다.
    * 복사한 값은 특정 영역에 파일로 보관하지 않는다.
    * 사용자가 히스토리를 전체 삭제할 수 있는 기능을 제공해야 한다.

## 구현

아래와 같이 구현해 보았습니다.

지난번에 구현한 [클립보드 확장 기능](/blog/2017/08/04/hammerspoon-tutorial-02)과 비슷한 코드가 많아서 함께 읽으면 어렵지 않게 이해할 수 있을 것입니다.

### `/init.lua`

```lua
do  -- clipboard history
    local f16_mode = hs.hotkey.modal.new()
    hs.hotkey.bind({}, 'f16', function() f16_mode:enter() end, function() f16_mode:exit() end)

    local clipboard = require('modules.clipboard')
    clipboard.setSize(10)
    f16_mode:bind({}, 'c', clipboard.showList)
    hs.hotkey.bind({'shift'}, 'c', clipboard.clear)
end
```

### `/modules/clipboard.lua`
```lua
local pasteboard = require("hs.pasteboard")
local history = {}
local historySize = 10
local lastChange = pasteboard.changeCount()
local register = {}

local util = {}

function util.focusLastFocused()
    local filter = hs.window.filter
    local lastFocused = filter.defaultCurrentSpace:getWindows(filter.sortByFocusedLast)
    if #lastFocused > 0 then
        lastFocused[1]:focus()
    end
end

local function shiftHistory(text)
    for key, value in pairs(history) do
        if value.text == text then
            local item = table.remove(history, key)
            return table.insert(history, 1, item)
        end
    end
end

local chooser = hs.chooser.new(function (choice)
    if not choice then
        util.focusLastFocused()
    end
    shiftHistory(choice.text)
    pasteboard.setContents(choice.text)
    util.focusLastFocused()
    hs.eventtap.keyStroke({"cmd"}, "v")
end)

function clearSizeOver()
    while (#history >= historySize) do
        table.remove(history, #history)
    end
end

function storeCopy()

    clearSizeOver()

    local content = pasteboard.getContents()

    if #history < 1 or not (history[1].text == content) then
        table.insert(history, 1, {text = content, subText = 'size: ' .. utf8.len(content)})
    end
end

copy = hs.hotkey.bind({"cmd"}, "c", function()
    copy:disable()
    hs.eventtap.keyStroke({"cmd"}, "c")
    copy:enable()
    hs.timer.doAfter(0.1, storeCopy)
end)

local obj = {}

function obj.showList()
    local content = pasteboard.getContents()
    if #history < 1 or not (history[1].text == content) then
        table.insert(history, 1, {text = content})
    end
    chooser:choices(history)
    chooser:show()
end

function obj.clear()
    history = {}
    chooser:cancel()
    util.focusLastFocused()
end

function obj.setSize(num)
    historySize = num
end

return obj
```

위 구현 내용은 [Github 저장소](https://github.com/johngrib/hammerspoon_clipboard/tree/0.1.0)에도 올려 두었습니다.

# Links

* 참고한 다른 Hammerspoon 프로젝트
    * [https://github.com/victorso/.hammerspoon/blob/master/tools/clipboard.lua](https://github.com/victorso/.hammerspoon/blob/master/tools/clipboard.lua)
    * [https://aldur.github.io/articles/hammerspoon-emojis/](https://aldur.github.io/articles/hammerspoon-emojis/)
* [API 문서](http://www.hammerspoon.org/docs/index.html)
    * [hs.chooser](http://www.hammerspoon.org/docs/hs.chooser.html)
* 기타
    * [Alfred](https://www.alfredapp.com/)
    * [Hammerspoon 튜토리얼 02 - 클립보드 확장 기능을 만들어 봅시다](/blog/2017/08/04/hammerspoon-tutorial-02)
    * [johngrib/hammerspoon_clipboard](https://github.com/johngrib/hammerspoon_clipboard/tree/0.1.0)
