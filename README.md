# Vimwiki + Jekyll + Github.io

## 시작하기

블로그 스켈레톤을 fork 하세요.

https://github.com/johngrib/johngrib-jekyll-skeleton

제 블로그를 fork하는 것보다 블로그 스켈레톤을 fork하는 것을 권합니다.
블로그를 그냥 fork 하면 제 자기소개와 일기, 에세이까지 당신의 블로그의 컨텐츠가 됩니다.

* 만약 그냥 fork 하신다면 제 자기소개와 일기를 포함한 _wiki의 모든 md 파일을 삭제하고 사용하세요.
* skeleton에 있는 문서들은 튜토리얼로 생각하고 읽어주시면 됩니다.

다음 글을 읽으며 블로그의 구조를 파악하시면 운영에 도움이 될 것입니다.

https://johngrib.github.io/wiki/my-wiki/

## 설치하기

루비가 설치되어 있지 않을 경우 루비를 설치해 주세요. 여기에서는 `rvm`으로
설치하는 방법을 소개해 드립니다. 다른 방법으로도 루비를 설치할 수 있으니, 다른
방법으로 하셔도 됩니다.  

루비 버전은 [GitHub Pages Dependency versions](https://pages.github.com/versions/)을 보면 GitHub Pages에서는 `2.7.4`버전을
사용하고 있으니 해당 버전을 설치해 줍니다.

```bash
# See also https://rvm.io/rvm/install
$ gpg --keyserver hkp://keyserver.ubuntu.com --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
$ curl -sSL https://get.rvm.io | bash
$ rvm install 2.7.4
$ rvm use 2.7.4
```

그다음 `bundle install`을 실행하여 의존성들을 설치합니다.

```bash
$ bundle install
```

### Git hooks 추가하기

새로운 글을 등록하면 메타 데이터를 업데이트해 주어야 합니다. 커밋하기 전에 이를
자동으로 될 수 있도록 Git Hooks를 추가해야 합니다.

```bash
$ cp tool/pre-commit ./.git/hooks
```

### 노드 모듈 설치하기

메타 데이터 생성을 위해서 `generateData.js`를 실행해야 합니다. 이를 실행하기
위해서 `yamljs` 의존성을 설치해야 합니다.

```bash
$ npm install
```

## 실행하기

```bash
$ jekyll serve
```

## 글 작성하기

### 새로운 카테고리 만들기

카테고리가 있는 글을 작성하고 싶을 때는 카테고리를 먼저 만들어야 합니다.
`/_wiki/category-name.md`같이 파일을 만들고 내용에는 다음을 추가해야 합니다.  

이때 `layout`속성은 `category`가 되어야 합니다.

```markdown
---
layout  : category
title   : 제목을 입력합니다.
summary : 
date    : 2022-10-06 00:00:00 +0900
updated : 2022-10-06 00:00:00 +0900
tag     : 
toc     : true
public  : true
parent  : index
latex   : false
---

* TOC
{:toc}
```

### 위키에 글 등록하기

위키를 작성할 때는 `/_wiki` 폴더 아래에 마크다운으로 파일을 작성합니다. 만약
카테고리 아래에 글을 작성하고 싶을 경우에는 카테고리 이름으로 폴더를 만들고
파일을 추가합니다. 예를 들어 `/_wiki/category-name/document.md`로 만들 수 있습니다.
`layout`은 `wiki`가 되어야 합니다. `parent`는 상위 카테고리 이름을 작성해야
합니다.  

만약 상위 카테고리가 없을 경우에는 `parent`에 `index`를 입력합니다.

```markdown
---
layout  : wiki
title   : 제목을 적습니다
date    : 2022-10-08 11:23:00 +0900
updated : 2022-10-08 11:23:00 +0900
tag     : 
toc     : true
public  : true
parent  : category-name
latex   : false
---

* TOC
{:toc}

내용을 적습니다.
```
