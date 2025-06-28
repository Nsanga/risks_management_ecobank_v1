import * as types from './types';

export const listEntityReports = (reportData) => ({
  type: types.GET_ENTITY_REPORTS_REQUEST,
  payload: reportData
});

export const listEventsReports = (reportData) => ({
  type: types.GET_EVENT_ENTITY_REPORTS_REQUEST,
  payload: reportData
});

export const updateReport = (id, reportData) => ({
    type: types.UPDATE_REPORT_REQUEST,
    payload: {id, reportData}
  });

  export const AddReport = (reportData) => ({
    type: types.ADD_REPORT_REQUEST,
    payload: reportData
  });

  export const deleteReport = (id) => ({
    type: types.DELETE_REPORT_REQUEST,
    payload: {id}
  });