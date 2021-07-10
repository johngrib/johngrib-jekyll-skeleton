(function() {
    function getTarget() {
        var thisName = document.getElementById('thisName').value;
        return encodeURI(thisName);
    }

    const recursiveLimit = 30;
    const target = getTarget();
    insertParent(target, 0, [])

    /**
     * 부모 문서 목록을 받아, 부모 문서들의 링크를 만들어준다.
     */
    function makeHTML(plist) {
        if (plist == null || plist.length < 1) {
            return "";
        }
        var pr = "상위 문서: "
        for (var i = 0; i < plist.length; i++) {
            pr += `<a href="${plist[i].url}">${plist[i].title}</a>`;
            if (i < plist.length - 1) {
                pr += `<span> / </span>`;
            }
        }
        return pr;
    }

    /**
     * 재귀하며 부모 문서 정보를 가져온다.
     * 모든 부모 문서를 가져오면 화면에 부모 문서 링크를 만들어 준다.
     */
    function insertParent(target, recursiveCount, parentList) {
        axios.get(`/data/metadata/${target}.json`, {})
            .then(function(resp) {
                if (resp.data == null || recursiveCount > recursiveLimit) {
                    return;
                }

                const data = resp.data;
                parentList.unshift(data);

                if (data.parent == null) {
                    parentList.pop();   // this 문서가 부모 문서 목록에 나오지 않도록 제거해준다.
                    document.getElementById('parent-list').innerHTML = makeHTML(parentList);
                    return;
                }

                setTimeout(() => insertParent(data.parent, recursiveCount + 1, parentList), 0);
                return;
            });
    }
})();
