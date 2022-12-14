;(function() {
    // 화면 상단의 해시태그에 링크를 걸어준다.
    var tags = document.querySelectorAll('.post-tag');
    if(tags == null || tags.length < 1) {
        return;
    }

    for (var i = 0; i < tags.length; i++) {
        var item = tags[i];
        var tagList = item.innerHTML.trim();

        if(/^\s*$/.test(tagList)) {
            continue;
        }
        tagList = tagList.split(/\s+/)
            .map(function(tag) {
                return `<a href="/tag/#${tag}">#${tag}</a>`;
            })
            .join(' ');
        tags[i].innerHTML = tagList;
    }
    return;
})();
;(function() {
    // 본문 전체의 vimwiki 링크를 html 링크로 변환한다.
    var post = document.querySelector('article.post-content');

    if(post == null) {
        return;
    }

    (function iterate_node(node) {

        if (/^(?:p|ul|h\d|table)$/i.test(node.tagName)) {

            node.innerHTML = link(node.innerHTML);

        } else { // Node.ELEMENT_NODE
            for (var i = 0; i < node.childNodes.length; i++) {
                iterate_node(node.childNodes[i]);
            }
        }
    })(post);

    function link(content) {
        // (주석처리) "\[[escape]]" 와 같이 앞에 "\"가 있다면 "\[\[escape\]\]" 로 바꾸기만 하고 링크는 생성하지 않는다.
        //                            \[[      ]]
        content = content.replace(/\\\[\[(.+?)\]\]/g, '\\[\\[$1\\]\\]');

        // (태그, 타이틀 처리) "[[#tagName#]]{text}"를 <a href="/wiki/tagName#">text</a> 로 replace하여 링크를 만든다.
        //                           [[#           #]]      {            }
        content = content.replace(/\[\[#([^\[\]]+?)#\s*\]\]\{([^\{\}]+?)\}/g,
            '<a href="/tag#$1" class="inner-link labeled-link" data-name="$1"><sup class="tagged-link"/></sup>$2</a>');

        // (태그 처리) "[[#tagName#]]"을 <a href="/wiki/tagName#">tagName</a> 로 replace하여 링크를 만든다.
        //                           [[#           #]]
        content = content.replace(/\[\[#([^\[\]]+?)#\s*\]\]/g,
            '<a href="/tag#$1" class="inner-link labeled-link" data-name="$1"><sup class="tagged-link"/></sup>$1</a>');

        // (추가 타이틀 처리) 다음과 같은 문자열을 <a href="/wiki/document">document-name</a> 으로 replace하여 링크를 만든다.
        //  [[document]]{document-name}       => <a href="/wiki/document">document-name</a>
        //  [[/document]]{document-name}      => <a href="/wiki/document">document-name</a>
        //  [[/dir/document]]{document-name}  => <a href="/wiki/dir/document">document-name</a>
        content = content.replace(/\[\[\/?([^\[\]]+?)\s*\]\]\{([^\{\}]+?)\}/g,
            '<a href="/wiki/$1" class="inner-link labeled-link" data-name="$1">$2</a>');

        // "[[document]]"가 있다면 <a href="/wiki/document">document</a> 와 같이 replace하여 링크를 만든다.
        //  예제는 (추가 타이틀 처리)와 거의 비슷하다.
        content = content.replace(/\[\[\/?(.+?)\s*\]\]/g,
            '<a href="/wiki/$1" class="inner-link no-labeled-link" data-name="$1">$1</a>');

        // (주석처리)에서 이스케이프한 문자열을 본래 표현하려 한 형식으로 되돌린다.
        content = content.replace(/\\\[\\\[(.+?)\\\]\\\]/g, '[[$1]]');

        return content;
    }

})();

;(function() {
    // 파일 이름이 링크 텍스트로 드러난 것을 문서의 타이틀로 교체해준다.
    const list = document.querySelectorAll('.no-labeled-link');

    for (var i = 0; i < list.length; i++) {
        insertTitle(i, list);
    }
    /**
     * 타이틀이 누락된 문서의 타이틀을 가져와 입력해 줍니다.
     */
    function insertTitle(index, list) {
        const item = list[index];
        if (item == undefined) {
            return;
        }
        const target = item.getAttribute('data-name')
            .replace(/#.*$/, '');

        let status = undefined;
        fetch(`/data/metadata/${target}.json`)
            .then(response => {
                status = response.status;
                return response.json()
            })
            .then(function(data) {
                if (data == null) {
                    return;
                }
                item.innerText = data.title;
                return;
            })
            .catch(function(error) {
                item.classList.add('broken-link');
                item.innerHTML += `<sub class="link-${status}"></sub>`
                console.log(target, status);
            });
    }
})();

;(function() {
    // 외부 링크에 표시를 달아준다.
    const links = document.links;

    for (let i = 0; i < links.length; i++) {
        const link = links[i];
        const url = link.getAttribute('href');
        if (/^(https?:\/\/)?johngrib\.github\.io/.test(url) || /^[\/#]/.test(url)) {
            // inner link
        } else {
            // external link
            link.classList.add('external-link')
        }

    }
})();

;(function footnoteToolTip() {
    // 주석에 툴팁을 붙인다
    const supList = document.querySelectorAll('sup[role="doc-noteref"]');
    for (let i = 0; i < supList.length; i++) {
        const sup = supList[i];

        const note = sup.querySelector('.footnote');
        const id = note.getAttribute('href').replace(/^#/, "");
        const text = document.getElementById(id).innerHTML;
        sup.innerHTML += `<span class="tooltiptext" id="tooltip-${i}">${text}</span>`

        const tooltip = sup.querySelector(".tooltiptext");

        sup.addEventListener('mouseover', function() {
            const supRect = sup.getBoundingClientRect();
            const postRect =  document.querySelector('.post-content')
                .getBoundingClientRect();

            tooltip.style.display = "block";
            const tooltipRect = tooltip.getBoundingClientRect();

            if (supRect.left + tooltipRect.width > postRect.right) {
                // 툴팁이 포스트 오른쪽 경계를 넘어간다면, 넘어간 만큼 왼쪽으로 이동시킨다.
                tooltip.style.left = `-${supRect.left + tooltipRect.width - postRect.right}px`;
                tooltip.style.right = null;
                return;
            } else {
                // 오른쪽 경계를 넘어가지 않는다면, 그냥 sup 위에 띄운다.
                tooltip.style.left = `0px`;
                tooltip.style.right = null;
                return;
            }
        });

        sup.addEventListener('mouseout', function() {
            tooltip.style.display = "none";
            tooltip.style.left = null;
            tooltip.style.right = null;
        });
    }
})();
