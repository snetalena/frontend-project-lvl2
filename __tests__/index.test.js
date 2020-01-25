import fs from 'fs';
import genDiff from '../src';

const fixturesDir = `${__dirname}/__fixtures__`;
const getTestFileName = (format, name) => `${fixturesDir}/${format}/${name}.${format}`;


describe.each([
  ['json'],
  ['yml'],
  ['ini'],
])('test genDiff', (format) => {
  const firstFileName = getTestFileName(format, 'before');
  const secondFileName = getTestFileName(format, 'after');

  test(`${format} -> default`, () => {
    const expectedResult = fs.readFileSync(`${fixturesDir}/expected.txt`, 'utf-8');
    expect(genDiff(firstFileName, secondFileName)).toEqual(expectedResult);
  });

  test(`${format} -> plain`, () => {
    const expectedResult = fs.readFileSync(`${fixturesDir}/${format}/expectedPlain.txt`, 'utf-8');
    expect(genDiff(firstFileName, secondFileName, 'plain')).toEqual(expectedResult);
  });

  test(`${format} -> json`, () => {
    const expectedResult = fs.readFileSync(`${fixturesDir}/${format}/expectedJson.json`, 'utf-8');
    expect(genDiff(firstFileName, secondFileName, 'json')).toEqual(expectedResult);
  });
});
