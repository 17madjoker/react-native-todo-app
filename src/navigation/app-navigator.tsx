import * as React from 'react';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/core';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {
  BottomTabBarProps,
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import About from '../screens/about';
import Settings from '../screens/settings';

import {AppRoutes} from './app-routes';
import {TodoNavigator} from './todo-navigator';

import {AppDrawer as AppDrawerComponent} from '../components/app/app-drawer';
import {AppBottomTabBar} from '../components/app/app-bottom-tab-bar';
import {LayoutIcon, PersonIcon} from '../assets/icons';

type AppDrawerNavigatorParams = {
  [AppRoutes.TODO]: undefined;
  [AppRoutes.SETTINGS]: undefined;
  [AppRoutes.ABOUT]: undefined;
};

type AppBottomTabsNavigatorParams = {
  [AppRoutes.TODO]: undefined;
  [AppRoutes.SETTINGS]: undefined;
};

export type TodoTabNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<AppBottomTabsNavigatorParams, AppRoutes.TODO>,
  DrawerNavigationProp<AppDrawerNavigatorParams, AppRoutes.SETTINGS>
>;

export type SettingsTabNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<AppBottomTabsNavigatorParams, AppRoutes.SETTINGS>,
  DrawerNavigationProp<AppDrawerNavigatorParams, AppRoutes.SETTINGS>
>;

export type BottomAppScreenProps = BottomTabBarProps & {
  navigation: TodoTabNavigationProp;
};

export type DrawerAppScreenProps = DrawerContentComponentProps & {
  navigation: DrawerNavigationProp<AppDrawerNavigatorParams, AppRoutes.ABOUT>;
};

export interface AboutScreenProps {
  navigation: DrawerNavigationProp<AppDrawerNavigatorParams, AppRoutes.ABOUT>;
  route: RouteProp<AppDrawerNavigatorParams, AppRoutes.ABOUT>;
}

const AppDrawer = createDrawerNavigator<AppDrawerNavigatorParams>();
const AppBottomTab = createBottomTabNavigator<AppBottomTabsNavigatorParams>();

const AppBottomNavigator = () => (
  <AppBottomTab.Navigator tabBar={AppBottomTabBar}>
    <AppBottomTab.Screen
      name={AppRoutes.TODO}
      component={TodoNavigator}
      options={{title: 'TODO', tabBarIcon: LayoutIcon}}
    />
    <AppBottomTab.Screen
      name={AppRoutes.SETTINGS}
      component={Settings}
      options={{title: 'Settings', tabBarIcon: PersonIcon}}
    />
  </AppBottomTab.Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <AppDrawer.Navigator
      initialRouteName={AppRoutes.TODO}
      drawerContent={AppDrawerComponent}>
      <AppDrawer.Screen
        name={AppRoutes.TODO}
        component={AppBottomNavigator}
        options={{title: 'Todo'}}
      />
      <AppDrawer.Screen
        name={AppRoutes.SETTINGS}
        component={Settings}
        options={{title: 'Settings'}}
      />
      <AppDrawer.Screen
        name={AppRoutes.ABOUT}
        component={About}
        options={{title: 'About'}}
      />
    </AppDrawer.Navigator>
  </NavigationContainer>
);
