import * as types from './types';

const INITIAL_STATE = {
  users: [],
  loading: false,
  error: null,
  total: 0
};

function UserReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GET_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.data.users,
        total: action.payload.data.total
      };
    case types.GET_USERS_FAILED:
      return {
        ...state,
        loading: false,
        users: [],
      };
    case types.UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.UPDATE_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.ADD_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.ADD_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.DELETE_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
export default UserReducer;