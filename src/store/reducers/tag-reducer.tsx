import {
  TagState,
  ADD_TAG,
  LOAD_TAGS,
  UPDATE_TAG,
  DELETE_TAG,
  TagActionTypes,
} from '../types/tag-types';

const initialState: TagState = {
  tags: [],
};

export const TagReducer = (
  state = initialState,
  action: TagActionTypes,
): TagState => {
  switch (action.type) {
    case ADD_TAG:
      return {
        ...state,
        tags: [...state.tags, action.payload],
      };
    case LOAD_TAGS:
      return {
        ...state,
        tags: state.tags.concat(action.payload),
      };
    case UPDATE_TAG:
      return {
        ...state,
        tags: [
          action.payload,
          ...state.tags.filter((t) => t.Id != action.payload.Id),
        ],
      };
    case DELETE_TAG:
      return {
        ...state,
        tags: state.tags.filter((item) => item.Id != action.payload.Id),
      };
    default:
      return state;
  }
};
