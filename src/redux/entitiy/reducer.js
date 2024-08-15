import * as types from './types';

const INITIAL_STATE = {
  entities: [],
  loading: false,
  error: null,
};

function EntityReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GET_ENTITIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_ENTITIES_SUCCESS:
      return {
        ...state,
        loading: false,
        entities: action.payload.data.entities,
      };
    case types.GET_ENTITIES_FAILED:
      return {
        ...state,
        loading: false,
        entities: [],
      };
    case types.UPDATE_ENTITY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.UPDATE_ENTITY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.UPDATE_ENTITY_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.ADD_ENTITY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.ADD_ENTITY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.ADD_ENTITY_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.DELETE_ENTITY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.DELETE_ENTITY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.DELETE_ENTITY_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
export default EntityReducer;