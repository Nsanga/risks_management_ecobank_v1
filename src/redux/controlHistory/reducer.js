import * as types from './types';

const INITIAL_STATE = {
  controlHistories: [],
  loading: false,
  error: null,
};

function ControlHistoryReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GET_CONTROLHISTORIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_CONTROLHISTORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        controlHistories: action.payload.data.controlHistories,
      };
    case types.GET_CONTROLHISTORIES_FAILED:
      return {
        ...state,
        loading: false,
        controlHistories: [],
      };
    case types.UPDATE_CONTROLHISTORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.UPDATE_CONTROLHISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.UPDATE_CONTROLHISTORY_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.ADD_CONTROLHISTORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.ADD_CONTROLHISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.ADD_CONTROLHISTORY_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.DELETE_CONTROLHISTORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.DELETE_CONTROLHISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.DELETE_CONTROLHISTORY_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
export default ControlHistoryReducer;