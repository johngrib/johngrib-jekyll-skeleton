---
layout  : wiki
title   : conceallevel (Vim)
summary : Vim에서 글자나 기호가 사라진다면 conceallevel을 확인해보자
date    : 2017-11-29 17:47:59 +0900
updated : 2017-12-20 13:13:32 +0900
tags    : vim trouble-shooting
toc     : true
public  : true
parent  : Vim
latex   : false
---
* TOC
{:toc}

## 0. 개요

* Vim에서 syntax 설정에 따라 특정 문자를 사용자가 눈으로 볼 수 없도록 숨기는 기능.
* 파일엔 존재하지만 눈으로는 보이지 않게 된다.
* 커서가 위치하는 라인은 conceal이 풀려, 숨겨졌던 문자를 볼 수 있게 된다.

예를 들어

* 특정 문법에서 따옴표나 인용 부호 등을 숨길 수 있다.
* Vimwiki에서는 기본값으로 `[[ ]]` 와 같은 이중 대괄호를 숨긴다.

## 1. 설정값

```viml
:help conceallevel
```

* `0`: 텍스트를 숨기지 않는다.
* `1`: 숨김 범위로 지정된 텍스트가 한 문자로 교체되어 보인다. 단, replacement character를 지정하지 않았다면, `listchars`에서 설정된 문자로 보이게 된다. 기본값은 `space`.
* `2`: 숨김 대상 텍스트가 사용자에게 보이지 않게 된다. 단, replacement character를 지정했다면 해당 문자로 보이게 된다.
* `3`: 숨김 대상 텍스트가 사용자에게 보이지 않게 된다.

## 2. 사용법

* help 문서 보기
```viml
:help conceallevel
```

* 설정값을 확인하는 방법
```viml
:echo &conceallevel
```

* conceal을 해제하는 방법
```viml
:set conceallevel=0
```

## 3. 경험

* conceal 때문에 스트레스를 너무 많이 받았다.
* 나는 기본적으로 conceallevel을 `0`으로 설정해 사용하고 있다.
* conceal을 유용하게 사용하는 마음에 드는 플러그인이 있다면 보통은 플러그인 설정에 conceal과 관련된 옵션이 있으므로 플러그인의 문서를 잘 읽어보자.
* Vim에서 돌아가는 게임을 만들 땐 유용할 거라는 생각을 많이 해 보았다.


* 장점
    * 특정 문자나 문자열을 view에서 숨겨준다는 점에서, 문법이나 포맷이 가독성을 떨어뜨리는 파일을 읽을 때 도움이 된다.
    * 게임이나 음악 재생기처럼 특수한 Vim 플러그인에서는 활용하기 나름으로 괜찮은 효과를 얻을 수 있다.

* 단점
    * 편집할 때 숨겨졌던 글자가 나타나 문자들이 줄줄이 오른쪽으로 이동해 보이게 되는 경우가 있다. 편집중이라면 꽤 스트레스를 받는다.
    * conceal이 많으면 Vim이 느려진다.
