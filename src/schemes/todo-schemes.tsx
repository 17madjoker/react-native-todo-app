import {TAG_SCHEME, TODO_SCHEME, TODO_TASK_SCHEME} from './schemes';

export const TodoScheme = {
  name: TODO_SCHEME,
  primaryKey: 'Id',
  properties: {
    Id: {type: 'int', indexed: true},
    Title: {type: 'string', default: ''},
    Description: {type: 'string', default: ''},
    Progress: {type: 'int', default: 0},
    IsComplete: {type: 'bool', default: false},
    Tags: {type: 'list', objectType: TAG_SCHEME},
    Tasks: {type: 'list', objectType: TODO_TASK_SCHEME},
  },
};

export const TodoTaskScheme = {
  name: TODO_TASK_SCHEME,
  properties: {
    Id: {type: 'int', indexed: true},
    Title: {type: 'string', default: ''},
    IsComplete: {type: 'bool', default: false},
  },
};
