import fs from 'fs'
import getJSONTestData from './testData/jsonData'
import getYAMLTestData from './testData/yamlData'

describe('test data.tag/* .json', () => {
    it.each(
        [
            'DI',
            'Gerald-Weinberg',
            'Martin-Fowler',
            'OOP',
            'TIL',
            'aheui',
            'aws',
            'bot',
            'chatbot',
            'emacs',
            'evil',
            'game',
            'hammerspoon',
            'heroku',
            'how-to',
            'ideavim',
            'input-source',
            'intelliJ',
            'jetBrains',
            'jwp',
            'karabiner',
            'latex',
            'mockito',
            'node-js',
            'open-source',
            'study',
            'telegram',
            'vim',
            '삽질',
            '개발자',
            '소트웍스-앤솔러지',
            '프로그래밍-심리학',
            '구름입력기',
        ]
        )(`%s.json`, (fileName) => {
            const output = fs.readFileSync(`./data/tag/${fileName}.json`,'utf8').toString();
            expect(output).toBe(getJSONTestData(fileName))
        })
})

describe('test _data/* .yml', () => {
    it.each(
        [
            'pageMap', 
            'tagCount',
            'tagMap'
        ]
        )(`%s.yml`, fileName => {
        const output = fs.readFileSync(`./_data/${fileName}.yml`,'utf8').toString();
        expect(output).toBe(getYAMLTestData(fileName))
    })
}) 
