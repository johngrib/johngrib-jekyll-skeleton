#!/usr/bin/env node

const YAML = require('yamljs');
const fs = require('fs');
const list = [];
const tagMap = {};
const pageMap = {};

getFiles('./_wiki', 'wiki', list);
getFiles('./_posts', 'blog', list);

const dataList = list.map(file => collectData(file))
                     .filter((row) => row != null)
                     .filter((row) => row.public != 'false')
                     .sort(lexicalOrderingBy('fileName'))


dataList.forEach(function collectTagMap(data) {
    if (!data.tag) return;
    
    data.tag.forEach(tag => {
        if (!tagMap[tag]) {
            tagMap[tag] = [];
        }
        tagMap[tag].push({
            fileName: data.fileName,
            // updated: data.updated || data.date,
        });
    });
});

for (const tag in tagMap) {
    tagMap[tag].sort(lexicalOrderingBy('fileName'));
}
saveTagMap(tagMap);

dataList.sort(lexicalOrderingBy('fileName'))
        .forEach((page) => { 
            pageMap[page.fileName] = 
                        {
                            type: page.type,
                            title: page.title,
                            summary: page.summary,
                            parent: page.parent,
                            url: page.url,
                            updated: page.updated || page.date,
                            children: [],
                        };
        });

dataList.forEach(page => {
    if (page.parent && page.parent != 'index') {

        const parent = pageMap[page.parent];

        if (parent && parent.children) {
            parent.children.push(page.fileName);
        }
    }
});

savePageList(pageMap);
saveTagFiles(tagMap, pageMap);
saveTagCount(tagMap);

function lexicalOrderingBy(property) {
    return (a, b) => a[property].toLowerCase()
                        .localeCompare(b[property].toLowerCase())
}

function saveTagMap(tagMap) {
    fs.writeFile("./_data/tagMap.yml", YAML.stringify(tagMap), err => {
        if (err) return console.log(err);
        console.log("tagMap saved.");
    });
}

function collectData(file) {
    const data = fs.readFileSync(file.path, 'utf8');
    return parseInfo(file, data.split('---')[1]);
}

function saveTagFiles(tagMap, pageMap) {
    for (const tag in tagMap) {
        const map = {
            fileName: tag,
            collection: {}
        };
        const tagData = tagMap[tag];
        for (const i in tagData) {
            var fileName = tagData[i].fileName;
            map.collection[fileName] = pageMap[fileName]
        }

        fs.writeFile("./data/tag/" + tag + ".json", JSON.stringify(map), err => {
            if (err) return console.log(err);
        });
    }
}

function saveTagCount(tagMap) {
    const list = [];
    for (const tag in tagMap) {
        list.push({
            name: tag,
            size: tagMap[tag].length
        });
    }
    const sortedList = list.sort((lexicalOrderingBy('name')));

    fs.writeFile("./_data/tagCount.yml", YAML.stringify(sortedList), function(err) {
        if (err) return console.log(err);
        console.log("tagCount saved.");
    });
}

function savePageList(pageMap) {
    fs.writeFile("./_data/pageMap.yml", YAML.stringify(pageMap), err => {
        if (err) return console.log(err);
        console.log("pageMap saved.");
    });
}

function parseInfo(file, info) {
    if (info === null) return undefined;
    
    const obj = {};
    obj.fileName = file.name.replace(/\.md$/, '');
    obj.type = file.type;

    const rawData = info.split('\n');

    rawData.forEach(str => {
        const result = /^\s*([^:]+):\s*(.+)\s*$/.exec(str);

        if (result == null) return;
        
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

function getFiles(path, type, array, testFileList = null) {

    fs.readdirSync(path).forEach(fileName => {

        const subPath = path + '/' + fileName;

        if (isDirectory(subPath)) {
            return getFiles(subPath, type, array, testFileList);
        }
        if (isMarkdown(fileName)) {
            if(testFileList && !testFileList.includes(fileName)) return;

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