import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Layout,
  Toggle,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';

import {globalStyles} from '../styles/main';
import {AppToolbar} from '../components/app/app-tool-bar';
import {AppRoutes} from '../navigation/app-routes';
import {AppState} from '../store/configure-store';
import {BackIcon} from '../assets/icons';
import {BottomAppScreenProps} from '../navigation/app-navigator';
import {switchTheme} from '../store/actions/theme-actions';
import {ThemeParams} from '../models/theme-params';

export default function Settings(props: BottomAppScreenProps) {
  const styles = useStyleSheet(themedStyle);
  const dispatch = useDispatch();
  const themeParams = useSelector(
    (state: AppState) => state.ThemeReducer.themeParams,
  );

  const [darkModeToggle, setDarkModeToggle] = useState<boolean>(true);
  const [materialThemeToggle, setMaterialThemeToggle] = useState<boolean>(true);

  useEffect(() => {
    setDarkModeToggle(themeParams.IsDarkMode);
    setMaterialThemeToggle(themeParams.IsMaterialTheme);
  }, [themeParams]);

  const onCheckedDarkModeToggle = (isChecked: boolean) => {
    setDarkModeToggle(isChecked);
    dispatch(switchTheme(new ThemeParams(isChecked, materialThemeToggle)));
  };

  const onCheckedMaterialThemeToggle = (isChecked: boolean) => {
    setMaterialThemeToggle(isChecked);
    dispatch(switchTheme(new ThemeParams(darkModeToggle, isChecked)));
  };

  return (
    <>
      <AppToolbar
        title="Settings 🐱"
        backIcon={BackIcon}
        onBackPress={() => props.navigation.navigate(AppRoutes.TODO)}
      />
      <Layout style={globalStyles.container}>
        <Layout style={styles.container}>
          <Toggle
            status="basic"
            checked={darkModeToggle}
            onChange={onCheckedDarkModeToggle}>
            Dark mode: {darkModeToggle ? 'on' : 'off'}
          </Toggle>
        </Layout>
        <Layout style={styles.container}>
          <Toggle
            status="basic"
            checked={materialThemeToggle}
            onChange={onCheckedMaterialThemeToggle}>
            Material theme: {materialThemeToggle ? 'on' : 'off'}
          </Toggle>
        </Layout>
      </Layout>
    </>
  );
}

const themedStyle = StyleService.create({
  container: {
    paddingTop: 25,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});
