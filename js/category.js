(function() {
    function getTarget() {
        var thisName = document.getElementById('thisName').value;
        return thisName;
    }

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

    function getChildrenHTML(list) {
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

    axios
        .get('/data/wikilist.json', {})
        .then(function(resp) {
            if (resp.data == null) {
                return;
            }
            var list = getChildren(resp.data);
            var html = getChildrenHTML(list);
            document.getElementById('document-list').innerHTML = `<ul class="post-list">${html}</ul>`

            return;
        });
})();
