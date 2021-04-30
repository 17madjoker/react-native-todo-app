import {Tag} from '../../models/tag';

export const ADD_TAG = 'ADD_TAG';
export const LOAD_TAGS = 'LOAD_TAGS';
export const UPDATE_TAG = 'UPDATE_TAG';
export const DELETE_TAG = 'DELETE_TAG';

export interface TagState {
  tags: Tag[];
}

interface AddTagAction {
  type: typeof ADD_TAG;
  payload: Tag;
}

interface LoadTagsAction {
  type: typeof LOAD_TAGS;
  payload: Tag[];
}

interface UpdateTagAction {
  type: typeof UPDATE_TAG;
  payload: Tag;
}

interface DeleteTagAction {
  type: typeof DELETE_TAG;
  payload: Tag;
}

export type TagActionTypes =
  | AddTagAction
  | LoadTagsAction
  | UpdateTagAction
  | DeleteTagAction;
