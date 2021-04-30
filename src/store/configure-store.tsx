import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk, {ThunkMiddleware} from 'redux-thunk';

import {TodoReducer} from './reducers/todo-reducer';
import {TagReducer} from './reducers/tag-reducer';
import {ThemeReducer} from './reducers/theme-reducer';
import {AppActionTypes} from './types/app-types';

const rootReducer = combineReducers({
  TodoReducer,
  TagReducer,
  ThemeReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

const middlewares = [thunk as ThunkMiddleware<AppState, AppActionTypes>];

export function ConfigureStore() {
  return createStore(rootReducer, applyMiddleware(...middlewares));
}
