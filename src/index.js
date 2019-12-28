import lodash from 'lodash';
import getParsedFile from './parsers';
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

const genDiff = (firstFile, secondFile, format) => {
  const firstParse = getParsedFile(firstFile);
  const secondParse = getParsedFile(secondFile);
  const ast = parse(firstParse, secondParse);
  return getRender(format)(ast);
};

export default genDiff;
