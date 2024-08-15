import * as types from './types';

const INITIAL_STATE = {
  profiles: [],
  loading: false,
  error: null,
};

function ProfileReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GET_PROFILES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_PROFILES_SUCCESS:
      return {
        ...state,
        loading: false,
        profiles: action.payload.data.profiles,
      };
    case types.GET_PROFILES_FAILED:
      return {
        ...state,
        loading: false,
        profiles: [],
      };
    case types.UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.UPDATE_PROFILE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.ADD_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.ADD_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.ADD_PROFILE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.DELETE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.DELETE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.DELETE_PROFILE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
export default ProfileReducer;