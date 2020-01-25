import lodash from 'lodash';

const valueToString = (value) => {
  if (lodash.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const renderPlain = (ast) => {
  const iter = (tree, propertyNames) => {
    const buildLine = {
      added: (node, propertyName) => `Property '${propertyName.length > 1 ? propertyName.join('.') : propertyName}' was added with value: ${valueToString(node.newValue)}`,
      removed: (node, propertyName) => `Property '${propertyName.length > 1 ? propertyName.join('.') : propertyName}' was removed`,
      updated: (node, propertyName) => `Property '${propertyName.length > 1 ? propertyName.join('.') : propertyName}' was updated. From ${valueToString(node.oldValue)} to ${valueToString(node.newValue)}`,
      hasChildren: (node, propertyName) => iter(node.children, propertyName),
      unchanged: () => '',
    };
    const result = tree.map((node) => {
      const pnames = [...propertyNames, node.keyName];
      return buildLine[node.difference](node, pnames);
    });
    return result.filter((item) => item !== '').join('\n');
  };
  return iter(ast, []);
};

export default renderPlain;
