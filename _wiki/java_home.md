---
layout  : wiki
title   : java_home 명령어
summary : return a value for $JAVA_HOME
date    : 2017-12-03 15:01:36 +0900
updated : 2017-12-03 15:01:36 +0900
tags    : bash java mac
toc     : true
public  : true
parent  : index
latex   : false
---
* TOC
{:toc}

## 개요

* MAC OS 한정 `JAVA_HOME` 환경변수 설정용 명령어.
* 자바 패스를 리턴해 준다.
* 존재를 모르거나 까먹어서 안 쓰는 명령어.
* 다음엔 까먹지 말아야지.

## 사용법

아래 명령어를 `.bash_profile`에 추가하거나 터미널에서 사용하면 된다.

```bash
export JAVA_HOME=$(/usr/libexec/java_home)
```
