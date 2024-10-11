import * as types from './types';

const INITIAL_STATE = {
  riskControls: [],
  loading: false,
  error: null,
};

function RiskControlReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GET_RISKCONTROLS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_RISKCONTROLS_SUCCESS:
      return {
        ...state,
        loading: false,
        riskControls: action.payload.data.riskControls,
      };
    case types.GET_RISKCONTROLS_FAILED:
      return {
        ...state,
        loading: false,
        riskControls: [],
      };
    case types.UPDATE_RISKCONTROL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.UPDATE_RISKCONTROL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.UPDATE_RISKCONTROL_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.ADD_RISKCONTROL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.ADD_RISKCONTROL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.ADD_RISKCONTROL_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.DELETE_RISKCONTROL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.DELETE_RISKCONTROL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.DELETE_RISKCONTROL_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
export default RiskControlReducer;