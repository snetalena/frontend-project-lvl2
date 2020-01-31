import lodash from 'lodash';

const valueToString = (value) => {
  if (lodash.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const propertyNamesToString = (pnames) => (pnames.length > 1 ? pnames.join('.') : pnames);

const renderPlain = (ast) => {
  const iter = (tree, propertyNames) => {
    const buildLine = {
      added: (node, pnames) => `Property '${propertyNamesToString(pnames)}' was added with value: ${valueToString(node.newValue)}`,
      removed: (node, pnames) => `Property '${propertyNamesToString(pnames)}' was removed`,
      updated: (node, pnames) => `Property '${propertyNamesToString(pnames)}' was updated. From ${valueToString(node.oldValue)} to ${valueToString(node.newValue)}`,
      hasChildren: (node, pnames) => iter(node.children, pnames),
      unchanged: () => null,
    };
    const result = tree.map((node) => {
      const pnames = [...propertyNames, node.keyName];
      return buildLine[node.difference](node, pnames);
    });
    return result.filter((item) => item !== null).join('\n');
  };
  return iter(ast, []);
};

export default renderPlain;
