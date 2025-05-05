import * as types from './types';

const INITIAL_STATE = {
  actionsKRI: [],
  loading: false,
  error: null,
};

function HistoryKRIReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GET_ACTIONSKRI_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_ACTIONSKRI_SUCCESS:
      return {
        ...state,
        loading: false,
        actionsKRI: action.payload.data,
      };
    case types.GET_ACTIONSKRI_FAILED:
      return {
        ...state,
        loading: false,
        actionsKRI: [],
      };
    case types.UPDATE_ACTIONKRI_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.UPDATE_ACTIONKRI_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.UPDATE_ACTIONKRI_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.ADD_ACTIONKRI_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.ADD_ACTIONKRI_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.ADD_ACTIONKRI_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.DELETE_ACTIONKRI_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.DELETE_ACTIONKRI_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.DELETE_ACTIONKRI_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
export default HistoryKRIReducer;