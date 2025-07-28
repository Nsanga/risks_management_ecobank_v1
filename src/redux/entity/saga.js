import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import toast from 'react-hot-toast';
import { getRequest } from 'helper/api';
import { url } from 'urlLoader';
import { putRequest } from 'helper/api';
import { postRequest } from 'helper/api';
import { deleteRequest } from 'helper/api';
import { getTenantFromSubdomain } from 'utils/getTenant';

function getTenantId() {
    return getTenantFromSubdomain();
}

function* list() {
    try {
        const tenantId = getTenantId();
        let link = `${url}/api/v1/entities/all`;
        const data = yield getRequest(link, tenantId);
        if (data.status === 200) {
            yield put({ type: types.GET_ENTITIES_SUCCESS, payload: data });
        } else {
            yield put({ type: types.GET_ENTITIES_FAILED, payload: "echec recuperation des données" });
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.GET_ENTITIES_FAILED, payload: error });
    }
}

function* update(action) {
    const { id } = action.payload;
    try {
        const tenantId = getTenantId();
        let link = `${url}/api/v1/entities/update/${id}`;
        const data = yield putRequest(link, JSON.stringify(action.payload.entityData), tenantId);
        if (data.status === 200) {
            yield put({ type: types.UPDATE_ENTITY_SUCCESS, payload: data.data.entity });
            toast.success("Entity updated successfully");
            yield put({ type: types.GET_ENTITIES_REQUEST });
        } else {
            yield put({ type: types.UPDATE_ENTITY_FAILED, payload: "Échec lors de la modification des données" });
            toast.error(data.message);
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.UPDATE_ENTITY_FAILED, payload: error });
    }
}

function* add(action) {
    try {
        const tenantId = getTenantId();
        const link = `${url}/api/v1/entities/create`;
        const data = yield postRequest(link, JSON.stringify(action.payload), tenantId);

        if (data.status === 201) {
            yield put({ type: types.ADD_ENTITY_SUCCESS, payload: data });
            toast.success("Entity created successfully");
            yield put({ type: types.GET_ENTITIES_REQUEST, payload: { type: action.payload.type } });
        } else {
            toast.error("Aucune donnée n'a été ajouté.");
            yield put({ type: types.ADD_ENTITY_FAILED, payload: "Échec lors de la creation de l'évenement" });
        }

    } catch (error) {
        toast.error("Aucune donnée n'a été ajouté.");
        console.error(error);
        yield put({ type: types.ADD_ENTITY_FAILED, payload: error.message || "Une erreur s'est produite" });
    }
}

function* deleteEntity(action) {
    const { id } = action.payload;
    try {
        const tenantId = getTenantId();
        const link = `${url}/api/v1/entities/delete/${id}`;

        const data = yield deleteRequest(link, tenantId);
        if (data) {
            yield put({ type: types.DELETE_ENTITY_SUCCESS, payload: data });
            toast.success('Entity deleted successfully');
            yield put({ type: types.GET_ENTITIES_REQUEST });
        } else {
            toast.error("Aucune donnée n'a été supprimé.");
            yield put({ type: types.DELETE_ENTITY_FAILED, payload: "Échec lors de la suppression des données" });
        }

    } catch (error) {
        console.error(error);
        toast.error("Aucune donnée n'a été supprimé.");
        yield put({ type: types.DELETE_ENTITY_FAILED, payload: error.message || "Une erreur s'est produite" });
    }
}

export default function* EntitySaga() {
    yield takeLatest(types.GET_ENTITIES_REQUEST, list);
    yield takeLatest(types.UPDATE_ENTITY_REQUEST, update);
    yield takeLatest(types.ADD_ENTITY_REQUEST, add);
    yield takeLatest(types.DELETE_ENTITY_REQUEST, deleteEntity);
}