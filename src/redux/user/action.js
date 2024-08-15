import * as types from './types';

export const listUser = payload => ({
  type: types.GET_USERS_REQUEST,
  payload
});

export const updateUser = (phoneNumber, userData) => ({
    type: types.UPDATE_USER_REQUEST,
    payload: {phoneNumber, userData}
  });

  export const AddUser = (userData) => ({
    type: types.ADD_USER_REQUEST,
    payload: userData
  });

  export const deleteUser = (id) => ({
    type: types.DELETE_USER_REQUEST,
    payload: {id}
  });