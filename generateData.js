#!/usr/bin/env node

const YAML = require('yamljs');
const fs = require('fs');
const path = './_wiki'
const list = [];

getFiles('./_wiki', 'wiki', list);
getFiles('./_posts', 'blog', list);

const dataList = list.map(function collectData(file) {

    const data = fs.readFileSync(file.path, 'utf8');
    return parseInfo(file, data.split('---')[1]);

}).filter(function removeNullData(row) {

    return row != null;

}).filter(function removePrivate(row) {

    return row.public != 'false';

}).sort(function sortByFileName(a, b) {

    return a.fileName.toLowerCase().localeCompare(b.fileName.toLowerCase());

});

const tagMap = {};

dataList.forEach(function collectTagMap(data) {
    if (!data.tag) {
        return;
    }
    data.tag.forEach(function(tag) {
        if (!tagMap[tag]) {
            tagMap[tag] = [];
        }
        tagMap[tag].push({
            fileName: data.fileName,
            // updated: data.updated || data.date,
        });
    });
});

for (tag in tagMap) {
    tagMap[tag].sort(function sortByFileName(a, b) {
        return a.fileName.toLowerCase().localeCompare(b.fileName.toLowerCase());
    });
}
saveTagMap(tagMap);


const tagList = Object.keys(tagMap).sort(function sortByTagName(a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
});

saveTagList(tagList)

const pageMap = {};
dataList.sort(function(a, b) {
    return a.url.toLowerCase().localeCompare(b.url.toLowerCase());
}).forEach(function(page) {

    pageMap[page.fileName] = {
        type: page.type,
        title: page.title,
        summary: page.summary,
        parent: page.parent,
        url: page.url,
        updated: page.updated || page.date,
        children: [],
    };

});

dataList.forEach(function(page) {
    if (page.parent && page.parent != 'index') {

        var parent = pageMap[page.parent];

        if (parent && parent.children) {
            parent.children.push(page.fileName);
        }
    }
});

savePageList(pageMap);

function saveTagMap(tagMap) {
    fs.writeFile("./_data/tagMap.yml", YAML.stringify(tagMap), function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("tagMap saved.");
    });
}

function saveTagList(tagList) {
    fs.writeFile("./_data/tagList.yml", YAML.stringify(tagList), function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("tagList saved.");
    });
}

function savePageList(pageMap) {
    fs.writeFile("./_data/pageMap.yml", YAML.stringify(pageMap), function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("pageMap saved.");
    });
}

function parseInfo(file, info) {
    if (info == null) {
        return undefined;
    }
    const obj = {};
    obj.fileName = file.name.replace(/\.md$/, '');
    obj.type = file.type;

    const rawData = info.split('\n');

    rawData.forEach(function(str) {
        const result = /^\s*([^:]+):\s*(.+)\s*$/.exec(str);

        if (result == null) {
            return;
        }

        const key = result[1].trim();
        const val = result[2].trim().replace(/\[{2}|\]{2}/g, '');

        obj[key] = val;
    });

    if (file.type === 'blog') {
        obj.url = '/blog/' + obj.date.replace(/^(\d{4})-(\d{2})-(\d{2}).*$/, '$1/$2/$3/');
        obj.url += obj.fileName.replace(/^(\d{4}-\d{2}-\d{2}-)?(.*)$/, '$2');
    } else if (file.type === 'wiki') {
        obj.url = '/wiki/' + obj.fileName;
    }

    if (obj.tag) {
        obj.tag = obj.tag.split(/\s+/);
    }

    const mtime = fs.statSync(file.path).mtime;
    obj.modified = mtime;

    return obj;
}

function isDirectory(path) {
    return fs.lstatSync(path).isDirectory();
}

function isMarkdown(fileName) {
    return /\.md$/.test(fileName);
}

function getFiles(path, type, array) {

    fs.readdirSync(path).forEach(function(fileName) {

        const subPath = path + '/' + fileName;

        if (isDirectory(subPath)) {
            return getFiles(subPath, type, array);
        }
        if (isMarkdown(fileName)) {
            const obj = {
                'path': path + '/' + fileName,
                'type': type,
                'name': fileName,
                'children': [],
            };
            return array.push(obj);
        }
    });
}
