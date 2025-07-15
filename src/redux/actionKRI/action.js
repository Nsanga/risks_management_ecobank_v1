import * as types from './types';

export const listActionsKRI = (idKeyIndicator) => ({
  type: types.GET_ACTIONSKRI_REQUEST,
  payload: {idKeyIndicator}
});
export const fetchAction = (idHistoryKRI) => ({
  type: types.GET_ACTIONKRI_REQUEST,
  payload: {idHistoryKRI}
});

export const updateActionKRI = (id, actionKRIData) => ({
    type: types.UPDATE_ACTIONKRI_REQUEST,
    payload: {id, actionKRIData}
  });

  export const AddActionKRI = (actionKRIData) => ({
    type: types.ADD_ACTIONKRI_REQUEST,
    payload: actionKRIData
  });

  export const deleteActionKRI = (id) => ({
    type: types.DELETE_ACTIONKRI_REQUEST,
    payload: {id}
  });