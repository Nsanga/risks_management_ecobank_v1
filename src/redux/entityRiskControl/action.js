import * as types from './types';

export const listEntityRiskControls = () => ({
  type: types.GET_ENTITYRISKCONTROLS_REQUEST,
});

export const updateEntityRiskControl = (id, entityRiskControlData) => ({
    type: types.UPDATE_ENTITYRISKCONTROL_REQUEST,
    payload: {id, entityRiskControlData}
  });

  export const AddEntityRiskControl = (entityRiskControlData) => ({
    type: types.ADD_ENTITYRISKCONTROL_REQUEST,
    payload: entityRiskControlData
  });

  export const deleteEntityRiskControl = (id) => ({
    type: types.DELETE_ENTITYRISKCONTROL_REQUEST,
    payload: {id}
  });