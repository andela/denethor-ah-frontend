import { escape } from 'validator';

const escapeInputs = (obj) => {
  return Object.assign(...Object.keys(obj).map(key => ({[key]: escape(obj[key])})));
}

export default escapeInputs;