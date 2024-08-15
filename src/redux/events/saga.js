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
        let link = `${url}/api/v1/events/all`;
        const data = yield getRequest(link);
        console.log(data)
        if (data.message === "Success") {
            yield put({ type: types.GET_EVENTS_SUCCESS, payload: data });
        } else {
            yield put({ type: types.GET_EVENTS_FAILED, payload: "echec recuperation des données" });
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.GET_EVENTS_FAILED, payload: error });
    }
}

function* update(action) {
    const { id } = action.payload;
    try {
        let link = `${url}/api/v1/events/update?id=${id}`;
        const data = yield putRequest(link, action.payload.eventData);
        console.log("data:::/", data)
        if (data.message === "Success") {
            yield put({ type: types.UPDATE_EVENT_SUCCESS, payload: data.data.event });
            toast.success(data.data.message);
            yield call(list, { payload: { type: 'Automatically' } });
        } else {
            yield put({ type: types.UPDATE_EVENT_FAILED, payload: "Échec lors de la modification des données" });
            toast.error(data.data.message);
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.UPDATE_EVENT_FAILED, payload: error });
    }
}

function* add(action) {
    try {
        const link = `${url}/api/v1/events/create`;
        const data = yield postRequest(link, JSON.stringify(action.payload));
        console.log('dataADD::', data)

        if (data.message === 'Created') {
            yield put({ type: types.ADD_EVENT_SUCCESS, payload: data });
            toast.success(data.data.message);
            yield put({ type: types.GET_EVENTS_REQUEST, payload: { type: action.payload.type } });
        } else {
            toast.error("Aucune donnée n'a été ajouté.");
            yield put({ type: types.ADD_EVENT_FAILED, payload: "Échec lors de la creation de l'évenement" });
        }

    } catch (error) {
        toast.error("Aucune donnée n'a été ajouté.");
        console.error(error);
        yield put({ type: types.ADD_EVENT_FAILED, payload: error.message || "Une erreur s'est produite" });
    }
}

function* deleteEvent(action) {
    const { id, type } = action.payload;
    try {
        const link = `${url}/api/v1/events/delete?id=${id}`;

        const data = yield deleteRequest(link);
        if (data) {
            yield put({ type: types.DELETE_EVENT_SUCCESS, payload: data });
            toast.success(data.data.message);
            yield put({ type: types.GET_EVENT_REQUEST, payload: { type: type } });
        } else {
            toast.error("Aucune donnée n'a été supprimé.");
            yield put({ type: types.DELETE_EVENT_FAILED, payload: "Échec lors de la suppression des données" });
        }

    } catch (error) {
        console.error(error);
        toast.error("Aucune donnée n'a été supprimé.");
        yield put({ type: types.DELETE_EVENT_FAILED, payload: error.message || "Une erreur s'est produite" });
    }
}

export default function* EventSaga() {
    yield takeLatest(types.GET_EVENTS_REQUEST, list);
    // yield takeLatest(types.GET_SERVICES_REQUEST, listServices);
    yield takeLatest(types.UPDATE_EVENT_REQUEST, update);
    yield takeLatest(types.ADD_EVENT_REQUEST, add);
    yield takeLatest(types.DELETE_EVENT_REQUEST, deleteEvent);
}