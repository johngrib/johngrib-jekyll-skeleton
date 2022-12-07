---
layout  : wikiindex
title   : wiki
toc     : true
public  : true
comment : false
updated : 2022-12-07 23:01:03 +0900
regenerate: true
---

## [[how-to]]

* [[mathjax-latex]]


---

## blog posts
<div>
    <ul>
{% for post in site.posts %}
    {% if post.public == true %}
        <li>
            <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">
                {{ post.title }}
            </a>
        </li>
    {% endif %}
{% endfor %}
    </ul>
</div>

