import * as types from './types';

export const loginRequest = (userId, password) => ({
  type: types.LOGIN_REQUEST,
  payload: {userId, password},
});

export const logoutSuccess = () => ({
  type: types.LOGOUT_SUCCESS,
});