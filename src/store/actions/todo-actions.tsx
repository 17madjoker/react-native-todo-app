import {ThunkAction} from 'redux-thunk';

import {Todo} from '../../models/todo';
import {ADD_TODO, LOAD_TODOS, UPDATE_TODO} from '../types/todo-types';
import {AppActionTypes} from '../types/app-types';
import {
  loadTodos as _loadTodos,
  addTodo as _addTodo,
  updateTodo as _updateTodo,
} from '../../database/services/todo-service';

export const addTodo = (
  todo: Todo,
): ThunkAction<void, AppActionTypes, unknown, AppActionTypes> => async (
  dispatch,
) => {
  await _addTodo(todo);

  dispatch({
    type: ADD_TODO,
    payload: todo,
  });
};

export const loadTodos = (): ThunkAction<
  void,
  AppActionTypes,
  unknown,
  AppActionTypes
> => async (dispatch) => {
  var todos = [] as Todo[];

  await _loadTodos()
    .then((data) => {
      (data as Realm.Results<Todo>).forEach((item: Todo) => todos.push(item));
    })
    .catch((error) => {
      console.log(error);
    });

  dispatch({
    type: LOAD_TODOS,
    payload: todos,
  });
};

export const updateTodo = (
  todo: Todo,
): ThunkAction<void, AppActionTypes, unknown, AppActionTypes> => async (
  dispatch,
) => {
  await _updateTodo(todo);

  dispatch({
    type: UPDATE_TODO,
    payload: todo,
  });
};
