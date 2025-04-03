import * as types from './types';

const INITIAL_STATE = {
  actions: [],
  loading: false,
  error: null,
};

function ActionReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GET_ACTIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_ACTIONS_SUCCESS: 
      return {
        ...state,
        loading: false,
        actions: action.payload.data,
      };
    case types.GET_ACTIONS_FAILED:
      return {
        ...state,
        loading: false,
        actions: [], 
      };
    case types.UPDATE_ACTION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.UPDATE_ACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.UPDATE_ACTION_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.ADD_ACTION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.ADD_ACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.ADD_ACTION_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.DELETE_ACTION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.DELETE_ACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.DELETE_ACTION_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
export default ActionReducer;