---
layout  : post
title   : emacs 사용 시작!
summary : 하지만 Vim은 포기하지 않는다.
date    : 2017-04-03 16:33:24 +0900
tag     : emacs evil
toc     : true
comment : true
public  : true
---
* TOC
{:toc}

# Why Emacs?

나는 코드는 물론이고 모든 글을 Vim에서 작성한다. 세상에 Vim만큼 편리하고 쾌적한 텍스트 편집 도구는 존재하지 않는다고 생각한다. Vim에 대한 애정이 있다. 하지만 평생 Vim만 쓸 것인가? Emacs도 궁금하다. 기왕이면 둘 다 써보고 장점들만 취합해보고 싶다. 그냥 시작하면 진입장벽이 높을 테니 예전부터 눈독들인 Evil 모드로 시작해보고자 한다.

# Emacs download

* [Emacs For Mac OS X](https://emacsformacosx.com/)에서 GUI 버전을 받을 수 있다.
* 터미널에서는 `brew install emacs`로 쉽게 설치할 수 있다.

# [EVIL](https://github.com/emacs-evil/evil)

* EVIL은 `e`xtensible `vi` `l`ayer for Emacs의 줄임말인 모양이다.
* EVIL은 Emacs위에 Vi를 올리는 것이므로 [편집기 전쟁](https://en.wikipedia.org/wiki/Editor_war)의 관점에서 보면 신성모독이라고도 할 수 있다.

## EVIL 설치

[Evil의 Install](https://github.com/emacs-evil/evil#install)을 참고하여 다음과 같이 작업해 주었다.

다운로드 한다.

```
$ git clone git@github.com:emacs-evil/evil.git
$ cd ~/.emacs.d/
$ ln -s ~/git/evil/
```

`~/.emacs`파일에 다음 코드를 추가한다.

```lisp
(add-to-list 'load-path "~/.emacs.d/evil")
(require 'evil)
(evil-mode 1)
```

이렇게 하고 Emacs를 실행하니 hjkl 키로 커서를 움직일 수 있다.

## Emacs 종료

종료는 `<c-x><c-c>`로 할 수 있다.

# Links

* [Emacs For Mac OS X](https://emacsformacosx.com/)
* [Evil Install](https://github.com/emacs-evil/evil#install)
* [Evil PDF manual](https://raw.githubusercontent.com/emacs-evil/evil/master/doc/evil.pdf)
* [Editor war](https://en.wikipedia.org/wiki/Editor_war)


