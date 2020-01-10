import fs from 'fs';
import lodash from 'lodash';
import path from 'path';
import getParsedData from './parsers';
import getRender from './formatters';

const buildNode = (keyName, oldValue, newValue, difference, children) => ({
  keyName, oldValue, newValue, difference, children,
});

const parse = (firstParse, secondParse) => {
  /*
  [
   {"keyName":"group3","oldValue":{"fee":100500},"difference":"removed"},
   {"keyName":"follow","oldValue":false,"newValue":true,"difference":"updated"}
  ]
   */
  const firstParseKeys = Object.keys(firstParse);
  const secondParseKeys = Object.keys(secondParse);
  const unionKeys = lodash.union(firstParseKeys, secondParseKeys);
  const ast = unionKeys.reduce((acc, key) => {
    const firstValue = firstParse[key];
    const secondValue = secondParse[key];
    if (!lodash.has(firstParse, key)) {
      return [...acc, buildNode(key, firstValue, secondValue, 'added')];
    }
    if (!lodash.has(secondParse, key)) {
      return [...acc, buildNode(key, firstValue, secondValue, 'removed')];
    }
    if (lodash.isObject(firstValue) && lodash.isObject(secondValue)) {
      return [...acc, buildNode(key, firstValue, secondValue, 'hasChildren', parse(firstValue, secondValue))];
    }
    if (firstValue === secondValue) {
      return [...acc, buildNode(key, firstValue, secondValue, 'unchanged')];
    }
    return [...acc, buildNode(key, firstValue, secondValue, 'updated')];
  }, []);

  return ast.slice().sort((a, b) => (a.keyName < b.keyName ? -1 : 1));
};

const genDiff = (firstFileName, secondFileName, format) => {
  const firstParse = getParsedData(fs.readFileSync(firstFileName, 'utf-8'), path.extname(firstFileName));
  const secondParse = getParsedData(fs.readFileSync(secondFileName, 'utf-8'), path.extname(secondFileName));
  const ast = parse(firstParse, secondParse);
  return getRender(format)(ast);
};

export default genDiff;
