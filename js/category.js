new Vue({
    el: '#document-list',
    data: {
        list: []
    },
    created: function() {

        var thisName = document.getElementById('thisName').value;
        var _this = this;

        axios
            .get('/data/wikilist.json', {})
            .then(function(resp) {

                if (resp.data == null) {
                    return;
                }
                var data = resp.data;
                var list = [];

                Object.keys(data)
                    .forEach(function(key){
                        var item = data[key];
                        if (item.parent == thisName) {
                            item.url = '/wiki/'.concat(key);
                            item.updated = item.updated.replace(/(^\d{4}.\d{2}.\d{2}).*/, '$1');
                            list.push(item);
                        }
                    });

                list.sort(function(a,b) {
                    return a.title.toLowerCase()
                        .localeCompare(b.title.toLowerCase());
                });

                _this.list = list;

                return;
            });
    }
});
