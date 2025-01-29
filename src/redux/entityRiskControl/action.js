import * as types from './types';

export const listEntityRiskControls = (entityName) => ({
  type: types.GET_ENTITYRISKCONTROLS_REQUEST,
  payload: {entityName}
});

export const updateEntityRiskControl = (entityRiskControlData) => ({
    type: types.UPDATE_ENTITYRISKCONTROL_REQUEST,
    payload: {entityRiskControlData}
  });

  export const AddEntityRiskControl = (entityRiskControlData) => ({
    type: types.ADD_ENTITYRISKCONTROL_REQUEST,
    payload: entityRiskControlData
  });

  export const deleteEntityRiskControl = (id) => ({
    type: types.DELETE_ENTITYRISKCONTROL_REQUEST,
    payload: {id}
  });

  export const copyEntityRiskControl = (itemIds, targetEntityId, itemType) => ({
    type: types.COPY_ENTITYRISKCONTROL_REQUEST,
    payload: {itemIds, targetEntityId, itemType}
  });

  export const moveEntityRiskControl = (itemIds, targetEntityId, itemType) => ({
    type: types.MOVE_ENTITYRISKCONTROL_REQUEST,
    payload: {itemIds, targetEntityId, itemType}
  });