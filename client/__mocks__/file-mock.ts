// fileTransformer.js
import {basename} from 'path'

module.exports = {
  process(src: string, filename: string) {
    return 'module.exports = ' + JSON.stringify(basename(filename)) + ';';
  },
};
