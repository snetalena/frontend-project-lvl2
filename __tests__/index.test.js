import genDiff from '../src/index';

const fs = require('fs');

const expectedFile = `${__dirname}/__fixtures__/expected.txt`;
const expectedResult = fs.readFileSync(expectedFile, 'utf-8');

test('test for genDiff, format json', () => {
  const firstFile = `${__dirname}/__fixtures__/before.json`;
  const secondFile = `${__dirname}/__fixtures__/after.json`;
  expect(genDiff(firstFile, secondFile)).toEqual(expectedResult);
});

test('test for genDiff, format yaml', () => {
  const firstFile = `${__dirname}/__fixtures__/yaml/before.yml`;
  const secondFile = `${__dirname}/__fixtures__/yaml/after.yml`;
  expect(genDiff(firstFile, secondFile)).toEqual(expectedResult);
});
