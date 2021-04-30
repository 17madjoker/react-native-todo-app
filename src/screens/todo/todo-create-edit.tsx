import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableWithoutFeedback, Keyboard, View} from 'react-native';
import {
  Layout,
  LayoutElement,
  Input,
  Button,
  Select,
  SelectItem,
  IndexPath,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {globalStyles} from '../../styles/main';
import {Todo} from '../../models/todo';
import {Tag} from '../../models/tag';
import {TodoTask} from '../../models/todo-task';
import {
  BackIcon,
  CheckmarkCircleIcon,
  PlusIcon,
  HashOutlineIcon,
  CheckmarkOutlineIcon,
  CloseOutlineIcon,
  RadioButtonOffIcon,
} from '../../assets/icons';

import {AppState} from '../../store/configure-store';
import {AppRoutes} from '../../navigation/app-routes';
import {AppToolbar} from '../../components/app/app-tool-bar';
import {TodoCreateScreenProps} from '../../navigation/todo-navigator';
import {TagModalShowcase} from '../../components/tag/tag-modal-showcase';
import {
  addTodo as _addTodo,
  updateTodo as _updateTodo,
} from '../../store/actions/todo-actions';

export type TodoCreateEditRouteParams = {
  todo: string;
};

export const TodoCreateEdit = (props: TodoCreateScreenProps): LayoutElement => {
  const dispatch = useDispatch();
  const styles = useStyleSheet(themedStyle);
  const routeName = props.route.name;

  const [todo, setTodo] = useState<Todo>(new Todo(0, '', '', 0, false, [], []));
  const [todoTask, setTodoTask] = useState<string>('');
  const [tagModalOpen, setTagModalOpen] = useState(false);
  const tags = useSelector((state: AppState) => state.TagReducer.tags);

  const [selectedTagIndex, setSelectedTagIndex] = useState<any>(
    todo.Tags?.map((tag: Tag, index: number) => {
      var tagIndex: number = tags.findIndex((t) => t.Id == tag.Id);

      if (tagIndex != -1) return new IndexPath(tagIndex);
    }),
  );

  const groupDisplayTagValues = selectedTagIndex.map((value: IndexPath) => {
    return tags[value.row] ? tags[value.row].Title : '';
  });

  useEffect(() => {
    if (props.route.params?.todo) {
      let todo: Todo = JSON.parse(props.route.params.todo);

      setTodo(todo);
      setSelectedTagIndex(
        todo.Tags.map((tag: Tag, index: number) => new IndexPath(index)),
      );
    }
  }, []);

  const selectTag = (indexPath: IndexPath | IndexPath[]): void => {
    setSelectedTagIndex(indexPath);

    const todoSelectedTags = (indexPath as IndexPath[]).map(
      (value: IndexPath) => {
        return tags[value.row];
      },
    );

    setTodo({...todo, Tags: todoSelectedTags});
  };

  const changeTodoTask = (todoTaskId: number, value: string) => {
    if (todo.Tasks.findIndex((t) => t.Id == todoTaskId) == -1) return;

    setTodo({
      ...todo,
      Tasks: todo.Tasks.map((task) =>
        task.Id == todoTaskId ? {...task, Title: value} : task,
      ),
    });
  };

  const changeTodoTaskStatus = (todoTaskId: number, status: boolean) => {
    if (todo.Tasks.findIndex((t) => t.Id == todoTaskId) == -1) return;

    setTodo({
      ...todo,
      Tasks: todo.Tasks.map((task) =>
        task.Id == todoTaskId ? {...task, IsComplete: status} : task,
      ),
    });
  };

  const deleteTodoTask = (todoTask: TodoTask) => {
    setTodo({
      ...todo,
      Tasks: todo.Tasks.filter((t) => t.Id != todoTask.Id),
    });
  };

  const addTodoTask = () => {
    if (!todoTask || todo.Tasks.findIndex((t) => t.Title == todoTask) != -1)
      return;

    const taskId =
      todo.Tasks.length > 0 ? todo.Tasks[todo.Tasks.length - 1].Id + 1 : 1;

    setTodo({
      ...todo,
      Tasks: [...todo.Tasks, new TodoTask(taskId, todoTask, false)],
    });
    setTodoTask('');
    Keyboard.dismiss();
  };

  const addUpdateTodo = () => {
    if (routeName == AppRoutes.TODO_CREATE) dispatch(_addTodo(todo));
    else dispatch(_updateTodo(todo));

    props.navigation.navigate(AppRoutes.TODO_IN_PROGRESS);
  };

  const renderInputTaskItem = (todoTask: TodoTask) => (
    <Input
      style={styles.input}
      key={todoTask.Id}
      value={todoTask.Title}
      onChangeText={(value) => changeTodoTask(todoTask.Id, value)}
      accessoryLeft={(props) => renderLeftTodoTaskListIcon(props, todoTask)}
      accessoryRight={(props) => (
        <CloseOutlineIcon {...props} onPress={() => deleteTodoTask(todoTask)} />
      )}
    />
  );

  const renderLeftTodoTaskListIcon = (props: any, todoTask: TodoTask) => (
    <TouchableWithoutFeedback
      onPress={() => changeTodoTaskStatus(todoTask.Id, !todoTask.IsComplete)}>
      {todoTask.IsComplete ? (
        <CheckmarkCircleIcon {...props} />
      ) : (
        <RadioButtonOffIcon {...props} />
      )}
    </TouchableWithoutFeedback>
  );

  const renderLeftTodoTaskInputIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={() => setTodoTask('')}>
      {todoTask.length > 0 ? (
        <CloseOutlineIcon {...props} />
      ) : (
        <PlusIcon {...props} />
      )}
    </TouchableWithoutFeedback>
  );

  return (
    <>
      <AppToolbar
        title="Todo 🐱"
        backIcon={BackIcon}
        onBackPress={props.navigation.goBack}
      />
      <Layout style={[globalStyles.container, styles.container]}>
        <Input
          style={styles.input}
          value={todo.Title}
          label="Title"
          placeholder="Place todo title"
          onChangeText={(value) => setTodo({...todo, Title: value})}
        />
        <Select
          label="Tags"
          placeholder="Select todo tags"
          caption="Tap plus to add a new tag"
          accessoryLeft={(props) => <HashOutlineIcon {...props} />}
          accessoryRight={(props) => (
            <PlusIcon {...props} onPress={() => setTagModalOpen(true)} />
          )}
          style={styles.input}
          value={groupDisplayTagValues.join(', ')}
          multiSelect={true}
          selectedIndex={selectedTagIndex}
          onFocus={() => Keyboard.dismiss()}
          onPressIn={() => (tags.length == 0 ? setTagModalOpen(true) : '')}
          onSelect={selectTag}>
          {tags.map((tag: Tag) => (
            <SelectItem key={tag.Id} title={tag.Title} />
          ))}
        </Select>
        <Input
          style={styles.input}
          value={todo.Description}
          label="Description"
          placeholder="Place todo description"
          multiline={true}
          textStyle={{height: 64}}
          onChangeText={(value) => setTodo({...todo, Description: value})}
        />
        <Input
          style={styles.input}
          label="Tasks"
          placeholder="Create a new task"
          value={todoTask}
          onChangeText={setTodoTask}
          accessoryLeft={renderLeftTodoTaskInputIcon}
          accessoryRight={(props) => (
            <CheckmarkOutlineIcon {...props} onPress={addTodoTask} />
          )}
        />
        <KeyboardAwareScrollView style={styles.tasksContainer}>
          {todo &&
            todo.Tasks.map((task: TodoTask) => renderInputTaskItem(task))}
          <View
            style={[
              styles.buttonContainer,
              {display: todo.Tasks.length > 0 ? 'flex' : 'none'},
            ]}>
            <Button
              style={[styles.button, styles.cancelButton]}
              status="primary"
              accessoryLeft={BackIcon}
              onPress={props.navigation.goBack}>
              Cancel
            </Button>
            <Button
              style={[styles.button, styles.createButton]}
              status="primary"
              accessoryRight={CheckmarkCircleIcon}
              onPress={addUpdateTodo}>
              {routeName == AppRoutes.TODO_CREATE ? 'Add' : 'Update'}
            </Button>
          </View>
        </KeyboardAwareScrollView>

        <TagModalShowcase
          visible={tagModalOpen}
          toggle={() => setTagModalOpen(false)}
        />
      </Layout>
    </>
  );
};

const themedStyle = StyleService.create({
  container: {
    paddingHorizontal: 25,
  },
  tasksContainer: {
    backgroundColor: 'background-basic-color-1',
  },
  input: {
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    marginBottom: 10,
    width: '40%',
  },
  cancelButton: {
    justifyContent: 'flex-start',
  },
  createButton: {
    justifyContent: 'flex-end',
  },
});
