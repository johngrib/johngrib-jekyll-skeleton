(function() {
    function getTarget() {
        var thisName = document.getElementById('thisName').value;
        return thisName;
    }

    /**
     * 자식 문서들의 데이터를 받아, 자식 문서들의 데이터 list로 리턴합니다.
     */
    function getChildren(data) {
        var thisName = getTarget();
        var list = [];

        Object.keys(data)
            .forEach(function(key) {
                var item = data[key];
                if (item.parent == thisName) {
                    item.url = '/wiki/'.concat(key);
                    item.updated = item.updated.replace(/(^\d{4}.\d{2}.\d{2}).*/, '$1');
                    list.push(item);
                }
            });

        list.sort(function(a, b) {
            return a.title.toLowerCase()
                .localeCompare(b.title.toLowerCase());
        });
        return list;
    }

    /**
     * 자식 문서들의 list를 받아, 링크를 만들어 html 문자열로 리턴합니다.
     */
    function makeCategoryChildrenLinks(list) {
            /* 생성된 html 문자열 예
            <li>
                <a href="/wiki/bash-history" class="post-link">
                    <span>bash history 다루기</span>
                    <div class="post-meta" style="float: right;">2019-12-21</div>
                    <div class="post-excerpt"> - 사용법 및 잡다한 팁 요약</div>
                </a>
            </li>
            <li>
                ...
            </li>
             */
        var children = '';
        for (var i = 0; i < list.length; i++) {
            var url = list[i].url;
            var title = `<span>${list[i].title}</span>`
            var date = `<div class="post-meta" style="float: right;">${list[i].updated}</div>`;
            var summary = (list[i].summary) ? `<div class="post-excerpt"> - ${list[i].summary}</div>` : '';
            children += `<li><a href="${url}" class="post-link">${title}${date}${summary}</a></li>`;
        }
        return children;
    }

    /*
     * category 타입의 문서 내부에 하위 문서 목록을 만들어 줍니다.
     */
    axios
        .get('/data/wikilist.json', {})
        .then(function(resp) {
            if (resp.data == null) {
                return;
            }
            var list = getChildren(resp.data);
            var html = makeCategoryChildrenLinks(list);
            document.getElementById('document-list').innerHTML = `<ul class="post-list">${html}</ul>`

            return;
        });
})();
