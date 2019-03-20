import { escape } from 'validator';

export const escapeInputs = (obj) => {
  return Object.assign(...Object.keys(obj).map(key => ({[key]: escape(obj[key])})));
};
