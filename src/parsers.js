import ini from 'ini';
import yaml from 'js-yaml';

const parsers = {
  yml: yaml.safeLoad,
  json: JSON.parse,
  ini: ini.parse,
};

const getParser = (dataType) => {
  if (parsers[dataType]) {
    return parsers[dataType];
  }
  throw new Error(`Can't decode format ${dataType}`);
};

const getParsedData = (data, dataType) => getParser(dataType)(data);

export default getParsedData;
