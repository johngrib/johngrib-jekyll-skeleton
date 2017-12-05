---
layout  : wiki
title   : Groovy
summary : A multi-faceted language for the Java platform
date    : 2017-12-03 15:01:36 +0900
updated : 2017-12-03 15:01:36 +0900
tags    : language jvm-lang groovy
toc     : true
public  : true
parent  : programming-language
latex   : false
---
* TOC
{:toc}

## 개요

* JVM 랭귀지
* 설계자: James Strachan
* 라이선스: Apache License 2.0

## 특징

* Groo`b`y 가 아니라 Groo`v`y
* 세미콜론 생략 가능
* 함수 호출시 괄호 생략 가능
* 타입 생략 가능: `def` 키워드
* closure
* 람다 함수의 기본 변수로 `it`을 사용
* 0.1 + 0.2 가 0.3 으로 나온다[^1].
* 기타
    * [[Gradle]] 빌드 스크립트가 groovy를 쓴다.

## install

### macOS

brew 만세!

```bash
brew install groovy
```

## 문법

### Comment

java와 똑같다.

### String

* `'`: 문자열 생성.
* `"`: 문자열 생성. perl 처럼 `$`를 사용해 보간(interpolation)을 할 수 있다.
* `'''`: python처럼 여러 줄 String을 만들 수 있다.
* `"""`: `'''`과 같지만 interpolation을 할 수 있다.
* interpolation을 사용할 때 메소드 호출이나 계산 등이 필요하다면 중괄호를 사용하면 된다.

```groovy
def name = 'John Grib'
def hello = "Hi ${name}"
String hello2 = "Hi $name"
String five = "${2 + 3}"

String test = '''
첫번째 문자열 라인
두번째 문자열 라인
'''
```

그리고 groovy만의 특징으로 `/`와 `$/`를 사용해 문자열을 선언하는 것도 가능하다.

* `/`: 문자열 생성. `"`와 똑같지만 이스케이핑 처리가 좀 달라서 정규식을 선언할 때 편리하다.
* `$/ /$`: 여러 줄 String 생성.

### 메소드 호출시 괄호 생략

기본적으로는 다음과 같다

```groovy
println('Hello, world!')
println 'Hello, world!'
printf '%5.2f', 3.14
```

하지만 perl처럼 메소드 이름만으로 호출할 수는 없다.

인수 없이 호출한다면 `()`를 사용해야 한다.

```groovy
println     // groovy.lang.MissingPropertyException
println()   // 호출 성공
```

### map

```groovy
def map = [:]
map."name" = "John Grib"
```

### list

```groovy
def list = [1, "a", true]               // java.util.ArrayList
def linked = [1, 2, 3] as LinkedList    // java.util.LinkedList
```

### array

```groovy
String[] array = ['one', 'two']
```

### loop

groovy의 루프는 꽤 다양한 편이다.

#### java와 완전히 똑같은 loop

```groovy
// 0 부터 99 까지 출력한다
for (i = 0; i < 100; i++) {
   System.out.println(i)
}

// 0, 1, 2를 출력한다
List<Integer> list = new ArrayList<Integer>();
list.add(0);
list.add(1);
list.add(2);
for (Integer num : list) {
   System.out.println(num)
}
```

#### in

```groovy
def list = [1, 2, 3]
for (item in list) {
   println item
}

// in 을 쓰면 map도 돌릴 수 있다
def map = [name:'John', age:'35']
for (item in map) {
    println item.key
    println item.value
}
```

#### ..

```groovy
// 0 부터 99 까지 출력한다
for (num in 0..99 ) {
    println num
}
```

#### upto, step, times, each

```groovy
// 0 부터 99 까지 출력한다
def printNumber = {
   println it
}
0.upto(99, printNumber)

// 0, 2, 4, ..., 98 을 출력한다
0.step 99, 2, {
   println it
}

// this is 0, this is 1, ... this is 99 이렇게 100 줄을 출력한다
100.times {
   println "this is ${it}"
}

def list = [1, 2, 3]
list.each {
    println it
}
```

## Links

* [groovy-lang.org](http://www.groovy-lang.org/): 공식 홈페이지
* [groovy-lang.org/syntax](http://groovy-lang.org/syntax.html)
* [github.com/apache/groovy](https://github.com/apache/groovy): 소스코드
* [groovy-lang.org/install](http://groovy-lang.org/install.html)
* [Apache License 2.0](https://www.apache.org/licenses/#2.0)
* [Grails Tutorial for Beginners - Playing with Groovy Language](http://grails.asia/grails-tutorial-for-beginners-playing-with-groovy-language)

## Endnote

[^1]: [0.30000000000000004.com](http://0.30000000000000004.com/)
