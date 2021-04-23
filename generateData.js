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
    if (!data.tag) {
        return;
    }
    
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
        if (err) {
            return console.log(err);
        }
        console.log("tagMap saved.");
    });
}

/**
 * tag 하나의 정보 파일을 만든다.
 * 각 태그 하나는 하나의 json 파일을 갖게 된다.
 * 예를 들어 math 라는 태그가 있다면 ./data/tag/math.json 파일이 만들어진다.
 * json 파일의 내용은 fileName과 collection으로 구성된다.
 * 다음은 GNU.json 파일의 예이다.
 *
{
  "fileName": "agile",
  "collection": {
    "agile": {
      "type": "wiki",
      "title": "애자일(agile)에 대한 토막글 모음",
      "summary": "",
      "parent": "software-engineering",
      "url": "/wiki/agile",
      "updated": "2020-01-20 21:57:44 +0900",
      "children": []
    },
    "Tompson-s-rule-for-first-time-telescope-makers": {
      "type": "wiki",
      "title": "망원경 규칙 (Telescope Rule)",
      "summary": "4인치 반사경을 만든 다음에 6인치 반사경을 만드는 것이, 6인치 반사경 하나 만드는 것보다 더 빠르다",
      "parent": "proverb",
      "url": "/wiki/Tompson-s-rule-for-first-time-telescope-makers",
      "updated": "2019-11-24 09:36:53 +0900",
      "children": []
    }
  }
}
 */

function saveTagFiles(tagMap, pageMap) {
    for (const tag in tagMap) {
        const map = {
            fileName: tag,
            collection: {}
        };
        const tagDatas = tagMap[tag];
        for (const tagData of tagDatas) {
            const fileName = tagData.fileName;
            map.collection[fileName] = pageMap[fileName]
        }

        fs.writeFile(`./data/tag/${tag}.json`, JSON.stringify(map), err => {
            if (err) {
                return console.log(err);
            }
        });
    }
}

/**
 * 태그 하나가 갖는 자식 문서의 수를 ./_data/tagCount.yml 파일로 저장한다.
 * 만약 ACM 태그가 달린 문서가 1개 있고, agile 태그가 달린 문서가 5개 있다면 tagCount.yml 파일은 다음과 같은 내용을 갖게 된다.
-
    name: ACM
    size: 1
-
    name: agile
    size: 5
 */
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
        if (err) {
            return console.log(err);
        }
        console.log("tagCount saved.");
    });
}

function savePageList(pageMap) {
    fs.writeFile("./_data/pageMap.yml", YAML.stringify(pageMap), err => {
        if (err) {
            return console.log(err);
        }
        console.log("pageMap saved.");
    });
}

function parseInfo(file, info) {
    if (info === null) {
        return undefined;
    }
    
    const obj = {};
    obj.fileName = file.name.replace(/\.md$/, '');
    obj.type = file.type;

    const rawData = info.split('\n');

    rawData.forEach(str => {
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
        obj.url = `/wiki/${obj.fileName}`;
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

        const subPath = `${path}/${fileName}`;

        if (isDirectory(subPath)) {
            return getFiles(subPath, type, array, testFileList);
        }
        if (isMarkdown(fileName)) {
            if(testFileList && !testFileList.includes(fileName)) {
                return;
            }

            const obj = {
                'path': `${path}/${fileName}`,
                'type': type,
                'name': fileName,
                'children': [],
            };
            return array.push(obj);
        }
    });
}

function collectData(file) {
    const data = fs.readFileSync(file.path, 'utf8');
    return parseInfo(file, data.split('---')[1]);
}
