import * as types from './types';

export const listAccounts = payload => ({
  type: types.GET_ACCOUNTS_REQUEST,
  payload
});

export const updateAccount = (id, accountData) => ({
  type: types.UPDATE_ACCOUNT_REQUEST,
  payload: {id, accountData}
});