import * as types from './types';

const INITIAL_STATE = {
  userGroups: [],
  loading: false,
  error: null,
};

function UserGroupReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GET_USERGROUPS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_USERGROUPS_SUCCESS:
      return {
        ...state,
        loading: false,
        userGroups: action.payload.data.userGroups,
      };
    case types.GET_USERGROUPS_FAILED:
      return {
        ...state,
        loading: false,
        userGroups: [],
      };
    case types.UPDATE_USERGROUP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.UPDATE_USERGROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.UPDATE_USERGROUP_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.ADD_USERGROUP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.ADD_USERGROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.ADD_USERGROUP_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.DELETE_USERGROUP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.DELETE_USERGROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.DELETE_USERGROUP_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
export default UserGroupReducer;