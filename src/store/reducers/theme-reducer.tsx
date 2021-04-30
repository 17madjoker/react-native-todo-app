import {ThemeState, SWITCH_THEME, ThemeActionTypes} from '../types/theme-types';
import * as eva from '@eva-design/eva';
import * as material from '@eva-design/material';
import {ThemeParams} from '../../models/theme-params';

const initialState: ThemeState = {
  theme: material.dark,
  themeParams: new ThemeParams(true, true),
};

export const ThemeReducer = (
  state = initialState,
  action: ThemeActionTypes,
): ThemeState => {
  switch (action.type) {
    case SWITCH_THEME:
      return {
        ...state,
        theme: getThemeByParams(action.payload),
      };
    default:
      return state;
  }
};

function getThemeByParams(p: ThemeParams) {
  if (p.IsDarkMode && p.IsMaterialTheme) return material.dark;
  else if (!p.IsDarkMode && p.IsMaterialTheme) return material.light;
  else if (p.IsDarkMode && !p.IsMaterialTheme) return eva.dark;
  else if (!p.IsDarkMode && !p.IsMaterialTheme) return eva.light;
  else return material.dark;
}
