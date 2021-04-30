import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {
  Drawer,
  DrawerElement,
  DrawerItem,
  IndexPath,
  DrawerItemElement,
} from '@ui-kitten/components';

import {DrawerAppScreenProps} from '../../navigation/app-navigator';

const DrawerHeader = () => (
  <ImageBackground
    style={styles.header}
    source={require('../../assets/background-2.jpeg')}
  />
);

export const AppDrawer = (props: DrawerAppScreenProps): DrawerElement => {
  const onSelect = (index: IndexPath): void => {
    const selectedTabRoute: string = props.state.routeNames[index.row];
    props.navigation.navigate(selectedTabRoute);
    props.navigation.closeDrawer();
  };

  const createDrawerItemForRoute = (
    route: any,
    index: number,
  ): DrawerItemElement => {
    const {options} = props.descriptors[route.key];
    return (
      <DrawerItem
        key={index}
        title={route.name}
        accessoryLeft={options.drawerIcon}
      />
    );
  };

  return (
    <Drawer header={DrawerHeader} onSelect={onSelect}>
      {props.state.routes.map(createDrawerItemForRoute)}
    </Drawer>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 160,
  },
});
