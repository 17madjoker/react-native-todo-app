import {ThunkAction} from 'redux-thunk';

import {Tag} from '../../models/tag';
import {ADD_TAG, LOAD_TAGS, UPDATE_TAG, DELETE_TAG} from '../types/tag-types';
import {AppActionTypes} from '../types/app-types';
import {
  loadTags as _loadTags,
  addTag as _addTag,
  updateTag as _updateTag,
  deleteTag as _deleteTag,
} from '../../database/services/tag-service';

export const addTag = (
  tag: Tag,
): ThunkAction<void, AppActionTypes, unknown, AppActionTypes> => async (
  dispatch,
) => {
  await _addTag(tag);

  dispatch({
    type: ADD_TAG,
    payload: tag,
  });
};

export const loadTags = (): ThunkAction<
  void,
  AppActionTypes,
  unknown,
  AppActionTypes
> => async (dispatch) => {
  var tags = [] as Tag[];

  await _loadTags()
    .then((data) => {
      (data as Realm.Results<Tag>).forEach((item: Tag) => tags.push(item));
    })
    .catch((error) => {
      console.log(error);
    });

  dispatch({
    type: LOAD_TAGS,
    payload: tags,
  });
};

export const updateTag = (
  tag: Tag,
): ThunkAction<void, AppActionTypes, unknown, AppActionTypes> => async (
  dispatch,
) => {
  await _updateTag(tag);

  dispatch({
    type: UPDATE_TAG,
    payload: tag,
  });
};

export const deleteTag = (
  tag: Tag,
): ThunkAction<void, AppActionTypes, unknown, AppActionTypes> => async (
  dispatch,
) => {
  dispatch({
    type: DELETE_TAG,
    payload: tag,
  });

  await _deleteTag(tag);
};
