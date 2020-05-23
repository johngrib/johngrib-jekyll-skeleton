---
layout  : wiki
title   : MathJax로 LaTeX 사용하기
summary :
date    : 2017-11-28 22:56:29 +0900
updated : 2019-11-04 22:13:47 +0900
tag     : latex
toc     : true
public  : true
parent  : [[how-to]]
latex   : true
---
* TOC
{:toc}

## 개요

자신의 웹 페이지에서 LaTeX를 사용하고 싶다면 MathJax에서 제공하는 자바스크립트 라이브러리를 쓰면 된다.

## 설치 방법

[MathJax.org](https://www.mathjax.org/)의 [Getting Started](https://www.mathjax.org/#gettingstarted) 페이지에서 제공하는 설명대로 다음의 코드를 자신의 웹 페이지에 추가하면 된다.

```html
<script src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-MML-AM_CHTML'></script>
```

그러면 해당 웹 페이지에 있는 텍스트 중, `$``$`로 좌우가 감싸인 문자열은 LaTeX 문법으로 인식해, 수식으로 변환해준다.

## 수식 사용 예제

* 간단한 제곱
```latex
$$( a^2 )$$
```
$$( a^2 )$$

* 이차방정식의 근의 공식
```latex
$$x = {-b \pm \sqrt{b^2-4ac} \over 2a}$$
```
$$x = {-b \pm \sqrt{b^2-4ac} \over 2a}$$

* 행렬
```latex
\begin{pmatrix}
 1 & a_1 & a_1^2 & \cdots & a_1^n \\
 1 & a_2 & a_2^2 & \cdots & a_2^n \\
 \vdots  & \vdots& \vdots & \ddots & \vdots \\
 1 & a_m & a_m^2 & \cdots & a_m^n    
 \end{pmatrix}
```
$$\begin{pmatrix}
 1 & a_1 & a_1^2 & \cdots & a_1^n \\
 1 & a_2 & a_2^2 & \cdots & a_2^n \\
 \vdots  & \vdots& \vdots & \ddots & \vdots \\
 1 & a_m & a_m^2 & \cdots & a_m^n    
 \end{pmatrix}$$

* 나눗셈
```latex
$$
\require{enclose}
\begin{array}{r}
                13  \\[-3pt]
4 \enclose{longdiv}{52} \\[-3pt]
     \underline{4}\phantom{2} \\[-3pt]
                12  \\[-3pt]
     \underline{12}
\end{array}
$$
```
$$
\require{enclose}
\begin{array}{r}
                13  \\[-3pt]
4 \enclose{longdiv}{52} \\[-3pt]
     \underline{4}\phantom{2} \\[-3pt]
                12  \\[-3pt]
     \underline{12}
\end{array}
$$

## 도구

* [detexify.kirelabs.org/classify.html](http://detexify.kirelabs.org/classify.html): 기호를 마우스로 그리면, 필기 인식으로 내가 찾는 기호와 유사한 기호의 목록과 latex 코드를 제안해준다. 매우 편리하다.

## Links

* [MathJax.org](https://www.mathjax.org/)
* [MathJax basic tutorial and quick reference](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference): 많은 예제가 있어 참고할 만하다.
* [jsbin.com/zimuxulawu](http://jsbin.com/zimuxulawu/edit?html,output): 여기서 연습해 볼 수 있다.
* [detexify.kirelabs.org/classify.html](http://detexify.kirelabs.org/classify.html): 내가 찾는 기호와 유사한 기호의 목록과 latex 코드를 제안해준다.

