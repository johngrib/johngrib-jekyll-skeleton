---
layout  : post
title   : IdeaVIM 빌드가 안 되는 문제 해결.
summary : "결론: 삽질 끝에 공식 계정에 물어보고 해결."
date    : 2017-01-30 21:22:53 +0900
tags    : ideavim open-source jetBrains intelliJ 삽질
toc     : true
comment : true
public  : true
---
* TOC
{:toc}

오래간만에 [IdeaVIM Github][link1]에 가보니 Commit이 꽤 많아졌길래 별 생각 없이 `pull`을 했다.

```sh
git pull --rebase upstrem master
```

다음과 같이 빌드도 해 주었다.

```sh
./gradlew clean buildPlugin
```

그리고 IntelliJ에 들어가서 `Install plugin from disk`를 통해 빌드한 `jar`파일을 설치하려 했는데...

`Error : Plugin 'IdeaVim' is incompatible with this installation`라는 에러가 발생했다.

앗 뭐지. 온갖 삽질을 거친 끝에 [@ideavim][link-ideavim] 트위터 계정에 물어보니 [다음과 같은 응답][link-answer]을 받을 수 있었다.

> @JohnGrib Current master branch is 2017.1+ due to platform API changes, check out branch platform-143 for 2016.1+.

대충 현재 `master`브랜치는 IntelliJ IDEA 2017.1+ 빌드를 위한 것이니까, 2016.1+ 빌드를 위한 `platform-143`브랜치로 체크아웃하면 된다는 것. 해보니 잘 된다. 역시 삽질부터 하지 말고 진작 공식 계정에 물어볼 걸 그랬다.

[link1]: https://github.com/JetBrains/ideavim/commits/master
[link-ideavim]: https://twitter.com/ideavim
[link-answer]: https://twitter.com/ideavim/status/826032176286269440
