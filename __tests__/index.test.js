import genDiff from '../src/index';

const fs = require('fs');

test('test for genDiff, format json', () => {
  console.log(__dirname);
  const firstFile = `${__dirname}/__fixtures__/before.json`;
  const secondFile = `${__dirname}/__fixtures__/after.json`;
  const expectedFile = `${__dirname}/__fixtures__/expected.txt`;
  const expectedResult = fs.readFileSync(expectedFile, 'utf-8');
  expect(genDiff(firstFile, secondFile)).toEqual(expectedResult);
});
