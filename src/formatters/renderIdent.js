import lodash from 'lodash';

const ident = '    ';

const valueToString = (value, depth) => {
  if (!lodash.isObject(value)) {
    return value;
  }
  const keys = Object.keys(value);
  const result = keys.map((key) => {
    const line = `    ${key}: ${valueToString(value[key], depth + 1)}`;
    return `${ident.repeat(depth)}${line}`;
  });
  return `{\n${result.join('\n')}\n${ident.repeat(depth)}}`;
};


const renderIdent = (ast) => {
  const iter = (tree, depth) => {
    const buildLine = {
      added: (node, level) => `  + ${node.keyName}: ${valueToString(node.newValue, level + 1)}`,
      removed: (node, level) => `  - ${node.keyName}: ${valueToString(node.oldValue, level + 1)}`,
      updated: (node, level) => `  + ${node.keyName}: ${valueToString(node.newValue, level + 1)}\n`
            + `${ident.repeat(level)}  - ${node.keyName}: ${valueToString(node.oldValue, level + 1)}`,
      unchanged: (node, level) => `    ${node.keyName}: ${valueToString(node.oldValue, level + 1)}`,
      hasChildren: (node, level) => `    ${node.keyName}: ${iter(node.children, level + 1)}`,
    };
    const result = tree.map((node) => {
      const line = buildLine[node.difference](node, depth);
      return `${ident.repeat(depth)}${line}`;
    });
    return ['{', ...result, `${ident.repeat(depth)}}`].join('\n');
  };
  return iter(ast, 0);
};

export default renderIdent;
