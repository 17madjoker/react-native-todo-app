import {Todo} from '../../models/todo';

export const ADD_TODO = 'ADD_TODO';
export const LOAD_TODOS = 'LOAD_TODOS';
export const UPDATE_TODO = 'UPDATE_TODO';

export interface TodoState {
  todos: Todo[];
}

interface AddTodoAction {
  type: typeof ADD_TODO;
  payload: Todo;
}

interface LoadTodosAction {
  type: typeof LOAD_TODOS;
  payload: Todo[];
}

interface UpdateTodoAction {
  type: typeof UPDATE_TODO;
  payload: Todo;
}

export type TodoActionTypes =
  | AddTodoAction
  | LoadTodosAction
  | UpdateTodoAction;
