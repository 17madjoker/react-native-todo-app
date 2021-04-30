import {
  TodoState,
  ADD_TODO,
  LOAD_TODOS,
  UPDATE_TODO,
  TodoActionTypes,
} from '../types/todo-types';

const initialState: TodoState = {
  todos: [],
};

export const TodoReducer = (
  state = initialState,
  action: TodoActionTypes,
): TodoState => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case LOAD_TODOS:
      return {
        ...state,
        todos: state.todos.concat(action.payload),
      };
    case UPDATE_TODO:
      return {
        ...state,
        todos: [
          action.payload,
          ...state.todos.filter((t) => t.Id != action.payload.Id),
        ],
      };
    default:
      return state;
  }
};
