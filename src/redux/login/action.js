import * as types from './types';

export const loginRequest = (email, password) => ({
  type: types.LOGIN_REQUEST,
  payload: {email, password},
});

export const logoutSuccess = () => ({
  type: types.LOGOUT_SUCCESS,
});