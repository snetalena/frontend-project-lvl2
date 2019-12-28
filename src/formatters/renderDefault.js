import lodash from 'lodash';

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

const buildLine = {
  added: (node, depth) => `  + ${node.keyName}: ${valueToString(node.newValue, depth + 1)}`,
  removed: (node, depth) => `  - ${node.keyName}: ${valueToString(node.oldValue, depth + 1)}`,
  updated: (node, depth) => `  + ${node.keyName}: ${valueToString(node.newValue, depth + 1)}\n`
            + `${ident.repeat(depth)}  - ${node.keyName}: ${valueToString(node.oldValue, depth + 1)}`,
  unchanged: (node, depth) => `    ${node.keyName}: ${valueToString(node.oldValue, depth + 1)}`,
};

const renderDefault = (ast, depth = 0) => {
  const result = ast.map((node) => {
    const line = node.children
      ? `    ${node.keyName}: ${renderDefault(node.children, depth + 1)}`
      : buildLine[node.difference](node, depth);

    return `${ident.repeat(depth)}${line}`;
  });
  return ['{', ...result, `${ident.repeat(depth)}}`].join('\n');
};

export default renderDefault;
