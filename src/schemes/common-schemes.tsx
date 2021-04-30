import {TAG_SCHEME} from './schemes';

export const TagScheme = {
  name: TAG_SCHEME,
  primaryKey: 'Id',
  properties: {
    Id: {type: 'int', indexed: true},
    Title: {type: 'string', default: ''},
  },
};
