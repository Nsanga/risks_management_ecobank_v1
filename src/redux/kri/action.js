import * as types from './types';

export const listKeyIndicator = () => ({
  type: types.GET_ALL_KRI_REQUEST,
});

export const listEntityKeyIndicators = (entityId) => ({
  type: types.GET_ENTITY_KRI_REQUEST,
  payload: entityId
});

export const updateKeyIndicator = (id, keyIndicatorData) => ({
  type: types.UPDATE_KRI_REQUEST,
  payload: { id, keyIndicatorData }
});

export const AddKeyIndicator = (keyIndicatorData) => ({
  type: types.ADD_KRI_REQUEST,
  payload: keyIndicatorData
});

export const deleteKeyIndicator = (id) => ({
  type: types.DELETE_KRI_REQUEST,
  payload: { id }
});