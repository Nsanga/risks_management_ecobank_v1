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
        let link = `${url}/api/v1/history/getHistory`;
        const data = yield getRequest(link);
        console.log(data)
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
        let link = `${url}/api/v1/history/updateHistory/${id}`;
        const data = yield putRequest(link, JSON.stringify(action.payload.controlHistoryData));
        console.log("data:::/", data)
        if (data.statut === 200) {
            yield put({ type: types.UPDATE_CONTROLHISTORY_SUCCESS, payload: data.data.controlHistory});
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
        const link = `${url}/api/v1/history/postHistory`;
        const data = yield postRequest(link, JSON.stringify(action.payload));
        console.log('dataADD::', data)

        if (data.statut === 200) { 
            yield put({ type: types.ADD_CONTROLHISTORY_SUCCESS, payload: data });
            toast.success(data.message);
            yield put({ type: types.GET_CONTROLHISTORIES_REQUEST, payload: { type: action.payload.type } });
        } else {
            toast.error("Aucune donnée n'a été ajouté."); 
            yield put({ type: types.ADD_CONTROLHISTORY_FAILED, payload: "Échec lors de la creation de l'évenement" });
        } 

    } catch (error) {
        toast.error("Aucune donnée n'a été ajouté.");
        console.error(error);
        yield put({ type: types.ADD_CONTROLHISTORY_FAILED, payload: error.message || "Une erreur s'est produite" });
    }
}

function* deleteControlHistory(action) {
    const { id } = action.payload;
    try {
        const link = `${url}/api/v1/history/deleteHistory/${id}`;

        const data = yield deleteRequest(link);
        if (data) {
            yield put({ type: types.DELETE_CONTROLHISTORY_SUCCESS, payload: data });
            toast.success('control test deleted successfully');
            yield put({ type: types.GET_CONTROLHISTORIES_REQUEST});
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