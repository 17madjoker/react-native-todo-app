import {TodoScheme, TodoTaskScheme} from '../schemes/todo-schemes';
import {TagScheme} from '../schemes/common-schemes';
import {TODO_SCHEME} from '../schemes/schemes';
import {Todo} from '../models/todo';
import {TodoTask} from '../models/todo-task';
import {Tag} from '../models/tag';

export const DatabaseOptions = {
  path: 'SimpleNotes.realm',
  schema: [TodoScheme, TodoTaskScheme, TagScheme],
  schemaVersion: 1,
};

// Initial DB state for test
Realm.open(DatabaseOptions)
  .then((realm) => {
    var loremTodos = [
      new Todo(
        1,
        'Lorem non completed todo',
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        50,
        false,
        [
          new TodoTask(1, 'Learn React', false),
          new TodoTask(2, 'Learn TS', true),
        ],
        [new Tag(1, 'Code'), new Tag(2, 'JS')],
      ),
      new Todo(
        2,
        'Lorem completed todo',
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        100,
        true,
        [new TodoTask(1, 'Learn Vue', true), new TodoTask(2, 'Learn JS', true)],
        [new Tag(1, 'Code'), new Tag(2, 'JS')],
      ),
    ];

    realm.write(() => {
      loremTodos.forEach((item) => {
        realm.create(TODO_SCHEME, item, true);
      });
    });
  })
  .catch((e) => console.log(e));

export default new Realm(DatabaseOptions);
