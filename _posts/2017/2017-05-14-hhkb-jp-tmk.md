---
layout  : post
title   : HHKB jp 컨트롤 보드를 tmk로 교체해 보았다.
summary : 해피해킹을 더욱 해피하게
date    : 2017-05-14 15:50:31 +0900
tags    : hhkb keyboard tmk
toc     : true
comment : true
public  : true
---
* TOC
{:toc}

# 해피해킹을 사용하지 않은 이유

나는 나쁜 타이핑 버릇 때문에 양쪽 새끼 손가락 관절염으로 고통 받은 적이 있다.

나의 나쁜 버릇은 다음과 같다.

* 오른쪽 새끼 손가락 옆면으로 `enter` 키 누르기.
* 오른쪽 새끼 손가락 옆면으로 오른쪽 `shift` 키 누르기.
* 왼쪽 새끼 손가락 옆면으로 왼쪽 아래의 `control` 키 누르기.
* 왼쪽 새끼 손가락 옆면으로 왼쪽 `shift` 키 누르기.

꽤 고생했지만, `capslock` - `control` 키 스왑을 하고
리얼포스 87u를 사용하면서 고통에서 해방되었다.

한편 나는 리얼포스를 사용하면서도 다음과 같은 이유로 해피해킹 키보드 구매를 고려한 적이 있었다.

* `control` 키 위치가 마음에 든다. 다른 키보드라면 dip 스위치 등으로 스왑해줘야 한다.
* 나는 정전용량 무접점 방식을 선호한다.
* 가벼운 키보드. (약 0.76kg. 리얼포스는 약 1.4kg)
* 기본 레이아웃에 방향키가 없어 좋다. 방향키가 오른쪽 끝에 있으면 팔이 아프다.
* 잘 누르지 않는 `F1` ~ `F10` 라인이 숫자 열에 포함되어 있어 좋다.
* 안쪽에 철판이 있어 녹이 스는 리얼포스와 달리, 해피해킹은 플라스틱이라 녹슬지 않는다.

그러나 내가 해피해킹을 구매하지 않았던 이유는 다음과 같다.

* 해피해킹의 `fn` 방향키는 `;/['` 이다. 내가 원하는 `fn` 방향키는 `HJKL` 이다.
* `control` 키 위치는 이상적이지만, 왼쪽 아래의 `capslock` 키 공간이 비어 있다.
    * 손날로 누르기 딱 좋은 위치라 `F13`등을 매핑해 두고 이런 저런 기능을 붙여 쓰는 걸 좋아한다.
* 오른쪽 아래의 이런저런 기능 키들이 없다.
    * 나는 이 키들에 `F14`부터 `F17`까지 매핑해 두고 이런 저런 기능을 붙여 쓰는 걸 좋아한다.
