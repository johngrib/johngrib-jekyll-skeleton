---
layout  : post
title   : tmux vim에서 나타나는 배경색 번짐 문제 해결
summary : "`set t_ut=`로 한 방에 해결"
date    : 2017-04-03 07:33:49 +0900
tags    : vim tmux fix
toc     : true
comment : true
public  : true
---
* TOC
{:toc}

# 문제
iTerm2 tmux에서 Vim이나 MacVim을 사용하면 스크린샷과 같이 터미널의 배경색이 Vim의 배경색을 침범한다.

![My helpful screenshot]({{ site.url }}/post-img/2017/2017-04-03-vim-tmux-t-ut.png)

## 미봉책: NeoVim

[NeoVim](https://github.com/neovim/neovim)을 사용하면 배경색 문제를 해결할 수 있다.

궁극적인 해결책은 아니다. Vim 8.0 릴리즈 전에는 NeoVim을 계속 쓰는 걸 고려했었지만 이제는 상황이 바뀌었다.

아래의 해결책을 알기 전까지는 이 방법을 사용하고 있었다.

* Good
    * 배경색 문제가 해결된다.
    * iTerm2에서 Meta 키를 `+Esc`로 설정하면 tmux-NeoVim에서 `<M-키>` 조합으로 Option키를 사용할 수 있다.
* Bad
    * iTerm2-tmux-NeoVim 조합에서는 `unnamedplus` 기능이 이상하게 작동한다. `unnamed`는 작동하지만 사용이 불편해서 좋아하지 않는 방식이다. `"`레지스터가 클립보드와 값을 공유하기 때문에 `y`를 눌렀을 때 클립보드의 값이 오염된다. 이걸 선호하는 사람들도 있겠지만 나는 그렇지 않다.
    * 당장 생각나진 않지만 NeoVim과 Vim 사이의 몇 가지 아쉬운 기능들이 있다.
    * rainbow.vim이 제대로 작동하지 않는다.

## 해결책: `set t_ut=`

[stackOverFlow](http://stackoverflow.com/a/15095377)에 답이 있었다.

1. `:set t_ut=`로 `Background Color Erase`를 disable시킨다.
1. `:redraw`하거나 `<c-l>`로 화면을 갱신한다.

아래와 같이 .vimrc에 추가해주면 끝난다.

```viml
set t_ut=
```

`:help t_ut`를 보면 아래와 같은 설명이 나와 있다.

```
t_ut    clearing uses the current background color    t_ut 't_ut'
```

# Links

* [Fixing Vim's Background Color Erase for 256-color tmux and GNU screen](https://sunaku.github.io/vim-256color-bce.html)
* [stackOverFlow: vim in tmux background color changes when paging](http://stackoverflow.com/a/15095377)
