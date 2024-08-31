import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import toast from 'react-hot-toast';
import { getRequest } from 'helper/api';
import { url } from 'urlLoader';
import { putRequest } from 'helper/api';
import { postRequest } from 'helper/api';
import { deleteRequest } from 'helper/api';


function* list(action) {
    try {
        let link = `${url}/api/v1/entities/all`;
        const data = yield getRequest(link);
        console.log(data)
        if (data.message === "Success") {
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
        let link = `${url}/api/v1/entities/update/${id}`;
        const data = yield putRequest(link, JSON.stringify(action.payload.entityData));
        console.log("data:::/", data)
        if (data.message === "Success") {
            yield put({ type: types.UPDATE_ENTITY_SUCCESS, payload: data.data.entity});
            toast.success("Entity updated successfully");
            yield put({ type: types.GET_ENTITIES_REQUEST});
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
        const link = `${url}/api/v1/entities/create`;
        const data = yield postRequest(link, JSON.stringify(action.payload));
        console.log('dataADD::', data)

        if (data.message === 'Created') {
            yield put({ type: types.ADD_ENTITY_SUCCESS, payload: data });
            toast.success(data.data.message);
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
        const link = `${url}/api/v1/entities/delete/${id}`;

        const data = yield deleteRequest(link);
        if (data) {
            yield put({ type: types.DELETE_ENTITY_SUCCESS, payload: data });
            toast.success('Entity deleted successfully');
            yield put({ type: types.GET_ENTITIES_REQUEST});
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