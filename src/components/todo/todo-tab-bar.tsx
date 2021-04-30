import React from 'react';
import {Divider, Tab, TabBar, TabElement} from '@ui-kitten/components';

import {TodoScreenProps} from '../../navigation/todo-navigator';
import {AppToolbar} from '../app/app-tool-bar';
import {MenuIcon} from '../../assets/icons';

export const TodoTabBar = (props: TodoScreenProps) => {
  const onTabSelect = (index: number): void => {
    const selectedTabRoute: string = props.state.routeNames[index];
    props.navigation.navigate(selectedTabRoute);
  };

  const createNavigationTabForRoute = (route): TabElement => {
    const {options} = props.descriptors[route.key];
    return (
      <Tab key={route.key} title={options.title} icon={options.tabBarIcon} />
    );
  };

  return (
    <>
      <AppToolbar
        title="Todo 🐱"
        backIcon={MenuIcon}
        onBackPress={props.navigation.toggleDrawer}
      />
      <TabBar selectedIndex={props.state.index} onSelect={onTabSelect}>
        {props.state.routes.map(createNavigationTabForRoute)}
      </TabBar>
      <Divider />
    </>
  );
};
