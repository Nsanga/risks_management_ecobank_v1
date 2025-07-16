import * as types from './types';

export const listEntityIncidentReports = (targetEntityId) => ({
  type: types.GET_ENTITY_INCIDENT_REPORTS_REQUEST,
  payload: targetEntityId
});