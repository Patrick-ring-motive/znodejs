import {
  Buffer
} from 'node:buffer';

Buffer.zfrom = function() {
  try {
    return Buffer.from(...arguments);
  } catch (e) {
    return Buffer.from(e.message);
  }
}

export const zBuffer = Buffer;