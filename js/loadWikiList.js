axios
    .get('/wikilist.json', {})
    .then(function(resp) {
        var data = resp.data;
        if (resp.data == null) {
            return;
        }
        var data = resp.data;
        return;
    });
