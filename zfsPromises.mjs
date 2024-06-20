import {
  writeFile,
  readFile
} from 'node:fs/promises';
import {
  Buffer
} from 'node:buffer';

export const zreadFile = async function() {
  try {
      return await readFile(...arguments);
  } catch (e) {
      if (arguments[1]?.encoding || typeof arguments[1] == 'string') {
          return e.message;
      }
      return Buffer.from(e.message);
  }
}
export const zwriteFile = async function() {
  try {
      return await writeFile(...arguments);
  } catch (e) {
      console.log(e);
  }
};