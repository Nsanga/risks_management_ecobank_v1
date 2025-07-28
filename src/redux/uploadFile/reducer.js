import * as types from './types';

const INITIAL_STATE = {
  loading: false,
  progress: 0,
  error: null,
  success: false,
  response: null
};

export const UploadReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.UPLOAD_FILE_REQUEST:
      return {
        ...state,
        loading: true,
        progress: 0,
        error: null,
        success: false
      };

    case types.UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        response: action.payload
      };

    case types.UPLOAD_FILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload 
      };

    case types.UPDATE_UPLOAD_PROGRESS:
      return {
        ...state,
        progress: action.payload
      };

    default:
      return state;
  }
};