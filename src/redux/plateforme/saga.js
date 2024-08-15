import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import toast from 'react-hot-toast';
import { getRequest } from 'helper/api';
import { url } from 'urlLoader';
import { putRequest } from 'helper/api';


function* list(action) {
    try {
        let link = `${url}/api/v1/plateforme/list`;
        const data = yield getRequest(link);
        if (data.message === "Success") {
            yield put({ type: types.GET_MESSAGE_SUCCESS, payload: data });
        } else {
            yield put({ type: types.GET_MESSAGE_FAILED, payload: "echec recuperation des données" });
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.GET_MESSAGE_FAILED, payload: error });
    }
}

function* update(action) {
    const { id } = action.payload;
    try {
        let link = `${url}/api/v1/plateforme/update?id=${id}`;
        const data = yield putRequest(link, action.payload.plateformeData);
        console.log("data:::/", data)
        if (data.message === "Success") {
            yield put({ type: types.UPDATE_MESSAGE_SUCCESS, payload: data.data.plateforme });
            toast.success(data.data.message);
            yield put({ type: types.GET_MESSAGE_REQUEST });
        } else {
            yield put({ type: types.UPDATE_MESSAGE_FAILED, payload: "Échec lors de la modification des données" });
            toast.error(data.data.message);
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.UPDATE_MESSAGE_FAILED, payload: error });
    }
}

export default function* PlateformeSaga() {
    yield takeLatest(types.GET_MESSAGE_REQUEST, list);
    yield takeLatest(types.UPDATE_MESSAGE_REQUEST, update);
}