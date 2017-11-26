---
layout  : post
title   : Jekyll 블로그에 태그 추가하기.
summary : 마음에 드는 플러그인이 없어서 조잡하게나마 직접 만들었다.
date    : 2017-01-22 08:52:22 +0900
tags    : jekyll
toc     : true
comment : true
public  : true
---
* TOC
{:toc}

Jekyll을 사용해 블로그를 만들었고 포스팅도 하나 올리긴 했는데 이제부턴 무엇을 한다?  
나중에 글이 쌓이게 되면 정리가 필요할 테니까 작업을 미리 해두면 좋을 것 같았다.  
이럴 땐 보통 다음의 세 방법을 쓰기 마련이다.

1. 검색
2. 카테고리
3. 태그

검색은 구글 검색을 붙이면 될 것 같고, 카테고리는 관리하기 귀찮다.  

# 태그를 모아 볼 수 있으면 좋겠네.

구글링해보니 대충 내용은 비슷하고 다음의 두 블로그 글이 읽을만했다.
* [Adding tag cloud and archives page to Jekyll][link1]
* [Generating Tag cloud on Jekyll blog without plugin][link2]

[link1]: https://blog.meinside.pe.kr/Adding-tag-cloud-and-archives-page-to-Jekyll/
[link2]: https://superdevresources.com/tag-cloud-jekyll/

## 1. 태그 전용 페이지를 만들어 준다.

### 1.1. 참고한 블로그들의 방식
다른 블로그에서 소개하는 방식들은 태그 페이지에 들어가면 모든 포스트 목록이 화면에 나타나게 되어 있었다.  
다음과 같은 형식이다.

```
* 태그 A
    * A에 대한 포스트 1
    * A에 대한 포스트 2
    * ...
* 태그 B
    * B에 대한 포스트 1
    * B에 대한 포스트 2
    * ...
```

심플하긴 한데 썩 마음에 들지는 않는다.  
이러면 태그 페이지에 들어갔을 때 블로그의 모든 글이 나열된다.

글이 엄청 많아지면 무지 짜증날 것이다.  
보고 싶은 태그만 보여주는 쪽이 여러모로 편리하다.

Jekyll 자체의 기능만으로도 할 수 있을 것 같다는 생각은 드는데 안타깝게도 나는 Jekyll을 잘 모른다.  
Jekyll 공식 문서와 씨름하고 싶은 생각도 없다.  

### 1.2. 내게 필요한 방식
내게 필요한 태그 페이지는 다음과 같은 방식이면 충분하다.

```
* 태그 A
* 태그 B
```

이 상태에서 `태그 A`를 클릭하면 다음과 같이 글 목록이 나타난다.

```
* 태그 A
* 태그 B

* A에 대한 포스트 1
* A에 대한 포스트 2
* ...
```

### 1.3. 만들어 보자.

업무용으로 만드는 것도 아니고, 취미로 만드는 거니까 간단하게 jQuery로 해결하자.  
일단 다음과 같이 생각을 정리해 보았다.

* 기본적으로 모든 글의 목록은 숨겨진 상태로 한다.
* `//johngrib.github.io/tags#태그명`으로 들어오면 해당 태그에 엮인 목록만 보여주도록 한다.
* 하나의 태그에 엮인 글 목록을 숨겨진 상태에서 보이는 상태로 바꾸는 함수 `showTag`를 작성한다.
* 각 태그를 클릭하면, 선택한 태그만 보여주고 다른 태그는 모두 숨겨진 상태로 바꾼다.

그리고 아래와 같이 작성하였다.

`tags.html`
{% highlight html linenos=table %}
{% raw %}
---
layout: page
permalink: /tags/
title: Tag
---

<ul class="tag-cloud">
{% for tag in site.tags %}

    <!-- tag_name 변수 지정: 태그명은 소문자화(slugize) 한다 -->
    {% capture tag_name %}{{tag|first|slugize}}{% endcapture %}
    <!-- font_size 변수 지정: 태그숫자/전체태그숫자 * 100 + 50 -->
    {% capture font_size %}{{tag|last|size| times:100 | divided_by:site.tags.size | plus: 50 }}%{% endcapture %}
    <!-- tag_size 변수 지정-->
    {% capture tag_size %}{{tag|last|size}}{% endcapture %}

    <li style="font-size:{{font_size}}">
        <a href="#{{tag_name}}" onclick="showTag('#{{tag_name}}')">
            {{tag_name}} ({{tag_size}})
        </a>
    </li>

{% endfor %}
</ul>

<div id="archives">
{% for tag in site.tags %}

    {% capture tag_name %}{{tag|first|slugize}}{% endcapture %}

    <div class="archive-group" style="display:none" id="{{tag_name}}">

    <h3 id="{{tag_name}}">{{ tag_name }}</h3>

    {% for post in site.tags[tag_name] %}
        <article class="archive-item">
            <h4>
                <!-- click 하여 show/hide 한다 -->
                <a href="{{ root_url }}{{ post.url }}">
                    {{post.title}}
                </a>
            </h4>
        </article>
    {% endfor %}

    </div>
{% endfor %}
</div>

<script src="//ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script>
    $(document).ready(function init(){
        var url = window.location.href;
        var req = /#([^\s]+)$/.exec(url);

        if(!Array.isArray(req)) {
            return false;
        }
        var selector = '#' + req.pop();
        showTag(selector);
    });

    function showTag(selector) {
        $('.archive-group').hide();
        $(selector).show();
    }
</script>
{% endraw %}
{% endhighlight %}

## 2. post의 metadata를 수정한다.

다음과 같이 수정해주면 된다.

```
---
layout: post
title: 글의 제목
category: 카테고리
tags: [태그1, 태그2]
---
```

오케이 잘 돌아간다. 만족스럽다.

일단 여기까지 하자.

