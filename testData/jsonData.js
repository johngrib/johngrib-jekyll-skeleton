import fs from 'fs'

export default function getJSONTestData(name) {
    return fs.readFileSync(`testData/fixture/tag/${name}.json`).toString();
}