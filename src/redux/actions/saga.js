import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import toast from 'react-hot-toast';
import { getRequest } from 'helper/api';
import { url } from 'urlLoader';
import { putRequest } from 'helper/api';
import { postRequest } from 'helper/api';
import { deleteRequest } from 'helper/api';


function* listByControl(action) {
    try {
        let link = `${url}/api/v1/actions/byControl`;
        const response = yield postRequest(link, JSON.stringify(action.payload));
        console.log("API Response::", response);
        if (response.statut === 200) {
            yield put({ type: types.GET_ACTIONS_SUCCESS, payload: { data: response.data } });
        } else {
            yield put({ type: types.GET_ACTIONS_FAILED, payload: "echec recuperation des données" });
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.GET_ACTIONS_FAILED, payload: error });
    }
}

function* listByEntity(action) {
    console.log("actions.action::", action)
    try {
        let link = `${url}/api/v1/actions/byEntitity`;
        const response = yield postRequest(link, JSON.stringify(action.payload));
        console.log("API Response::", response);
        if (response.statut === 200) {
            yield put({ type: types.GET_ENTITY_ACTIONS_SUCCESS, payload: { data: response.data } });
        } else {
            yield put({ type: types.GET_ENTITY_ACTIONS_FAILED, payload: "echec recuperation des données" });
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.GET_ENTITY_ACTIONS_FAILED, payload: error });
    }
}

function* update(action) {
    const { id } = action.payload;
    try {
        let link = `${url}/api/v1/actions/update/${id}`;
        const data = yield putRequest(link, JSON.stringify(action.payload.actionData));
        console.log("data:::/", data)
        if (data.message === "Success") {
            yield put({ type: types.UPDATE_ACTION_SUCCESS, payload: data.data.action});
            toast.success("Action updated successfully");
            yield put({ type: types.GET_ACTIONS_REQUEST});
        } else {
            yield put({ type: types.UPDATE_ACTION_FAILED, payload: "Échec lors de la modification de l'action" });
            toast.error(data.message);
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.UPDATE_ACTION_FAILED, payload: error });
    }
}

function* add(action) {
    try {
        const link = `${url}/api/v1/actions/postAction`;
        const data = yield postRequest(link, JSON.stringify(action.payload));
        console.log('dataADD::', data)

        if (data.statut === 200) { 
            yield put({ type: types.ADD_ACTION_SUCCESS, payload: data });
            toast.success(data.message);
            yield put({ type: types.GET_ACTIONS_REQUEST, payload: { type: action.payload.type } });
        } else {
            toast.error("Aucune donnée n'a été ajouté."); 
            yield put({ type: types.ADD_ACTION_FAILED, payload: "Échec lors de la creation de l'action" });
        } 

    } catch (error) {
        toast.error("Aucune donnée n'a été ajouté.");
        console.error(error);
        yield put({ type: types.ADD_ACTION_FAILED, payload: error.message || "Une erreur s'est produite" });
    }
}

function* deleteAction(action) {
    const { id } = action.payload;
    try {
        const link = `${url}/api/v1/actions/delete/${id}`;

        const data = yield deleteRequest(link);
        if (data) {
            yield put({ type: types.DELETE_ACTION_SUCCESS, payload: data });
            toast.success('Action deleted successfully');
            yield put({ type: types.GET_ACTIONS_REQUEST});
        } else {
            toast.error("Aucune donnée n'a été supprimé.");
            yield put({ type: types.DELETE_ACTION_FAILED, payload: "Échec lors de la suppression des données" });
        }

    } catch (error) {
        console.error(error);
        toast.error("Aucune donnée n'a été supprimé.");
        yield put({ type: types.DELETE_ACTION_FAILED, payload: error.message || "Une erreur s'est produite" });
    }
}

export default function* ActionSaga() {
    yield takeLatest(types.GET_ACTIONS_REQUEST, listByControl);
    yield takeLatest(types.GET_ENTITY_ACTIONS_REQUEST, listByEntity);
    yield takeLatest(types.UPDATE_ACTION_REQUEST, update);
    yield takeLatest(types.ADD_ACTION_REQUEST, add);
    yield takeLatest(types.DELETE_ACTION_REQUEST, deleteAction);
}