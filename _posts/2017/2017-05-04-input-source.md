---
layout  : post
title   : Vim 사용시 한/영 전환 문제 해결하기
summary : hammerspoon으로 해결
date    : 2017-05-04 22:05:30 +0900
tag     : vim 구름입력기 hammerspoon karabiner input-source
toc     : true
comment : true
public  : true
---
* TOC
{:toc}

## 짜증나는 한영전환을 완벽히 해결해 보자

Vim을 사용할 때 가장 짜증나는 일은 한국어로 주석을 적다가 Normal 모드로 들어갔을 때 한국어 글자가 입력되어 명령이 제대로 먹히지 않는 경우일 것이다.

`<Esc>`를 입력할 때마다 영문으로 바뀌면 좋은데, 방법을 모를 때에는 일일이 영문으로 전환해주고 모드를 변경해주는 수고를 해 주어야 한다.

지금이야 이런 저런 꼼수들을 적용해놔서 생각할 필요가 없는 문제이긴 하다.

그러나 이걸 아예 잊고 살다가 나중에 다 까먹고 새로운 환경에서 삽질할 일을 방지하기 위해 글을 남겨두기로 했다.

### `langmap`을 사용하는 방법

`langmap`을 사용하면 꼭 영문이 아니어도 Normal 모드에서 명령을 입력할 수 있다.

```viml
set langmap=ㅁa,ㅠb,ㅊc,ㅇd,ㄷe,ㄹf,ㅎg,ㅗh,ㅑi,ㅓj,ㅏk,ㅣl,ㅡm,ㅜn,ㅐo,ㅔp,ㅂq,ㄱr,ㄴs,ㅅt,ㅕu,ㅍv,ㅈw,ㅌx,ㅛy,ㅋz
```

Vim 자체의 설정만을 사용하는 방법이라 썩 괜찮은 방법. 그러나 명령을 입력할 때마다 한국어 글쇠의 잔상이 남아서 보기 껄끄럽고 신경쓰인다. `langmap`을 지원하지 않는 IDE Vim plugin 에서 사용할 수 없다는 것도 문제.

### [구름 입력기](http://gureum.io/)를 사용하는 방법

mac 이라면 구름 입력기를 사용하여 쉽게 해결 가능하다.  
구름 입력기에는 다음과 같은 엄청난 옵션들이 있기 때문이다.

* `<Esc>`를 입력할 때마다 영문으로 변경
* 영문으로 전환하는 단축키 지정

입력기 자체를 바꾸는 것이기 때문에 Vim 이건 IDE Vim Plugin 이건 설정을 바꿔줄 필요가 없다.
특히 영문 전환 단축키를 `<C-c>` 나 `<C-[>` 등으로 설정해 주는 것도 가능해서 활용하기 좋다.
복잡하게 설정하기 귀찮다면 가장 이상적인 해결책이라 생각한다. 실제로 구름 입력기 설정만으로도 1년이 넘게 잘 썼다.

하지만 네이티브 입력기가 아니라서 그런지, mac Sierra 부터는 iTerm 에서 속도 저하 문제가 있다. Normal 명령어 몇 개 빠르게 입력하기만 해도 딜레이가 생겨서 좀 답답하다.

또한 IntelliJ IDEA 의 Vim Plugin인 Ideavim 과 상성이 별로 좋지 않다. 구름 입력기 옵션에 IntelliJ 관련 설정이 있긴 하지만, 설정을 해도 사용하다 보면 모드 전환이 한 번에 안 되는 등의 불만족스러운 상황을 자주 만나게 된다.

### karabiner를 사용하는 방법

구 karabiner 에서는 아래와 같은 설정을 써서 한 번에 해결이 가능했다.
나는 `F15` 키를 `Capslock` 에 매핑해 두었었기 때문에, `<Esc>` 대신 `Capslock`만 누르면 편리하게 모드 전환을 할 수 있었다.

```xml
<vkchangeinputsourcedef>
    <name>KeyCode::VK_CHANGE_INPUTSOURCE_TO_ENGLISH</name>
    <inputsourceid_equal>com.apple.keylayout.ABC</inputsourceid_equal>
</vkchangeinputsourcedef>

<item>
    <identifier>F15_abc_escape</identifier>
    <name>F15 : abc 로 inputsource 전환 후, ESC 입력</name>
    <autogen>
        __KeyOverlaidModifier__
        KeyCode::F15,
        KeyCode::VK_MODIFIER_EXTRA1,
        KeyCode::VK_CHANGE_INPUTSOURCE_TO_ENGLISH,
        KeyCode::ESCAPE,
    </autogen>
</item>
```

문제는 mac Sierra 부터 사용할 수 없게 되었다는 점. karabiner 가 Sierra에서는 작동하지 않기 때문에 이제는 알아봐야 소용이 없는 방법이다. 여기에 추가한 이유는 그냥 기록을 남겨 놓고 싶어서이다.

karabiner 를 사용할 수 없게 되자, karabiner의 개발자분이 [karabiner-elements](https://github.com/tekezo/Karabiner-Elements)를 급히 개발해 내놓긴 했지만 karabiner 를 통해 사용할 수 있었던 기능 대부분을 사용할 수 없는 상태. 현재로서는 그냥 키 1:1 매핑 밖에 안 된다.

### hammerspoon을 사용하는 방법

내가 가장 선호하는 방법이다. [hammerspoon](http://www.hammerspoon.org/)은 mac을 위한 일종의 매크로 툴로서, Windows 진영의 [autohotkey](https://autohotkey.com/)와 비슷한 느낌으로 쓸 수 있다. 기능도 비슷하고 할 수 있는 일도 비슷. 다만 lua 를 쓰기 때문에 autohotkey 보다는 좀 더 쓸만한 언어로 작업을 할 수 있다는 장점이 있다.

hammerspoon에서 다음과 같은 코드를 특정 키에 바인딩해주면 해당 키를 입력할 때마다 무조건 영문으로 변경되고, `<C-c>`를 추가로 입력하기 때문에 Vim 에서는 Normal 모드로 변경된다.

```lua
local inputEnglish = "com.apple.keylayout.ABC"

local input_source = hs.keycodes.currentSourceID()

if not (input_source == inputEnglish) then
    hs.eventtap.keyStroke({}, 'right')
    hs.keycodes.currentSourceID(inputEnglish)
end

hs.eventtap.keyStroke({'control'}, 'c')
```

* `<Esc>` 가 아니라 `<C-c>` 가 입력되게 한 이유는 iTerm 에서 `Meta` 키를 사용하는 그나마 적절한 방법이 `<Esc>`를 사용하는 것 뿐이기 때문이다.

아무튼 이 방법을 사용하면 네이티브 입력기를 사용하기 때문에 커서 움직임이 구름 입력기에 비해 엄청나게 빠르고, IntelliJ의 Ideavim에서나 터미널 Vim에서나 똑같이 사용할 수 있다는 장점이 있다. hammerspoon을 적극적으로 여러 방향으로 사용하고 있는 내게는 현재 가장 적절한 방법이라 생각한다.

## Links

* [구름 입력기](http://gureum.io/)
* [karabiner-elements](https://github.com/tekezo/Karabiner-Elements)
* [autohotkey](https://autohotkey.com/)
* [hammerspoon](http://www.hammerspoon.org/)

