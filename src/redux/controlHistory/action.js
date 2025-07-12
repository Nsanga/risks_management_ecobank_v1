import * as types from './types';

export const listControlHistories = () => ({
  type: types.GET_CONTROLHISTORIES_REQUEST,
});

export const updateControlHistory = (id, controlHistoryData) => ({
    type: types.UPDATE_CONTROLHISTORY_REQUEST,
    payload: {id, controlHistoryData}
  });

  export const AddControlHistory = (controlHistoryData, resolve, reject) => ({
    type: types.ADD_CONTROLHISTORY_REQUEST,
    payload: controlHistoryData,
    meta: { resolve, reject }, // les callbacks
  });
  
  export const deleteControlHistory = (id) => ({
    type: types.DELETE_CONTROLHISTORY_REQUEST,
    payload: {id}
  });