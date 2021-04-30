import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {StatusBar} from 'react-native';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import * as material from '@eva-design/material';

import {ConfigureStore} from './src/store/configure-store';
import {AppNavigator} from './src/navigation/app-navigator';
import {loadTodos} from './src/store/actions/todo-actions';
import {loadTags} from './src/store/actions/tag-actions';

const store = ConfigureStore();

export default function App() {
  console.disableYellowBox = true;

  const [theme, setTheme] = React.useState<any>(material.dark);

  useEffect(() => {
    store.dispatch(loadTodos() as any);
    store.dispatch(loadTags() as any);
  }, []);

  useEffect(
    () =>
      store.subscribe(() => {
        setTheme(store.getState().ThemeReducer.theme);
      }),
    [store.getState().ThemeReducer.themeParams],
  );

  return (
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={theme}>
        <StatusBar backgroundColor={theme['color-primary-700']} />
        <AppNavigator />
      </ApplicationProvider>
    </Provider>
  );
}
