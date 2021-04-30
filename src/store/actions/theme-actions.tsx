import {ThunkAction} from 'redux-thunk';

import {SWITCH_THEME} from '../types/theme-types';
import {AppActionTypes} from '../types/app-types';
import {ThemeParams} from '../../models/theme-params';

export const switchTheme = (
  themeParams: ThemeParams,
): ThunkAction<void, AppActionTypes, unknown, AppActionTypes> => async (
  dispatch,
) => {
  dispatch({
    type: SWITCH_THEME,
    payload: themeParams,
  });
};
