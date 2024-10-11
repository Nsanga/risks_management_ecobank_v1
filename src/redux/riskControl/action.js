import * as types from './types';

export const listRiskControls = () => ({
  type: types.GET_RISKCONTROLS_REQUEST,
});

export const updateRiskControl = (id, riskControlData) => ({
    type: types.UPDATE_RISKCONTROL_REQUEST,
    payload: {id, riskControlData}
  });

  export const AddRiskControl = (riskControlData) => ({
    type: types.ADD_RISKCONTROL_REQUEST,
    payload: riskControlData
  });

  export const deleteRiskControl = (id) => ({
    type: types.DELETE_RISKCONTROL_REQUEST,
    payload: {id}
  });