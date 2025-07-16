import * as types from './types';

const INITIAL_STATE = {
  incident_reports: [],
  actual_incident_reports: [],
  loading_incident_reports: false,
  error: null,
};

function IncidentReportReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GET_ENTITY_INCIDENT_REPORTS_REQUEST:
      return {
        ...state,
        loading_incident_reports: true,
        error: null,
      };
    case types.GET_ENTITY_INCIDENT_REPORTS_SUCCESS:
      return {
        ...state,
        loading_incident_reports: false,
        incident_reports: action.payload.data.data,
        actual_incident_reports: action.payload.data.infoSupp,
      };
    case types.GET_ENTITY_INCIDENT_REPORTS_FAILED:
      return {
        ...state,
        loading_incident_reports: false,
        incident_reports: [],
        actual_incident_reports: [],
      };
    default:
      return state;
  }
}
export default IncidentReportReducer;