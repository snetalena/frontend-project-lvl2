import fs from 'fs';
import lodash from 'lodash';
import path from 'path';
import getParsedData from './parsers';
import getRender from './formatters';

const buildNode = (keyName, oldValue, newValue, difference, children) => ({
  keyName, oldValue, newValue, difference, children,
});

const buildTree = (firstParse, secondParse) => {
  /*
  [
   {"keyName":"group3","oldValue":{"fee":100500},"difference":"removed"},
   {"keyName":"follow","oldValue":false,"newValue":true,"difference":"updated"}
  ]
   */
  const firstParseKeys = Object.keys(firstParse);
  const secondParseKeys = Object.keys(secondParse);
  const unionKeys = lodash.union(firstParseKeys, secondParseKeys);
  const ast = unionKeys.map((key) => {
    const firstValue = firstParse[key];
    const secondValue = secondParse[key];
    if (!lodash.has(firstParse, key)) {
      return buildNode(key, firstValue, secondValue, 'added');
    }
    if (!lodash.has(secondParse, key)) {
      return buildNode(key, firstValue, secondValue, 'removed');
    }
    if (lodash.isObject(firstValue) && lodash.isObject(secondValue)) {
      return buildNode(key, firstValue, secondValue, 'hasChildren', buildTree(firstValue, secondValue));
    }
    if (firstValue === secondValue) {
      return buildNode(key, firstValue, secondValue, 'unchanged');
    }
    return buildNode(key, firstValue, secondValue, 'updated');
  });

  return ast.slice().sort((a, b) => (a.keyName < b.keyName ? -1 : 1));
};

const getFileType = (fileName) => path.extname(fileName).slice(1);

const genDiff = (firstFileName, secondFileName, outputFormat) => {
  const firstParse = getParsedData(fs.readFileSync(firstFileName, 'utf-8'), getFileType(firstFileName));
  const secondParse = getParsedData(fs.readFileSync(secondFileName, 'utf-8'), getFileType(secondFileName));
  const ast = buildTree(firstParse, secondParse);
  return getRender(outputFormat)(ast);
};

export default genDiff;
