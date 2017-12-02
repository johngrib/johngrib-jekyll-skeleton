---
layout  : wiki
title   : YAML
summary : YAML Ain't Markup Language
date    : 2017-12-02 16:45:25 +0900
updated : 2017-12-02 16:45:25 +0900
tags    : yaml data-format
toc     : true
public  : true
parent  : index
latex   : false
---
* TOC
{:toc}

## 개요

* 이름의 의미(최초)
> YAML Yet Another Markup Language

* 이름의 의미(현재)
> YAML (YAML Ain't Markup Language) is a human-readable data serialization language.

* 어떻게 읽지? : `야믈`과 `여믈`, `얘믈`을 적당히 섞은 느낌으로 읽는다[^1]. 난 그냥 `야믈`로 읽고 있다.
* 파일 확장자 : `yml`, `yaml`
* 개발자 : [Clark C. Evans](mailto:cce+yaml@clarkevans.com)

## 특징

* JSON이 YAML의 부분집합이다[^2]. 즉, YAML 파서는 JSON을 읽을 수 있다.
    * YAML 파일에 JSON 형식을 섞어 쓸 수 있다.
* 한 줄 주석은 `#`을 사용한다.
* python처럼 들여쓰기를 사용해 구조체를 만든다.

## 사용 예

### list

* 기본적으로는 아래와 같이 사용한다.

```yml
- foo
- bar
```

* 한 줄로 나타내는 방법도 있다. JSON과 똑같다. 타이핑하기 귀찮다면 따옴표는 생략해도 괜찮다. 단, 특수문자 등을 이용할 때에는 따옴표를 사용하자.

```yml
["foo", "bar"]
```

### map

* 기본적으로는 다음과 같이 작성할 수 있다. 물론 `hobby` 배열은 한 줄로 작성할 수도 있다.

```yml
person:
  name: John Grib
  age: 35
  hobby:
    - book
    - sports
```

* 위의 내용이 JSON이라면 다음과 같을 것이다.

```json
{
    "person": {
        "name": "John Grib",
        "age": 35,
        "hobby": ["book", "sports"]
    }
}
```

### literal block

* `|`를 사용하면 개행을 유지하는 리터럴 블록을 사용할 수 있다.

```yml
text_multi_line: |
  이렇게 쓰면 개행이 유지된다.
  즉, 이 라인은 두 번째 줄이 된다.
  리터럴 블록은 인덴트로 구별한다.
  인덴트가 앞으로 돌아가면 블록이 끝나는 것이다.
  리터럴 블록은 여기까지.
```

* `>`를 사용하면 개행을 무시하는 리터럴 블록을 사용할 수 있다.

```yml
text_single_line: >
  이렇게 쓰면 개행이 무시된다.
  즉, 이 라인이 윗줄과 합쳐져 한 줄이 되는 것이다.
  각 라인의 개행 문자는 삭제되며, 스페이스로 교체된다.
```

### inherit

* 상속도 된다!
* 아래와 같이 하면 `참새`, `오리`, `닭`은 모두 `cry`, `fly`, `color` 프로퍼티를 갖게 된다.

```yml
bird: &default_bird
  cry: 짹짹
  fly: true
  color: white

참새:
  <<: *default_bird
  color: brown

오리:
  <<: *default_bird
  cry: 꽉꽉

닭:
  <<: *default_bird
  cry: 꼬끼오
  fly: false
```

## 경험

* 데이터 파일을 git으로 관리할 경우, stringfy된 JSON을 사용하면 전체 데이터가 한 줄로 표현되어 변경 관리가 짜증난다. 물론 포매터를 사용하면 한 줄 문제가 해결된다. 그러나 JSON의 중괄호, 콤마 같은 것들이 눈에 거슬린다. 이런 경우엔 yml 형식으로 저장하면 변경된 부분만 git으로 관리할 수 있고 중괄호가 없어 보기에도 편리하다.
* Jekyll의 `_data` 디렉토리에 `파일명.yml` 파일을 넣어두면, `site.data.파일명`으로 파일 내 자료에 접근할 수 있다.


## Links

* [yaml.org](http://yaml.org/): 공식 홈페이지. 형식이 YAML로 되어 있어 재미있다.
* [YAML language spec version 1.2](http://yaml.org/spec/1.2/spec.html)
* [YAML(wikipedia)(English)](https://en.wikipedia.org/wiki/YAML)
* [YAML(wikipedia)(한국어)](https://ko.wikipedia.org/wiki/YAML)
* [Comparison of data serialization formats(wikipedia)](https://en.wikipedia.org/wiki/Comparison_of_data_serialization_formats)

## EndNotes

[^1]: [유튜브에서 `YAML`로 검색해 나온 동영상](https://www.youtube.com/results?search_query=yaml) 목록을 참고하였다.
[^2]: [YAML language spec version 1.2](http://yaml.org/spec/1.2/spec.html) 참고.
