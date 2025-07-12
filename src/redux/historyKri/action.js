import * as types from './types';

export const listHistoriesKRI = (idKeyIndicator) => ({
  type: types.GET_HISTORIESKRI_REQUEST,
  payload: {idKeyIndicator}
});

export const updateHistoryKRI = (id, historyKRIData) => ({
    type: types.UPDATE_HISTORYKRI_REQUEST,
    payload: {id, historyKRIData}
  });

  export const AddHistoryKRI = (historyKRIData, resolve, reject) => ({
    type: types.ADD_HISTORYKRI_REQUEST,
    payload: historyKRIData,
    meta: { resolve, reject },
  });  

  export const deleteHistoryKRI = (id) => ({
    type: types.DELETE_HISTORYKRI_REQUEST,
    payload: {id}
  });