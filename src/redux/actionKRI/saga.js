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
        let link = `${url}/api/v1/actionKRI/getActionByIdKeyIndicator`;
        const data = yield postRequest(link, JSON.stringify(action.payload));
        console.log(data)
        if (data.statut === 200) {
            yield put({ type: types.GET_ACTIONSKRI_SUCCESS, payload: data });
        } else {
            yield put({ type: types.GET_ACTIONSKRI_FAILED, payload: "echec recuperation des données" });
        }
    } catch (error) {
        console.log(error); 
        yield put({ type: types.GET_ACTIONSKRI_FAILED, payload: error });
    }
}

function* update(action) {
    const { id } = action.payload;
    try {
        let link = `${url}/api/v1/history/updateHistory/${id}`;
        const data = yield putRequest(link, JSON.stringify(action.payload.HistoryKRIData));
        console.log("data:::/", data)
        if (data.message === "Success") {
            yield put({ type: types.UPDATE_ACTIONKRI_SUCCESS, payload: data.data.HistoryKRI});
            toast.success("Entity updated successfully");
            yield put({ type: types.GET_ACTIONSKRI_REQUEST});
        } else {
            yield put({ type: types.UPDATE_ACTIONKRI_FAILED, payload: "Échec lors de la modification des données" });
            toast.error(data.message);
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.UPDATE_ACTIONKRI_FAILED, payload: error });
    }
}

function* add(action) {
    try {
        const link = `${url}/api/v1/actionKRI/postActionKRI`;
        const data = yield postRequest(link, JSON.stringify(action.payload));
        console.log('dataADD::', data)

        if (data.statut === 200) { 
            yield put({ type: types.ADD_ACTIONKRI_SUCCESS, payload: data });
            toast.success(data.message);
        } else {
            toast.error("Aucune donnée n'a été ajouté."); 
            yield put({ type: types.ADD_ACTIONKRI_FAILED, payload: "Échec lors de la creation de l'évenement" });
        } 

    } catch (error) {
        toast.error("Aucune donnée n'a été ajouté.");
        console.error(error);
        yield put({ type: types.ADD_ACTIONKRI_FAILED, payload: error.message || "Une erreur s'est produite" });
    }
}

function* deleteActionKRI(action) {
    const { id } = action.payload;
    try {
        const link = `${url}/api/v1/history/deleteHistory/${id}`;

        const data = yield deleteRequest(link);
        if (data) {
            yield put({ type: types.DELETE_ACTIONKRI_SUCCESS, payload: data });
            toast.success('control test deleted successfully');
            yield put({ type: types.GET_ACTIONSKRI_REQUEST});
        } else {
            toast.error("Aucune donnée n'a été supprimé.");
            yield put({ type: types.DELETE_ACTIONKRI_FAILED, payload: "Échec lors de la suppression des données" });
        }

    } catch (error) {
        console.error(error);
        toast.error("Aucune donnée n'a été supprimé.");
        yield put({ type: types.DELETE_ACTIONKRI_FAILED, payload: error.message || "Une erreur s'est produite" });
    }
}

export default function* ActionKRISaga() {
    yield takeLatest(types.GET_ACTIONSKRI_REQUEST, list);
    yield takeLatest(types.UPDATE_ACTIONKRI_REQUEST, update);
    yield takeLatest(types.ADD_ACTIONKRI_REQUEST, add);
    yield takeLatest(types.DELETE_ACTIONKRI_REQUEST, deleteActionKRI);
}