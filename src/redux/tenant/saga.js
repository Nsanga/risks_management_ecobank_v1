import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import toast from 'react-hot-toast';
import { getRequest } from 'helper/api';
import { url } from 'urlLoader';
import { putRequest } from 'helper/api';
import { postRequest } from 'helper/api';
import { deleteRequest } from 'helper/api';


function* list() {
    try {
        let link = `${url}/api/v1/tenant`;
        const data = yield getRequest(link);
        if (data.status === 200) {
            yield put({ type: types.GET_TENANTS_SUCCESS, payload: data });
        } else {
            yield put({ type: types.GET_TENANTS_FAILED, payload: "echec recuperation des données" });
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.GET_TENANTS_FAILED, payload: error });
    }
}

function* update(action) {
    const { id } = action.payload;
    try {
        let link = `${url}/api/v1/tenant/${id}`;
        const data = yield putRequest(link, JSON.stringify(action.payload.tenantData));
        if (data.status === 200) {
            yield put({ type: types.UPDATE_TENANT_SUCCESS, payload: data.data.entity});
            toast.success("Tenant updated successfully");
            yield put({ type: types.GET_TENANTS_REQUEST});
        } else {
            yield put({ type: types.UPDATE_TENANT_FAILED, payload: "Échec lors de la modification des données" });
            toast.error(data.message);
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.UPDATE_TENANT_FAILED, payload: error });
    }
}

function* add(action) {
    try {
        const link = `${url}/api/v1/tenant`;
        const data = yield postRequest(link, JSON.stringify(action.payload));

        if (data.status === 200) {
            yield put({ type: types.ADD_TENANT_SUCCESS, payload: data });
            toast.success(data.data.message);
            yield put({ type: types.GET_TENANTS_REQUEST, payload: { type: action.payload.type } });
        } else {
            toast.error("Aucune donnée n'a été ajouté.");
            yield put({ type: types.ADD_TENANT_FAILED, payload: "Échec lors de la creation du tenant" });
        }

    } catch (error) {
        toast.error("Aucune donnée n'a été ajouté.");
        console.error(error);
        yield put({ type: types.ADD_TENANT_FAILED, payload: error.message || "Une erreur s'est produite" });
    }
}

function* deleteTenant(action) {
    const { id } = action.payload;
    try {
        const link = `${url}/api/v1/tenant/${id}`;

        const data = yield deleteRequest(link);
        if (data) {
            yield put({ type: types.DELETE_TENANT_SUCCESS, payload: data });
            toast.success('Tenant deleted successfully');
            yield put({ type: types.GET_TENANTS_REQUEST});
        } else {
            toast.error("Aucune donnée n'a été supprimé.");
            yield put({ type: types.DELETE_TENANT_FAILED, payload: "Échec lors de la suppression des données" });
        }

    } catch (error) {
        console.error(error);
        toast.error("Aucune donnée n'a été supprimé.");
        yield put({ type: types.DELETE_TENANT_FAILED, payload: error.message || "Une erreur s'est produite" });
    }
}

export default function* TenantSaga() {
    yield takeLatest(types.GET_TENANTS_REQUEST, list);
    yield takeLatest(types.UPDATE_TENANT_REQUEST, update);
    yield takeLatest(types.ADD_TENANT_REQUEST, add);
    yield takeLatest(types.DELETE_TENANT_REQUEST, deleteTenant);
}