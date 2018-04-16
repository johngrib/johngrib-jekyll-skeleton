new Vue({
    el: '#parent-list',
    data: {
        list: []
    },
    created: function() {

        const thisName = document.getElementById('thisName').value;
        var _this = this;

        axios
            .get('/parent.txt', {})
            .then(function(resp) {

                if (resp.data == null) {
                    return;
                }

                var data = {};

                resp.data
                    .split('\n')
                    .forEach(function(row) {
                        var list = row.split('\t');
                        data[list[0]] = {
                            parentName: list[1],
                            parentUrl: '/wiki/' + list[1],
                            parentTitle: list[2]
                        };
                    });

                var plist = [];
                var target = thisName;
                for(var i = 0; i < 100; i++) {
                    var next = data[target];

                    if (!next) {
                        break;
                    }

                    plist.unshift(next);
                    target = next.parentName;
                }

                _this.list = plist;
            });
    }
});
