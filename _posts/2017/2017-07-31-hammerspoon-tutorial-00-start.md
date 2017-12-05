---
layout  : post
title   : Hammerspoon 튜토리얼 00 - 시작하기
summary : 일단 맥이 있어야 한다
date    : 2017-07-31 21:57:27 +0900
tags    : hammerspoon
toc     : true
comment : true
public  : true
---
* TOC
{:toc}

# 이 글의 타깃

* 맥의 키보드와 마우스 사용에 불만이 많은 분.
* Hammerspoon을 사용해보려 했지만 참고할만한 한국어 자료가 없어 접어두셨던 분.
* 적어도 한 가지의 대중적인 프로그래밍 언어를 일상적으로 사용하고 있는 맥 사용자.
    * Hammerspoon의 설정 파일은 [lua 프로그래밍 언어](https://www.lua.org/)를 사용하기 때문입니다.
    * 코딩을 할 줄 모른다면 Hammerspoon 보다 [Karabiner-Elements](https://github.com/tekezo/Karabiner-Elements)를 추천합니다.

# Hammerspoon?

* [Hammerspoon](http://www.hammerspoon.org/)은 맥에서 돌아가는 매크로 툴입니다.
* Windows의 [Autohotkey](https://autohotkey.com/)와 비슷한 느낌으로 사용할 수 있습니다.
* 맥 OS API가 래핑 되어 있어 Swift/Objective-C/애플스크립트를 몰라도 맥에서 그럭저럭 쓸만한 도구를 만들 수 있습니다.
* 단축키 등록이 편리하고 자유롭습니다.
    * 보통 다른 단축키 설정 매크로 애플리케이션은 `shift`/`control`/`option`/`command` 같은 맥 표준 modifier 키 외의 다른 키는 조합 키로 사용할 수가 없지만, hammerspoon은 `modal` 기능을 사용하면 키보드의 모든 키를 조합 키로 동원하는 것이 가능합니다.

## 무슨 일을 할 수 있나?

대충 다음과 같은 일을 할 수 있다고 보면 됩니다. ([이전 글](/blog/2017/07/30/luarocks)에서 복붙한 내용)

* `Esc` 키를 누를 때마다 input source를 영문으로 전환하게 한다. Vim 사용자에게 너무 좋은 기능.
* 현재 실행 중인 애플리케이션의 윈도우를 특정 위치로 움직이게 하거나 사이즈를 조절한다.
* 특정 단축키를 입력하면 내가 자주 사용하는 애플리케이션을 실행하거나 활성화해준다.
* 간단한 GUI 메뉴를 만들고 내게 필요한 기능들을 등록해 쓴다.
* 특정 애플리케이션(파인더라던가)이 실행될 때마다 무언가 다른 작업을 수행하게 한다.
* 맥북이 회사 와이파이에 연결되면(출근하면) 맥북의 사운드 볼륨을 0으로 조정한다.
* 애플스크립트를 실행한다.
* iMessage를 전송한다.
* 터미널 명령어를 실행한다.
* 그 외 기타 등등.
    * 자세한 내용은 [Getting Started with Hammerspoon](http://www.hammerspoon.org/go/)을 참고.

# 설치 및 설정

* [https://github.com/Hammerspoon/hammerspoon/releases](https://github.com/Hammerspoon/hammerspoon/releases)에서 최신 버전을 다운받아 압축을 풀고 설치하면 됩니다.
* 실행해보면 스크린 위쪽의 상태 막대에 망치+숟가락 모양의 아이콘이 나타납니다.
* 아이콘을 클릭해보면 메뉴가 나옵니다.

![hammerspoon icon]({{ site.url }}/post-img/2017/2017-07-31-hammerspoon-icon.png)

* 설정 파일을 리로드하는 `Reload Config`를 눈여겨 두도록 합니다. 단축키를 할당하기 전에는 꽤 여러 차례 누르게 될 겁니다.

* `Preferences...` 에서 `Launch Hammerspoon at login`을 선택해주면 앞으로 맥을 재부팅 할 때마다 Hammerspoon이 자동으로 실행됩니다.

![hammerspoon menu]({{ site.url }}/post-img/2017/2017-07-31-hammerspoon-preference.png)

* `Open Config`를 선택하면 시스템 기본 편집기로 `~/.hammerspoon/init.lua` 파일을 열어줍니다.
    * 만약 이 파일이 없거나 뭔가 문제가 생겼다면 직접 파일을 만들어 주면 됩니다.
    * `Open Config` 메뉴를 사용하기보다는 자신에게 익숙한 IDE나 편집기에 `~/.hammerspoon` 디렉토리를 등록해 놓고 쓰는 쪽을 추천합니다.

# `Hello, world!`를 출력해 봅시다

헬로 월드를 출력해 봐야겠죠?  
`init.lua`파일을 열고 다음과 같이 lua 코드를 작성해 주면 됩니다.

```lua
hs.alert.show('Hello, world!')
```

저장한 다음, Hammerspoon 아이콘을 클릭해서 `Reload Config`를 선택합니다.  
오타가 없다면 한가운데에 `Hello, world!` 가 나타납니다.

위에서 `Launch Hammerspoon at login`을 체크해 두었다면, 이제 맥을 재부팅 할 때마다 해머스푼의 인사를 받게 될 것입니다.

# 단축키를 설정해 봅시다

* `hs.hotkey.bind` 함수를 쓰면 단축키에 lua 함수를 바인딩할 수 있습니다.  

## `Hello, world`에 단축키를 바인딩해 봅시다

이번에는 헬로 월드 출력에 단축키를 바인딩해 봅시다.

```lua
hs.hotkey.bind({'shift', 'cmd'}, 'H', function() hs.alert.show('Hello, world!') end)
```

이제 설정을 리로드 한 다음, `cmd`+`shift`+`h`키를 누르면 `Hello, world!` 가 나타납니다.  

![hello world]({{ site.url }}/post-img/2017/2017-07-31-hammerspoon-helloworld.png)

`function() ... end` 구문은 익명 함수로, 위의 코드를 다음과 같이 작성하는 것도 가능합니다.

```lua
function hello()
    hs.alert.show('Hello, world!')
end

hs.hotkey.bind({'shift', 'cmd'}, 'H', hello)
```

## Hammerspoon 리로드에 단축키를 바인딩해 봅시다

설정 파일을 변경할 때마다 마우스로 일일이 Hammerspoon 메뉴를 불러 리로드를 클릭하는 것은 귀찮은 일이니,  
단축키를 붙여 쓰는 쪽이 앞으로 편리할 것 같습니다.

다음의 코드를 추가해 줍시다.

```lua
hs.hotkey.bind({'option', 'cmd'}, 'r', function() hs.reload() end)
```

이제 설정을 리로드 해주면, `option`+`cmd`+`r`키를 누르면 설정을 리로드하게 됩니다.

써놓고 보니 함수 호출을 함수로 감싸고 있네요. 다음과 같이 사용하는 쪽이 더 바람직하겠죠.

```lua
hs.hotkey.bind({'option', 'cmd'}, 'r',  hs.reload)
```

저장한 다음, `option`+`cmd`+`r`키를 누르면 바뀐 코드를 리로드합니다.  
마지막으로 수정한 코드가 잘 작동하는지 확인하려면 한 번 더 단축키를 눌러 리로드해보면 됩니다.

## 단축키로 메모장, 구글 크롬을 불러 봅시다

그냥 헬로 월드만 화면에 띄우는 것은 별로 유용하진 않으니, 이번에는 실제로 쓸만한 기능을 추가해 봅시다.

* `hs.application.launchOrFocus`를 사용하면 앱을 활성화할 수 있습니다.

```lua
hs.hotkey.bind({'shift', 'option'}, 'N', function()
    hs.application.launchOrFocus('Notes')
end)
hs.hotkey.bind({'shift', 'option'}, 'C', function()
    hs.application.launchOrFocus('Google Chrome')
end)
```

위의 코드를 추가하면

* `shift`+`option`+`n`을 입력하면 메모장을 화면에 띄워줍니다.
* `shift`+`option`+`c`를 입력하면 구글 크롬 웹 브라우저를 화면에 띄워줍니다.

종료된 상태라면 새로 실행해주고, 숨김상태라면 보임 상태로 바꾸고 포커스를 맞춰줍니다.
다른 데스크탑에 있다면 해당 데스크탑으로 전환해주기까지 합니다.
자주 쓰는 애플리케이션 몇 개만 등록해줘도 굉장히 편리하게 사용할 수 있습니다.

`launchOrFocus` 함수의 파라미터로 넘겨줘야 하는 앱의 이름은 아래와 같이 확인할 수 있습니다.

![chrome]({{ site.url }}/post-img/2017/2017-07-31-hammerspoon-chrome.png)

# Links

* [Hammerspoon.org](http://www.hammerspoon.org/)
    * [Getting Started with Hammerspoon](http://www.hammerspoon.org/go/)
    * [Download releases](https://github.com/Hammerspoon/hammerspoon/releases)
* [lua 프로그래밍 언어](https://www.lua.org/)
    * [wikipedia](https://en.wikipedia.org/wiki/Lua_(programming_language))
    * [인사이트 출판사: 프로그래밍 루아](http://www.insightbook.co.kr/%EB%8F%84%EC%84%9C-%EB%AA%A9%EB%A1%9D/programming-insight/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-%EB%A3%A8%EC%95%84-3%ED%8C%90)
    * [Learn Lua in Y minutes](https://learnxinyminutes.com/docs/lua/)
* [API 문서](http://www.hammerspoon.org/docs/index.html)
    * [hs.alert.show](http://www.hammerspoon.org/docs/hs.alert.html#show)
    * [hs.hotkey.bind](http://www.hammerspoon.org/docs/hs.hotkey.html#bind)
    * [hs.application.launchOrFocus](http://www.hammerspoon.org/docs/hs.application.html#launchOrFocus)

* 기타
    * [Autohotkey.com](https://autohotkey.com/)
    * [Karabiner-Elements](https://github.com/tekezo/Karabiner-Elements)

**EOB**
