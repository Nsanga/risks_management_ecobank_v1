import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import toast from 'react-hot-toast';
import { getRequest } from 'helper/api';
import { url } from 'urlLoader';
import { putRequest } from 'helper/api';
import { postRequest } from 'helper/api';
import { deleteRequest } from 'helper/api';
import { getTenantFromSubdomain } from 'utils/getTenant';


function* list() {
    try {
        const tenantId = getTenantFromSubdomain();
        let link = `${url}/api/v1/risk-controls/all`;
        const data = yield getRequest(link, tenantId);;
        if (data.message === "Success") {
            yield put({ type: types.GET_RISKCONTROLS_SUCCESS, payload: data });
        } else {
            yield put({ type: types.GET_RISKCONTROLS_FAILED, payload: "echec recuperation des données" });
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.GET_RISKCONTROLS_FAILED, payload: error });
    }
}

function* update(action) {
    const { id } = action.payload;
    try {
        const tenantId = getTenantFromSubdomain();
        let link = `${url}/api/v1/risk-controls/update/${id}`;
        const data = yield putRequest(link, JSON.stringify(action.payload.riskControlData), tenantId);
        if (data.message === "Success") {
            yield put({ type: types.UPDATE_RISKCONTROL_SUCCESS, payload: data.data.riskControl });
            toast.success(data.data.message);
        } else {
            yield put({ type: types.UPDATE_RISKCONTROL_FAILED, payload: "Échec lors de la modification des données" });
            toast.error(data.data.message);
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.UPDATE_RISKCONTROL_FAILED, payload: error });
    }
}

function* add(action) {
    try {
        const tenantId = getTenantFromSubdomain();
        const link = `${url}/api/v1/risk-controls/create`;
        const data = yield postRequest(link, JSON.stringify(action.payload), tenantId);

        if (data.message === 'Created') {
            yield put({ type: types.ADD_RISKCONTROL_SUCCESS, payload: data });
            toast.success(data.data.message);
        } else {
            toast.error("Aucune donnée n'a été ajouté.");
            yield put({ type: types.ADD_RISKCONTROL_FAILED, payload: "Échec lors de la creation de l'évenement" });
        }

    } catch (error) {
        toast.error("Aucune donnée n'a été ajouté.");
        console.error(error);
        yield put({ type: types.ADD_RISKCONTROL_FAILED, payload: error.message || "Une erreur s'est produite" });
    }
}

function* deleteRiskControl(action) {
    const { id } = action.payload;
    try {
        const tenantId = getTenantFromSubdomain();
        const link = `${url}/api/v1/risk-controls/delete/${id}`;

        const data = yield deleteRequest(link, null, tenantId);
        if (data) {
            yield put({ type: types.DELETE_RISKCONTROL_SUCCESS, payload: data });
            toast.success('Risk Control deleted successfully');
            yield put({ type: types.GET_RISKCONTROLS_REQUEST});
        } else {
            toast.error("Aucune donnée n'a été supprimé.");
            yield put({ type: types.DELETE_RISKCONTROL_FAILED, payload: "Échec lors de la suppression des données" });
        }

    } catch (error) {
        console.error(error);
        toast.error("Aucune donnée n'a été supprimé.");
        yield put({ type: types.DELETE_RISKCONTROL_FAILED, payload: error.message || "Une erreur s'est produite" });
    }
}

export default function* RiskControlSaga() {
    yield takeLatest(types.GET_RISKCONTROLS_REQUEST, list);
    yield takeLatest(types.UPDATE_RISKCONTROL_REQUEST, update);
    yield takeLatest(types.ADD_RISKCONTROL_REQUEST, add);
    yield takeLatest(types.DELETE_RISKCONTROL_REQUEST, deleteRiskControl);
}