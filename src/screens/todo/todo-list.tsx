import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {
  Layout,
  Text,
  LayoutElement,
  Button,
  Input,
  List,
  useStyleSheet,
  StyleService,
} from '@ui-kitten/components';

import {globalStyles} from '../../styles/main';
import {CheckmarkCircleIcon, SearchIcon} from '../../assets/icons';
import {Todo} from '../../models/todo';
import {TodoListItem} from '../../components/todo/todo-list-item';
import {AppState} from '../../store/configure-store';
import {TodoListScreenProps} from '../../navigation/todo-navigator';
import {AppRoutes} from '../../navigation/app-routes';

export const TodoList = (props: TodoListScreenProps): LayoutElement => {
  const styles = useStyleSheet(themedStyles);
  const routeName = props.route.name;

  const [query, setQuery] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const allTodos = useSelector((state: AppState) => state.TodoReducer.todos);

  useEffect(() => {
    setTodos(
      allTodos.filter((t) =>
        props.route.name == AppRoutes.TODO_IN_PROGRESS
          ? !t.IsComplete
          : t.IsComplete,
      ),
    );
  }, [allTodos]);

  const onChangeQuery = (query: string): void => {
    const nextTodos: Todo[] = allTodos.filter((todo: Todo): boolean => {
      return todo.Title.toLowerCase().includes(query.toLowerCase());
    });

    setTodos(
      nextTodos.filter((t) =>
        props.route.name == AppRoutes.TODO_IN_PROGRESS
          ? !t.IsComplete
          : t.IsComplete,
      ),
    );
    setQuery(query);
  };

  return (
    <Layout style={[globalStyles.container, styles.todoContainer]}>
      <Input
        placeholder="Search"
        value={query}
        onChangeText={onChangeQuery}
        accessoryLeft={SearchIcon}
        style={styles.filterInput}
      />
      {todos.length == 0 && (
        <View style={styles.controlContainer}>
          <Text status="control">
            {routeName == AppRoutes.TODO_IN_PROGRESS
              ? 'Todo list complete or empty  🐱'
              : 'Todo list in process or empty  🐱'}
          </Text>
        </View>
      )}
      <List
        style={styles.list}
        data={todos}
        renderItem={(item) => TodoListItem(item, props)}
      />
      <Button
        style={styles.addButton}
        appearance="filled"
        status="primary"
        accessoryLeft={CheckmarkCircleIcon}
        onPress={() => props.navigation.navigate(AppRoutes.TODO_CREATE)}>
        Add todo
      </Button>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  todoContainer: {
    justifyContent: 'space-between',
  },
  filterInput: {
    marginTop: 16,
    marginHorizontal: 8,
  },
  list: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
  },
  addButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginBottom: 10,
    marginRight: 10,
  },
  controlContainer: {
    borderRadius: 4,
    margin: 4,
    marginTop: 12,
    padding: 10,
    backgroundColor: 'color-primary-default',
    alignItems: 'center',
  },
});
