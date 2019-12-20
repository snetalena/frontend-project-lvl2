import lodash from 'lodash';
import getParsedFile from './parsers';

const buildNode = (keyName, value, difference, children) => ({
  keyName, value, difference, children,
});

const parse = (firstParse, secondParse) => {
  const firstParseKeys = Object.keys(firstParse);
  const secondParseKeys = Object.keys(secondParse);
  const unionKeys = lodash.union(firstParseKeys, secondParseKeys);

  const ast = unionKeys.reduce((acc, key) => {
    if (!lodash.has(firstParse, key)) {
      return [...acc, buildNode(key, secondParse[key], '+')];
    }
    if (!lodash.has(secondParse, key)) {
      return [...acc, buildNode(key, firstParse[key], '-')];
    }
    if (lodash.isObject(firstParse[key]) && lodash.isObject(secondParse[key])) {
      return [...acc, buildNode(key, '', ' ', parse(firstParse[key], secondParse[key]))];
    }
    if (firstParse[key] === secondParse[key]) {
      return [...acc, buildNode(key, firstParse[key], ' ')];
    }
    return [...acc, buildNode(key, secondParse[key], '+'), buildNode(key, firstParse[key], '-')];
  }, []);

  return ast.slice().sort();
};

const ident = '    ';

const valueToString = (value, depth) => {
  if (lodash.isObject(value)) {
    const keys = Object.keys(value);
    const result = keys.map((key) => {
      const line = `    ${key}: ${valueToString(value[key], depth + 1)}`;
      return `${ident.repeat(depth)}${line}`;
    });
    return `{\n${result.join('\n')}\n${ident.repeat(depth)}}`;
  }
  return value;
};

export const render = (ast, depth = 0) => {
  const result = ast.map((node) => {
    const line = `  ${node.difference} ${node.keyName}: ${node.children ? render(node.children, depth + 1) : valueToString(node.value, depth + 1)}`;
    return `${ident.repeat(depth)}${line}`;
  });
  return ['{', ...result, `${ident.repeat(depth)}}`].join('\n');
};

const genDiff = (firstFile, secondFile) => {
  const firstParse = getParsedFile(firstFile);
  const secondParse = getParsedFile(secondFile);
  const ast = parse(firstParse, secondParse);
  return render(ast);
};

export default genDiff;
