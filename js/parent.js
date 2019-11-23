(function() {
    function getTarget() {
        var thisName = document.getElementById('thisName').value;
        return encodeURI(thisName);
    }

    function walkParents(data) {
        var plist = [];
        var target = getTarget();

        for (var i = 0; i < 100; i++) {
            if (target == 'index') {
                break;
            }
            var next = data[target];
            if (!next || !next['parent'] || next['parent'].length < 1) {
                break;
            }
            next['url'] = '/wiki/'.concat(target)
            plist.unshift(next);
            target = encodeURI(next['parent']);
        }

        plist.pop();
        return plist;
    }

    function makeHTML(plist) {
        if (plist == null || plist.length < 1) {
            return "";
        }
        var pr = "상위 문서: "
        for (var i = 0; i < plist.length; i++) {
            pr += `<a href="${plist[i].url}">${plist[i].title}</a>`;
            if (i < plist.length - 1) {
                pr += `<span> - </span>`;
            }
        }
        return pr;
    }

    axios.get('/data/wikilist.json', {})
        .then(function(resp) {
            if (resp.data == null) {
                return;
            }
            var plist = walkParents(resp.data);
            document.getElementById('parent-list').innerHTML = makeHTML(plist);

            return;
        });
})();
