import {TodoActionTypes} from './todo-types';
import {TagActionTypes} from './tag-types';
import {ThemeActionTypes} from './theme-types';

export type AppActionTypes =
  | TodoActionTypes
  | TagActionTypes
  | ThemeActionTypes;
