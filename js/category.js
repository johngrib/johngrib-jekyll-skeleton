(function() {
    function getTarget() {
        var thisName = document.getElementById('thisName').value;
        return thisName;
    }

    /*
     * category 타입의 문서 내부에 하위 문서 목록을 만들어 줍니다.
     */
    const target = getTarget();
    axios
        .get(`/data/metadata/${target}.json`, {})
        .then(function(resp) {
            if (resp.data == null) {
                return;
            }

            const data = resp.data;
            const children = data.children;

            var html = '';
            for (var i = 0; i < children.length; i++) {
                html += `<li id="child-document-${i}"></li>`
            }
            document.getElementById('document-list').innerHTML = `<ul class="post-list">${html}</ul>`

            if (data.children && data.children.sort) {
                insertChildren(data.children.sort());
            }
            return;
        });

    /**
     * 자식 문서들의 목록을 받아, 자식 문서 하나 하나의 링크를 만들어 삽입합니다.
     */
    function insertChildren(children) {
        for (let i = 0; i < children.length; i++) {
            const target = children[i];
            axios
                .get(`/data/metadata/${target}.json`, {})
                .then(function(resp) {
                    if (resp.data == null) {
                        return;
                    }

                    const data = resp.data;
                    const updated = data.updated.replace(/^(\d{4}-\d{2}-\d{2}).*/, '$1');
                    const title = `<span>${data.title}</span>`
                    const date = `<div class="post-meta" style="float: right;">${updated}</div>`;
                    const summary = (data.summary) ? `<div class="post-excerpt"> - ${data.summary}</div>` : '';

                    // 서브 문서들의 정보
                    const subDoc = (data.children && data.children.length > 0) ? `<div class="post-sub-document"> - 서브 문서: ${data.children.length} 개</div>` : '';

                    const html = `<a href="${data.url}" class="post-link">${title}${date}${summary}${subDoc}</a>`;
                    document.getElementById(`child-document-${i}`).innerHTML = html;

                    return;
                });

        }
    }
})();
