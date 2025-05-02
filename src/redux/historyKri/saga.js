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
        let link = `${url}/api/v1/historiqueKRI/getHistoriqueKRIByIdKeyIndicator`;
        const data = yield getRequest(link);
        console.log(data)
        if (data.statut === 200) {
            yield put({ type: types.GET_HISTORIESKRI_SUCCESS, payload: data });
        } else {
            yield put({ type: types.GET_HISTORIESKRI_FAILED, payload: "echec recuperation des données" });
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.GET_HISTORIESKRI_FAILED, payload: error });
    }
}

function* update(action) {
    const { id } = action.payload;
    try {
        let link = `${url}/api/v1/history/updateHistory/${id}`;
        const data = yield putRequest(link, JSON.stringify(action.payload.HistoryKRIData));
        console.log("data:::/", data)
        if (data.message === "Success") {
            yield put({ type: types.UPDATE_HISTORYKRI_SUCCESS, payload: data.data.HistoryKRI});
            toast.success("Entity updated successfully");
            yield put({ type: types.GET_HISTORIESKRI_REQUEST});
        } else {
            yield put({ type: types.UPDATE_HISTORYKRI_FAILED, payload: "Échec lors de la modification des données" });
            toast.error(data.message);
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.UPDATE_HISTORYKRI_FAILED, payload: error });
    }
}

function* add(action) {
    try {
        const link = `${url}/api/v1/historiqueKRI/postHistoriqueKRI`;
        const data = yield postRequest(link, JSON.stringify(action.payload));
        console.log('dataADD::', data)

        if (data.statut === 201) { 
            yield put({ type: types.ADD_HISTORYKRI_SUCCESS, payload: data });
            toast.success(data.message);
            yield put({ type: types.GET_HISTORIESKRI_REQUEST, payload: { type: action.payload.type } });
        } else {
            toast.error("Aucune donnée n'a été ajouté."); 
            yield put({ type: types.ADD_HISTORYKRI_FAILED, payload: "Échec lors de la creation de l'évenement" });
        } 

    } catch (error) {
        toast.error("Aucune donnée n'a été ajouté.");
        console.error(error);
        yield put({ type: types.ADD_HISTORYKRI_FAILED, payload: error.message || "Une erreur s'est produite" });
    }
}

function* deleteHistoryKRI(action) {
    const { id } = action.payload;
    try {
        const link = `${url}/api/v1/history/deleteHistory/${id}`;

        const data = yield deleteRequest(link);
        if (data) {
            yield put({ type: types.DELETE_HISTORYKRI_SUCCESS, payload: data });
            toast.success('control test deleted successfully');
            yield put({ type: types.GET_HISTORIESKRI_REQUEST});
        } else {
            toast.error("Aucune donnée n'a été supprimé.");
            yield put({ type: types.DELETE_HISTORYKRI_FAILED, payload: "Échec lors de la suppression des données" });
        }

    } catch (error) {
        console.error(error);
        toast.error("Aucune donnée n'a été supprimé.");
        yield put({ type: types.DELETE_HISTORYKRI_FAILED, payload: error.message || "Une erreur s'est produite" });
    }
}

export default function* HistoryKRISaga() {
    yield takeLatest(types.GET_HISTORIESKRI_REQUEST, list);
    yield takeLatest(types.UPDATE_HISTORYKRI_REQUEST, update);
    yield takeLatest(types.ADD_HISTORYKRI_REQUEST, add);
    yield takeLatest(types.DELETE_HISTORYKRI_REQUEST, deleteHistoryKRI);
}