import * as types from './types';

export const listEntities = () => ({
  type: types.GET_ENTITIES_REQUEST,
});

export const updateEntity = (id, entityData) => ({
    type: types.UPDATE_ENTITY_REQUEST,
    payload: {id, entityData}
  });

  export const AddEntity = (entityData) => ({
    type: types.ADD_ENTITY_REQUEST,
    payload: entityData
  });

  export const deleteEntity = (id, entityData) => ({
    type: types.DELETE_ENTITY_REQUEST,
    payload: {id, entityData}
  });