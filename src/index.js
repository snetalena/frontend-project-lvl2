import lodash from 'lodash';
import getParsedFile from './parsers';

const genDiff = (firstFile, secondFile) => {
  const firstParse = getParsedFile(firstFile);
  const secondParse = getParsedFile(secondFile);

  const firstParseKeys = Object.keys(firstParse);
  const secondParseKeys = Object.keys(secondParse);
  const sharedKeys = new Set();

  const reduceFunc = (acc, key) => {
    if (lodash.has(secondParse, key)) {
      if (firstParse[key] === secondParse[key]) {
        acc.push(`    ${key}: ${firstParse[key]}`);
      } else {
        acc.push(`  + ${key}: ${secondParse[key]}`);
        acc.push(`  - ${key}: ${firstParse[key]}`);
      }
      sharedKeys.add(key);
    } else {
      acc.push(`  - ${key}: ${firstParse[key]}`);
    }
    return acc;
  };

  const firstPartResult = firstParseKeys.reduce(reduceFunc, []);

  const result = secondParseKeys.reduce((acc, key) => {
    if (sharedKeys.has(key) === false) {
      acc.push(`  + ${key}: ${secondParse[key]}`);
    }
    return acc;
  }, firstPartResult);

  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;
