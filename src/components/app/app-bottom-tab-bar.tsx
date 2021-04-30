import React from 'react';
import {
  BottomNavigation,
  BottomNavigationTab,
  BottomNavigationTabElement,
  Divider,
} from '@ui-kitten/components';

import {BottomAppScreenProps} from '../../navigation/app-navigator';

export const AppBottomTabBar = (props: BottomAppScreenProps) => {
  const onSelect = (index: number): void => {
    const selectedTabRoute: string = props.state.routeNames[index];
    props.navigation.navigate(selectedTabRoute);
  };

  const createNavigationTabForRoute = (
    route: any,
  ): BottomNavigationTabElement => {
    const {options} = props.descriptors[route.key];
    return (
      <BottomNavigationTab
        key={route.key}
        title={options.title}
        icon={options.tabBarIcon}
      />
    );
  };

  return (
    <>
      <Divider />
      <BottomNavigation
        appearance="noIndicator"
        selectedIndex={props.state.index}
        onSelect={onSelect}>
        {props.state.routes.map(createNavigationTabForRoute)}
      </BottomNavigation>
    </>
  );
};
