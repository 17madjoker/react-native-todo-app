import Realm from 'realm';

import {Todo} from '../../models/Todo';
import {TODO_SCHEME} from '../../schemes/schemes';
import {DatabaseOptions} from '../database';

export const addTodo = (todo: Todo) =>
  new Promise((resolve, reject) => {
    Realm.open(DatabaseOptions)
      .then((realm) => {
        const todos = realm.objects<Todo>(TODO_SCHEME).sorted('Id');
        const id = todos.length > 0 ? todos[todos.length - 1].Id + 1 : 1;
        todo.Id = id;

        todo.IsComplete =
          todo.Tasks.filter((t) => t.IsComplete == true).length ==
          todo.Tasks.length;
        todo.Progress =
          (todo.Tasks.filter((t) => t.IsComplete == true).length * 100) /
          todo.Tasks.length;

        realm.write(() => {
          realm.create(TODO_SCHEME, todo, true);
          resolve(todo);
        });
      })
      .catch((error) => reject(error));
  });

export const loadTodos = () =>
  new Promise((resolve, reject) => {
    Realm.open(DatabaseOptions)
      .then((realm) => {
        let todos = realm.objects(TODO_SCHEME);
        resolve(todos);
      })
      .catch((error) => reject(error));
  });

export const updateTodo = (todo: Todo) =>
  new Promise((resolve, reject) => {
    Realm.open(DatabaseOptions)
      .then((realm) => {
        todo.IsComplete =
          todo.Tasks.filter((t) => t.IsComplete == true).length ==
          todo.Tasks.length;
        todo.Progress =
          (todo.Tasks.filter((t) => t.IsComplete == true).length * 100) /
          todo.Tasks.length;

        realm.write(() => {
          realm.create(TODO_SCHEME, todo, true);
          resolve(todo);
        });
      })
      .catch((error) => reject(error));
  });
