import * as React from 'react';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/core';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
  MaterialTopTabNavigationProp,
} from '@react-navigation/material-top-tabs';

import {AppRoutes} from './app-routes';
import {TodoTabNavigationProp} from './app-navigator';
import {TodoCreateEditRouteParams} from '../screens/todo/todo-create-edit';
import {TodoCreateEdit, TodoList} from '../screens/todo/index';
import {TodoTabBar} from '../components/todo/todo-tab-bar';
import {DoneAllIcon, GridIcon} from '../assets/icons';

type TodoNavigatorParams = {
  [AppRoutes.TODO]: undefined;
  [AppRoutes.TODO_CREATE]: TodoCreateEditRouteParams | undefined;
  [AppRoutes.TODO_EDIT]: TodoCreateEditRouteParams;
  [AppRoutes.TODO_IN_PROGRESS]: undefined;
  [AppRoutes.TODO_DONE]: undefined;
};

type TodoTabsNavigatorParams = {
  [AppRoutes.TODO_IN_PROGRESS]: undefined;
  [AppRoutes.TODO_DONE]: undefined;
};

export type TodoScreenProps = MaterialTopTabBarProps & {
  navigation: TodoTabNavigationProp;
};

export interface TodoListScreenProps {
  navigation: CompositeNavigationProp<
    TodoTabNavigationProp &
      StackNavigationProp<TodoNavigatorParams, AppRoutes.TODO_EDIT>,
    MaterialTopTabNavigationProp<
      TodoTabsNavigatorParams,
      AppRoutes.TODO_IN_PROGRESS
    >
  >;
  route: RouteProp<TodoTabsNavigatorParams, AppRoutes.TODO_IN_PROGRESS>;
}

export interface TodoCreateScreenProps {
  navigation: StackNavigationProp<TodoNavigatorParams, AppRoutes.TODO_CREATE>;
  route: RouteProp<TodoNavigatorParams, AppRoutes.TODO_CREATE>;
}

export interface TodoEditScreenProps {
  navigation: StackNavigationProp<TodoNavigatorParams, AppRoutes.TODO_EDIT>;
  route: RouteProp<TodoNavigatorParams, AppRoutes.TODO_EDIT>;
}

const TodoStack = createStackNavigator<TodoNavigatorParams>();
const TodoTopTab = createMaterialTopTabNavigator<TodoTabsNavigatorParams>();

const TodoTabsNavigator = () => (
  <TodoTopTab.Navigator tabBar={(props) => <TodoTabBar {...props} />}>
    <TodoTopTab.Screen
      name={AppRoutes.TODO_IN_PROGRESS}
      component={TodoList}
      options={{title: 'IN PROGRESS', tabBarIcon: GridIcon}}
    />
    <TodoTopTab.Screen
      name={AppRoutes.TODO_DONE}
      component={TodoList}
      options={{title: 'DONE', tabBarIcon: DoneAllIcon}}
    />
  </TodoTopTab.Navigator>
);

export const TodoNavigator = () => (
  <TodoStack.Navigator headerMode="none">
    <TodoStack.Screen name={AppRoutes.TODO} component={TodoTabsNavigator} />
    <TodoStack.Screen name={AppRoutes.TODO_CREATE} component={TodoCreateEdit} />
    <TodoStack.Screen name={AppRoutes.TODO_EDIT} component={TodoCreateEdit} />
  </TodoStack.Navigator>
);
