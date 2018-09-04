new Vue({
    el: '#parent-list',
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
                var plist = [];
                var target = encodeURI(thisName);
                for(var i = 0; i < 100; i++) {
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
                _this.list = plist;
                window.list = plist;
                return;
            });
    }
});
