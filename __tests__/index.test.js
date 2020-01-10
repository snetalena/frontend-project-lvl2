import fs from 'fs';
import genDiff from '../src/index';

describe.each([
  ['json'],
  ['yml'],
  ['ini'],
])('test genDiff default', (format) => {
  test(`${format}`, () => {
    const firstFileName = `${__dirname}/__fixtures__/${format}/before.${format}`;
    const secondFileName = `${__dirname}/__fixtures__/${format}/after.${format}`;
    const expectedFileName = `${__dirname}/__fixtures__/expected.txt`;
    const expectedResult = fs.readFileSync(expectedFileName, 'utf-8');
    expect(genDiff(firstFileName, secondFileName)).toEqual(expectedResult);
  });
});

describe.each([
  ['json'],
  ['yml'],
  ['ini'],
])('test genDiff json', (format) => {
  test(`${format}`, () => {
    const firstFileName = `${__dirname}/__fixtures__/${format}/before.${format}`;
    const secondFileName = `${__dirname}/__fixtures__/${format}/after.${format}`;
    const expectedFileName = `${__dirname}/__fixtures__/${format}/expectedJson.json`;
    const expectedResult = fs.readFileSync(expectedFileName, 'utf-8');
    expect(genDiff(firstFileName, secondFileName, 'json')).toEqual(expectedResult);
  });
});

describe.each([
  ['json'],
  ['yml'],
  ['ini'],
])('test genDiff plain', (format) => {
  test(`${format}`, () => {
    const firstFileName = `${__dirname}/__fixtures__/${format}/beforePlain.${format}`;
    const secondFileName = `${__dirname}/__fixtures__/${format}/afterPlain.${format}`;
    const expectedFileName = `${__dirname}/__fixtures__/${format}/expectedPlain.txt`;
    const expectedResult = fs.readFileSync(expectedFileName, 'utf-8');
    expect(genDiff(firstFileName, secondFileName, 'plain')).toEqual(expectedResult);
  });
});
