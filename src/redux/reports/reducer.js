import * as types from './types';

const INITIAL_STATE = {
  reports: [],
  loading: false,
  error: null,
};

function ReportReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GET_ENTITY_REPORTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_ENTITY_REPORTS_SUCCESS:
      return {
        ...state,
        loading: false,
        reports: action.payload.data,
      };
    case types.GET_ENTITY_REPORTS_FAILED:
      return {
        ...state,
        loading: false,
        reports: [],
      };
    case types.UPDATE_REPORT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.UPDATE_REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.UPDATE_REPORT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.ADD_REPORT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.ADD_REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.ADD_REPORT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.DELETE_REPORT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.DELETE_REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.DELETE_REPORT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
export default ReportReducer;