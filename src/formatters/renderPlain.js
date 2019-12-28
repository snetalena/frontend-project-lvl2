import lodash from 'lodash';

const valueToString = (value) => {
  if (lodash.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const buildLine = {
  added: (node, propertyName) => `Property '${propertyName}' was added with value: ${valueToString(node.newValue)}`,
  removed: (node, propertyName) => `Property '${propertyName}' was removed`,
  updated: (node, propertyName) => `Property '${propertyName}' was updated. From ${valueToString(node.oldValue)} to ${valueToString(node.newValue)}`,
};

const renderPlain = (ast, propertyNames = []) => {
  const redusefunc = (acc, node) => {
    const pnames = [...propertyNames, node.keyName];
    if (node.children) {
      return [...acc, renderPlain(node.children, pnames)];
    }
    return node.difference === 'unchanged'
      ? acc
      : [...acc, buildLine[node.difference](node, pnames.join('.'))];
  };
  const result = ast.reduce(redusefunc, []);
  return result.join('\n');
};

export default renderPlain;
