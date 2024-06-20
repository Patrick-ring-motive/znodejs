import {
  writeFileSync,
  readFileSync
} from 'node:fs';
import {
  Buffer
} from 'node:buffer';

export const zreadFileSync = function() {
  try {
      return readFileSync(...arguments);
  } catch (e) {
      if (arguments[1]?.encoding || typeof arguments[1] == 'string') {
          return e.message;
      }
      return Buffer.from(e.message);
  }
}
export const zwriteFileSync = function() {
  try {
      return writeFileSync(...arguments);
  } catch (e) {
      console.log(e);
  }
};