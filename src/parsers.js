import yaml from 'js-yaml';
import path from 'path';

const fs = require('fs');
const ini = require('ini');

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

const getParsedFile = (file) => {
  const ext = path.extname(file);
  return getParser(ext)(fs.readFileSync(file, 'utf-8'));
};

export default getParsedFile;
