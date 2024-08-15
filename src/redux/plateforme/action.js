import * as types from './types';

export const listMessage = payload => ({
  type: types.GET_MESSAGE_REQUEST,
  payload
});

export const updateMessage = (id, plateformeData) => ({
    type: types.UPDATE_MESSAGE_REQUEST,
    payload: {id, plateformeData}
  });