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
        let link = `${url}/api/v1/history/getHistory`;
        const data = yield getRequest(link, tenantId);;
        if (data.status === 200) {
            yield put({ type: types.GET_CONTROLHISTORIES_SUCCESS, payload: data });
        } else {
            yield put({ type: types.GET_CONTROLHISTORIES_FAILED, payload: "echec recuperation des données" });
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.GET_CONTROLHISTORIES_FAILED, payload: error });
    }
}

function* update(action) {
    const { id } = action.payload;
    try {
        const tenantId = getTenantFromSubdomain();
        let link = `${url}/api/v1/history/updateHistory/${id}`;
        const data = yield putRequest(link, JSON.stringify(action.payload.controlHistoryData), tenantId);
        if (data.statut === 200) {
            yield put({ type: types.UPDATE_CONTROLHISTORY_SUCCESS, payload: data.data.controlHistory });
            toast.success(data.message);
        } else {
            yield put({ type: types.UPDATE_CONTROLHISTORY_FAILED, payload: "Échec lors de la modification des données" });
            toast.error(data.message);
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.UPDATE_CONTROLHISTORY_FAILED, payload: error });
    }
}

function* add(action) {
    try {
        const tenantId = getTenantFromSubdomain();
        const link = `${url}/api/v1/history/postHistory`;
        const data = yield postRequest(link, JSON.stringify(action.payload), tenantId);

        if (data.statut === 200) {
            yield put({ type: types.ADD_CONTROLHISTORY_SUCCESS, payload: data });
            toast.success(data.message);

            // ✅ Appelle resolve pour transmettre la réponse au composant
            if (action.meta?.resolve) action.meta.resolve(data);

            // Continue ta logique
            yield put({
                type: types.GET_CONTROLHISTORIES_REQUEST,
                payload: { type: action.payload.type },
            });
        } else {
            toast.error("Aucune donnée n'a été ajoutée.");
            yield put({ type: types.ADD_CONTROLHISTORY_FAILED, payload: "Échec" });

            // ❌ Appelle reject
            if (action.meta?.reject) action.meta.reject(new Error("Échec serveur"), tenantId);
        }
    } catch (error) {
        toast.error("Erreur serveur.");
        yield put({ type: types.ADD_CONTROLHISTORY_FAILED, payload: error.message });

        // ❌ Appelle reject avec l’erreur
        if (action.meta?.reject) action.meta.reject(error);
    }
}

function* deleteControlHistory(action) {
    const { id } = action.payload;
    try {
        const tenantId = getTenantFromSubdomain();
        const link = `${url}/api/v1/history/deleteHistory/${id}`;

        const data = yield deleteRequest(link, tenantId);
        if (data) {
            yield put({ type: types.DELETE_CONTROLHISTORY_SUCCESS, payload: data });
            toast.success('control test deleted successfully');
            yield put({ type: types.GET_CONTROLHISTORIES_REQUEST });
        } else {
            toast.error("Aucune donnée n'a été supprimé.");
            yield put({ type: types.DELETE_CONTROLHISTORY_FAILED, payload: "Échec lors de la suppression des données" });
        }

    } catch (error) {
        console.error(error);
        toast.error("Aucune donnée n'a été supprimé.");
        yield put({ type: types.DELETE_CONTROLHISTORY_FAILED, payload: error.message || "Une erreur s'est produite" });
    }
}

export default function* ControlHistorySaga() {
    yield takeLatest(types.GET_CONTROLHISTORIES_REQUEST, list);
    yield takeLatest(types.UPDATE_CONTROLHISTORY_REQUEST, update);
    yield takeLatest(types.ADD_CONTROLHISTORY_REQUEST, add);
    yield takeLatest(types.DELETE_CONTROLHISTORY_REQUEST, deleteControlHistory);
}