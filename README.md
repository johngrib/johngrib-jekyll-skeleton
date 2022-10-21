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
$ gpg --keyserver hkp://pool.sks-keyservers.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
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
$ cp tool/pre-commit ./git/hooks
```

## 실행하기

```bash
$ jekyll serve
```
