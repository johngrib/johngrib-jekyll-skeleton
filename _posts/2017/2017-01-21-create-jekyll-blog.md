---
layout  : post
title   : github에 Jekyll 블로그를 만들었다.
summary : 누구나 만드는 github 공짜 블로그.
date    : 2017-01-21 22:37:25 +0900
tags    : jekyll
toc     : true
comment : true
public  : true
---
* TOC
{:toc}

Jekyll을 이용해 새 블로그를 만들었다.

내가 만든 과정을 기록으로 남겨둔다.  
참고로 각 단계별 git 명령어, 즉 `commit`이나 `push` 등은 생략하였다.


# 1. Github에 블로그로 사용할 repository를 생성한다.

* repository 이름은 `github계정명.github.io`로 지정해야 한다.
* 내 경우엔 `johngrib.github.io`를 생성하였다.

# 2. 방금 생성한 repository를 로컬에 `clone`한다.

```sh
$ clone git@github.com:johngrib/johngrib.github.io.git
```

# 3. Jekyll을 설치한다.

```sh
$ gem install jekyll
```

# 4. clone한 repository에 Jekyll 초기화 설정을 해준다.

```sh
$ jekyll new johngrib.github.io
```

이쯤에서 `git`으로 `commit`하고 `push`도 날려줬다.

# 5. 테마를 선택한다.

* Github repository의 Settings로 들어가면 약간 아래 쪽에 `GitHub Pages` 섹션이 있다.
* 조금 더 아래쪽을 보면 `Theme chooser` 라고 되어 있는데, 여기에서 `Change theme`버튼을 눌러준다.
* 마음에 드는 테마를 발견하면 `Select theme`버튼을 클릭하면 된다.
* 나는 `Tactile theme`를 선택했다.

# 6. 블로그 이름을 변경해 준다.

* `_config.yml` 파일을 변경해주면 된다.
* 기본으로 제공된 블로그 이름과 사용자 이름 등을 변경해준다.
* 대충 다음과 같이 작성해 주면 된다.

```yml
title: 블로그 이름
email: 나의 이메일 주소
description: > # this means to ignore newlines until "baseurl:"
  블로그에 대한 간단한 설명
baseurl: "" # the subpath of your site, e.g. /blog
url: "https://johngrib.github.io" # the base hostname & protocol for your site
twitter_username:
github_username: johngrib

# Build settings
markdown: kramdown
theme: minima
```

# 7. 포스트를 작성한다.

* `_posts` 디렉토리를 보면 기본으로 작성되어 있는 `md`파일이 하나 있다.
* 기본 `md`파일을 참고하여 새로운 글을 작성한다.
* 참고로 이 글이 첫 글이다.

글을 쓰면서 실제로 어떻게 보이게 될 지 궁금하다면 로컬 지킬 서버를 띄워놓고 보면 된다.

```sh
$ jekyll s --watch
```

`--watch`옵션을 주면 파일을 변경할 때마다 정적 생성기가 곧바로 html 등으로 변환시켜 주는 모양이다.

# 8. repository로 `push`한다.

`push`한 다음, 잠시 후에 [https://johngrib.github.io][gh-io]로 접속해보면 변경된 내용을 확인할 수 있다.

[gh-io]: https://johngrib.github.io
