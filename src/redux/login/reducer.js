import * as types from './types';

const INITIAL_STATE = {
  token: localStorage.getItem('token') || null,
  userAuth: null,
  loading: false,
  error: null,
};

function LoginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload,
        userAuth: action.payload,
        error: null,
      };
      case types.LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
      case types.LOGOUT_SUCCESS:
      return {
        ...state,
        userAuth: null,
      };
    default:
      return state;
  }
}
export default LoginReducer;