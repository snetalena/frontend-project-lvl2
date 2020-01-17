import lodash from 'lodash';

const valueToString = (value) => {
  if (lodash.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};


const renderPlain = (ast) => {
  const iter = (tree, propertyNames) => {
    const redusefunc = (acc, node) => {
      const pnames = [...propertyNames, node.keyName];
      switch (node.difference) {
        case 'added':
          return [...acc, `Property '${pnames.join('.')}' was added with value: ${valueToString(node.newValue)}`];
        case 'removed':
          return [...acc, `Property '${pnames.join('.')}' was removed`];
        case 'updated':
          return [...acc, `Property '${pnames.join('.')}' was updated. From ${valueToString(node.oldValue)} to ${valueToString(node.newValue)}`];
        case 'unchanged':
          return acc;
        case 'hasChildren':
          return [...acc, iter(node.children, pnames)];
        default:
          throw new Error(`Unknown type of node ${node.difference}`);
      }
    };
    const result = tree.reduce(redusefunc, []);
    return result.join('\n');
  };
  return iter(ast, []);
};

export default renderPlain;
