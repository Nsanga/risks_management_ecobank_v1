import * as types from './types';

export const listActions = () => ({
  type: types.GET_ALL_ACTIONS_REQUEST,
});

export const listControlActions = (idControl) => ({
  type: types.GET_ACTIONS_REQUEST,
  payload: { idControl }
});

export const listEntityActions = (idEntity) => ({
  type: types.GET_ENTITY_ACTIONS_REQUEST,
  payload: idEntity
});

export const updateAction = (id, actionData) => ({
    type: types.UPDATE_ACTION_REQUEST,
    payload: {id, actionData}
  });

  export const AddAction = (actionData) => ({
    type: types.ADD_ACTION_REQUEST,
    payload: actionData
  });

  export const deleteAction = (id) => ({
    type: types.DELETE_ACTION_REQUEST,
    payload: {id}
  });