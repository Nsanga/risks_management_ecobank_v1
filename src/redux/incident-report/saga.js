import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import { url } from 'urlLoader';
import { postRequest } from 'helper/api';
import { getTenantFromSubdomain } from 'utils/getTenant';

function* listIncidentReports(action) {
    try {
        const tenantId = getTenantFromSubdomain();
        const endpoint = `${url}/api/v1/events/getIncidentRapport`;
        
        // Ajout d'un try/catch spécifique pour la requête API
        const response = yield call(postRequest, endpoint, JSON.stringify(action.payload), tenantId);
        
        if (!response.success) {
            throw new Error(response.data?.message || 'Unknown error');
        }

        yield put({ 
            type: types.GET_ENTITY_INCIDENT_REPORTS_SUCCESS, 
            payload: { data: response } 
        });

    } catch (error) {
        // Log plus structuré
        console.log('Failed to fetch incident reports', error);
        
        yield put({ 
            type: types.GET_ENTITY_INCIDENT_REPORTS_FAILED, 
            payload: error.message || 'Failed to load reports'
        });
    }
}

export default function* IncidentReportSaga() {
    yield takeLatest(
        types.GET_ENTITY_INCIDENT_REPORTS_REQUEST,
        listIncidentReports
    );
}