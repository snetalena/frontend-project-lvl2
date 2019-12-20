import genDiff from '../src/index';

const fs = require('fs');

const expectedFile = `${__dirname}/__fixtures__/expected.txt`;
const expectedResult = fs.readFileSync(expectedFile, 'utf-8');

describe.each([
  [`${__dirname}/__fixtures__/json/before.json`, `${__dirname}/__fixtures__/json/after.json`, '.json'],
  [`${__dirname}/__fixtures__/yaml/before.yml`, `${__dirname}/__fixtures__/yaml/after.yml`, '.yml'],
  [`${__dirname}/__fixtures__/ini/before.ini`, `${__dirname}/__fixtures__/ini/after.ini`, '.ini'],
])('test genDiff', (firstFile, secondFile, format) => {
  test(`for files ${format}`, () => {
    expect(genDiff(firstFile, secondFile)).toEqual(expectedResult);
  });
});
