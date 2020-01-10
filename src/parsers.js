import ini from 'ini';
import yaml from 'js-yaml';

const parsers = {
  '.yml': yaml.safeLoad,
  '.json': JSON.parse,
  '.ini': ini.parse,
};

const getParser = (ext) => {
  if (parsers[ext]) {
    return parsers[ext];
  }
  throw new Error(`Can't read file format ${ext}`);
};

const getParsedData = (data, ext) => getParser(ext)(data);

export default getParsedData;
