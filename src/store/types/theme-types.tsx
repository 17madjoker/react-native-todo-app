import {ThemeParams} from '../../models/theme-params';

export const SWITCH_THEME = 'SWITCH_THEME';

export interface ThemeState {
  theme: any;
  themeParams: ThemeParams;
}

interface SwitchTheme {
  type: typeof SWITCH_THEME;
  payload: ThemeParams;
}

export type ThemeActionTypes = SwitchTheme;
