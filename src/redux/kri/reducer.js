import * as types from './types';

const INITIAL_STATE = {
  keyIndicator: [],
  loading: false,
  error: null,
};

function KeyIndicatorReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GET_ALL_KRI_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_ALL_KRI_SUCCESS:
      return {
        ...state,
        loading: false,
        keyIndicator: action.payload,
      };
    case types.GET_ALL_KRI_FAILED:
      return {
        ...state,
        loading: false,
        keyIndicator: [],
      };
    case types.GET_KRI_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_KRI_SUCCESS:
      return {
        ...state,
        loading: false,
        keyIndicator: action.payload,
      };
    case types.GET_KRI_FAILED:
      return {
        ...state,
        loading: false,
        keyIndicator: [],
      };
    case types.GET_ENTITY_KRI_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_ENTITY_KRI_SUCCESS:
      return {
        ...state,
        loading: false,
        keyIndicator: action.payload,
      };
    case types.GET_ENTITY_KRI_FAILED:
      return {
        ...state,
        loading: false,
        keyIndicator: [],
      };
    case types.UPDATE_KRI_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.UPDATE_KRI_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.UPDATE_KRI_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.ADD_KRI_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.ADD_KRI_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.ADD_KRI_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.DELETE_KRI_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.DELETE_KRI_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.DELETE_KRI_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
export default KeyIndicatorReducer;