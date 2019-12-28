import genDiff from '../src/index';

const fs = require('fs');

const expectedFileDefault = `${__dirname}/__fixtures__/expected.txt`;
const expectedResultDefault = fs.readFileSync(expectedFileDefault, 'utf-8');

describe.each([
  [`${__dirname}/__fixtures__/json/before.json`, `${__dirname}/__fixtures__/json/after.json`, 'json'],
  [`${__dirname}/__fixtures__/yaml/before.yml`, `${__dirname}/__fixtures__/yaml/after.yml`, 'yml'],
  [`${__dirname}/__fixtures__/ini/before.ini`, `${__dirname}/__fixtures__/ini/after.ini`, 'ini'],
])('test genDiff default', (firstFile, secondFile, format) => {
  test(`${format}`, () => {
    expect(genDiff(firstFile, secondFile)).toEqual(expectedResultDefault);
  });
});

describe.each([
  [`${__dirname}/__fixtures__/json/before.json`,
    `${__dirname}/__fixtures__/json/after.json`,
    `${__dirname}/__fixtures__/json/expectedJson.json`,
    'json'],
  [`${__dirname}/__fixtures__/yaml/before.yml`,
    `${__dirname}/__fixtures__/yaml/after.yml`,
    `${__dirname}/__fixtures__/yaml/expectedJson.json`,
    'yml'],
  [`${__dirname}/__fixtures__/ini/before.ini`,
    `${__dirname}/__fixtures__/ini/after.ini`,
    `${__dirname}/__fixtures__/ini/expectedJson.json`,
    'ini'],
])('test genDiff json', (firstFile, secondFile, expectedFileJson, format) => {
  test(`${format}`, () => {
    const expectedResultJson = fs.readFileSync(expectedFileJson, 'utf-8');
    expect(genDiff(firstFile, secondFile, 'json')).toEqual(expectedResultJson);
  });
});

describe.each([
  [`${__dirname}/__fixtures__/json/beforePlain.json`,
    `${__dirname}/__fixtures__/json/afterPlain.json`,
    `${__dirname}/__fixtures__/json/expectedPlain.txt`,
    'json'],
  [`${__dirname}/__fixtures__/yaml/beforePlain.yml`,
    `${__dirname}/__fixtures__/yaml/afterPlain.yml`,
    `${__dirname}/__fixtures__/yaml/expectedPlain.txt`,
    'yml'],
  [`${__dirname}/__fixtures__/ini/beforePlain.ini`,
    `${__dirname}/__fixtures__/ini/afterPlain.ini`,
    `${__dirname}/__fixtures__/ini/expectedPlain.txt`,
    'ini'],
])('test genDiff plain', (firstFile, secondFile, expectedFilePlain, format) => {
  const expected = fs.readFileSync(expectedFilePlain, 'utf-8');
  test(`${format}`, () => {
    expect(genDiff(firstFile, secondFile, 'plain')).toEqual(expected);
  });
});