* 해피해킹은 tilde 키(`~`)의 위치가 `1`의 왼쪽이 아니라 가장 오른쪽 위에 있다.
    * 나는 Vim의 `` ` `` mark 와 `~` case toggle을 자주 쓰는 편이므로, 이 키의 위치가 바뀌는 것이 마음에 들지 않는다.
* 나는 이미 리얼포스 87u 2대를 매우 만족스럽게 사용하고 있다.

무엇보다 가장 중요한 이유는 방향키.

만약 해피해킹의 `fn` 방향키가 `HJKL`이었다면 다른 단점은 아무런 문제가 되지 않았을 것이다.

# POKER 3 키보드도 고려해봤지만

내가 리얼포스를 대체할 키보드로 가장 강하게 고려하고 있었던 것은 POKER 3 였다.

* 해피해킹보다 가벼운 무게(0.39kg).
* 미니 배열이지만 해피해킹보다 키가 많다.
* 3 개의 레이어를 사용할 수 있다.
* `pn` 키를 사용해 모든 키에 매크로를 등록할 수 있다.
    * 이를 통해 키 배열을 입맛에 맞게 변경할 수 있다.
    * `HJKL`을 화살표키로 매핑할 수 있게 된다!
    * 키 하나를 눌렀을 때 특정 키 시퀀스가 순서대로 입력되게 하는 것도 가능.
* `fn` 키의 위치를 바꾸는 것도 가능하다!
* 알리 익스프레스 등에서 다양한 키캡을 구매해 꾸밀 수 있다.
    * 리얼포스나 해피해킹 키캡은 엄청나게 비싸고 잘 팔지도 않는다.

그러나 다음과 같은 이유 때문에 사지 않았다.

* 정전식 무접점이 아니다.
* 사려고 하는 쇼핑몰마다 sold out 상태.
* 미국 아마존이 한국으로 배송을 안 해줌.
* 정전식 무접점이 아니다.
    * 이러면 적축이나 흑축으로 가야 하는데, 난 정전식 무접점이 좋다.

아무래도 좀 애매해서 더 기다려보거나 다른 대안을 찾아보고,
6월까지 특별한 대안이 없으면 구매대행 등을 통해 POKER 3를 구매할 생각이었다.

그리고 몇 달 후 꽤 만족스러운 대안을 찾게 되었다.

# tmk 보드 발견

4월의 마지막 날, 웹서핑을 하다
[[TMK] Alt Controller Board for HHKB](https://geekhack.org/index.php?topic=71517.msg1733490#msg1733490)
라는 문서를 발견했다.

해피해킹 키보드를 개조하는 내용이었다.
개조의 내용은 해피해킹의 컨트롤 보드를 커스텀 펌웨어를 설치할 수 있는 tmk 보드로 교체하는 것.
천천히 읽어보니 이거라면 입맛에 맞게 해피해킹의 키 배열을 바꿀 수 있겠다 싶었다.
생각해보니 아두이노 레오나르도 같은 걸 써서 컨트롤 보드를 직접 만들어도 괜찮았을 텐데
왜 지금까지 이 생각을 못했지?

아무튼, 직접 만드는 건 귀찮은 일이니 일단 해피해킹을 바로 직구하고
보드의 제작자와 이메일을 주고받고 페이팔로 돈을 보내는 방식으로 tmk 보드를 2개 구매했다.

10일이 지나자 국제 등기로 해피해킹과 tmk 보드가 도착했다.
놀랍게도 두 물건이 한날 한시에 도착하였는데 아마도 우체부님이 편의상 묶어서 배송해주신 것 같았다.
지름신의 가호라고도 할 수 있겠다.

![hhkb jp]({{ site.url }}/post-img/2017/2017-05-14-hhkb-jp-tmk-00.jpg)

구매한 해피해킹은 키가 많은 HHKB pro JP 버전.
ISO 배열이라는 문제점이 있긴 하지만 어차피 다 바꿀 수 있을 것이므로 문제가 되지 않는다고 생각했다.

# tmk 보드 설치

해피해킹 하우징을 열고, 해피해킹 컨트롤 보드(사진의 왼쪽)를 tmk 보드로 교체하였다.
이러면 dip 스위치 구멍에 tmk 보드의 리셋 스위치가 나오게 된다.

![tmk set]({{ site.url }}/post-img/2017/2017-05-14-hhkb-jp-tmk-01.jpg)

# 펌웨어 설치 및 키 레이아웃 변경

펌웨어 설치는 엄청 쉽다. 다음과 같은 방법으로 dfu-programmer를 설치하면 끝난다.
단, 디펜던시 빌드가 꽤 오래 걸리므로 컴퓨터 앞에서 그냥 기다리면 곤란하다.
디펜던시 중 어떤 것은 빌드가 47분이나 걸리기도 했다.
잘 기억은 안 나지만 한 시간 조금 넘게 걸렸던 것 같다.

```sh
$ brew tap osx-cross/avr
$ brew install avr-libc
$ brew install dfu-programmer
```

그리고 다음과 같은 방법으로 키 배열을 변경할 수 있다.

1. [TMK Keymap Editor](http://www.tmk-kbd.com/tmk_keyboard/editor/unimap/?hhkb_jp)로 들어가서 마음대로 키 배열을 정해준다.
1. 키 배열을 다 끝냈으면 hex 파일을 다운받는다. (형식을 다 알고 있다면 에디터 없이 그냥 만들어도 된다.)
1. 해피해킹의 dip 스위치 뚜껑을 연다.
1. tmk 보드의 스위치를 누른다.
    * tmk 보드 스위치를 누르지 않으면 장비를 찾을 수 없다는 경고문이 나온다.
    * 스위치를 누르면 키보드가 작동하지 않게 되므로, 명령어를 입력할 다른 키보드 하나가 또 있어야 한다.
1. 터미널에 다음과 같이 입력하여, hex 파일을 적용한다.

```
$ dfu-programmer atmega32u4 erase --force
$ dfu-programmer atmega32u4 flash unimap.hex
$ dfu-programmer atmega32u4 reset
```

이제 키보드를 다시 사용할 수 있게 된다.
타이핑을 해보면 내가 설정한 키 배열대로 작동한다는 사실을 알 수 있다.

# 내가 설정한 레이아웃

평범한 키보드는 하나의 `fn` 키가 0~2 개 있고, `fn` 레이어도 하나만 존재한다.
한편 내가 구매를 진지하게 고려했던 POKER 3 같은 경우는 두 종류의 `fn` 키(`fn`, `pn`)와 3개의 레이어를 제공한다.

tmk 보드를 쓰면 7개의 `fn` 키와 7개의 레이어를 사용할 수 있다.

나는 다음과 같은 레이어를 구상하였다.

## 기본 레이어

* 기본이 되는 레이어로, 알파벳/숫자/엔터/스페이스 등을 배치한다.
* `~` 키는 표준 레이아웃과 같이 `1` 왼쪽에 둔다.
* 가장 왼쪽 가장 아래의 키는 `F13`으로 매핑한다.
    * 단, hammerspoon 등을 사용하여 한 번 누르면 `Esc`로 작동하게 한다.
    * 즉, `F13`은 소프트 `fn`키로 사용한다.
* `F13` 오른쪽 키는 `Esc`로 매핑한다.
* `Space` 왼쪽의 키는 `fn1` 키로 사용한다.
* `Space` 오른쪽의 키는 `shift` 키로 사용한다.
    * 이러면 오른손 엄지 손가락으로 `shift`키를 누르게 되고 새끼 손가락은 쉬게 된다.
* 즉, 가장 아랫줄은 다음과 같은 배열을 갖게 된다.
    * `F13`, `Esc`, `option`, `command`, `fn1`, `Space`, `shift`, `fn1`, `F14`, `F15`, `shift`, `option`, `fn2`, `fn7`
* 화살표 키
    * `fn1` 레이어에 `HJKL`로 배치해두긴 했지만, 내 자리에 찾아오는 다른 사람을 위해 남겨두기로 했다.
    * 화살표 키 바로 아래에 `shift` 키를 배치했다.
        * 이러면 `shift` + 화살표를 누를 때 손가락이 매우 편하게 된다.

![tmk set]({{ site.url }}/post-img/2017/2017-05-14-hhkb-jp-tmk-03.jpg)

## `fn1` 레이어

* `fn1`키와 조합하여 사용하는 레이어.
* 숫자 키 위치에 `F1` ~ `F12`를 배치. 이건 다른 미니배열과 같다.
* `HJKL`로 화살표 키 사용.
* `w` 키로 `option` + `→`, `b` 키로 `option` + `←`
    * 이러면 Vim의 `w`, `b`와 비슷하게 작동하게 된다.
* `Space` 바로 오른쪽의 키는 `Enter`로 쓴다.
    * 새끼 손가락이 아니라 엄지 손가락으로 `Enter` 키를 입력하게 된다.
* `x` 는 `delete`, `z` 는 `backspace`.
    * 오른쪽 위의 `delete` 키는 너무 멀어서 가기 귀찮다.
* 오른쪽 아래의 키 여섯 개는 `insert`, `delete`, `home`, `end`, `pageup`, `pagedown`.

![tmk set]({{ site.url }}/post-img/2017/2017-05-14-hhkb-jp-tmk-04.jpg)

## `fn2` 레이어

* 이 레이어는 마우스를 조작한다.
* 클릭, 우클릭, 마우스 포인터 이동 등이 가능하도록 설정.
* 자세한 내용은 귀찮아서 생략.

## `fn4` 레이어

* 이 레이어는 보통 윈도우즈 키보드 레이어와 비슷한 배열이다.
* 이 레이어는 `fn7` + `w` 조합으로 들어올 수 있다.
* 기본 레이어(Mac을 위한 레이어)로 돌아가려면 `fn7` + `m` 을 입력하면 된다.

## `fn7` 레이어

* Mac, Window 모드 전환을 위한 레이어.
* `fn7` + `m` 조합으로 기본 레이어를 선택 가능.
* `fn7` + `w` 조합으로 윈도우 레이어를 선택 가능.

# 끝?

만 이틀간 다양하게 설정한 끝에 위의 설정에 도달했다.
현재는 꽤 만족스럽게 사용하고 있다.

하지만 더 좋은 생각이 나거나, 다른 손가락이 아프게 된다면
다른 배열로 수정할 예정. 얼마든지 배열을 바꿀 수 있다는 것이 강점이다.

![tmk set]({{ site.url }}/post-img/2017/2017-05-14-hhkb-jp-tmk-02.jpg)

현재 키캡은 좀 난잡한 느낌.
키캡만 끼우면 완성된다...

* 해피해킹 전용 무각 키캡을 며칠 전에 구매했으므로 두근두근 기다리고 있다.
* 너무 마음에 들어서 해피해킹 jp를 하나 더 샀다. 하나는 집에서 쓰고, 하나는 회사에 놓고 쓸 생각. 사실 처음부터 이럴 생각으로 tmk 보드를 두 개 산 것이다.


# Links

* [GitHub: 내 키보드 레이아웃 hex 파일](https://github.com/johngrib/dotfiles/commit/b103a64876d206fbdd23929d7d4a5e67233e4503)
* tmk
    * [[TMK] Alt Controller Board for HHKB](https://geekhack.org/index.php?topic=71517.msg1733490#msg1733490)
    * [Keyboard firmwares for Atmel AVR and Cortex-M](https://github.com/tmk/tmk_keyboard)
    * [GitHub: Alternative Controller for HHKB Pro](https://github.com/tmk/tmk_keyboard/tree/master/keyboard/hhkb)
    * [GeekHack: Alternative Controller for HHKB](https://geekhack.org/index.php?topic=12047.0)
    * [TMK Keymap Editor](http://www.tmk-kbd.com/tmk_keyboard/editor/unimap/?hhkb_jp)

* keyboards
    * [amazon: RealForce 87u](https://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Delectronics&field-keywords=realforce+87u&rh=n%3A172282%2Ck%3Arealforce+87u)
    * [amazon: HHKB Professional JP](https://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Delectronics&field-keywords=hhkb+jp&rh=n%3A172282%2Ck%3Ahhkb+jp)
    * [amazon: POKER 3](https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Delectronics&field-keywords=poker3)
