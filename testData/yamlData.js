import fs from 'fs'

export default function getYAMLTestData(name) {
    return fs.readFileSync(`testData/fixture/yaml/${name}.yml`).toString();
}