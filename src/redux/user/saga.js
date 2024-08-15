import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import toast from 'react-hot-toast';
import { getRequest } from 'helper/api';
import { url } from 'urlLoader';
import { putRequest } from 'helper/api';
import { postRequest } from 'helper/api';
import { deleteRequest } from 'helper/api';

function* listUser() {
    try {
        let link = `${url}/api/v1/user/list`;
        const data = yield getRequest(link);
        console.log('data:::::', data)
        if (data.message === "Success") {
            yield put({ type: types.GET_USERS_SUCCESS, payload: data });
        } else {
            yield put({ type: types.GET_USERS_FAILED, payload: "echec recuperation des données" });
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.GET_USERS_FAILED, payload: error });
    }
}

function* update(action) {
    const { phoneNumber } = action.payload;
    console.log('payload::', action)
    try {
        let link = `${url}/api/v1/user/update?phoneNumber=${phoneNumber}`;
        const data = yield putRequest(link, JSON.stringify(action.payload.userData));
        console.log("dataUser:::/", data)
        if (data.message === "Success") {
            yield put({ type: types.UPDATE_USER_SUCCESS, payload: data.data });
            toast.success(data.message);
            yield put({ type: types.GET_USERS_REQUEST });
        } else {
            yield put({ type: types.UPDATE_USER_FAILED, payload: "Échec lors de la modification des données" });
            toast.error(data.message);
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.UPDATE_USER_FAILED, payload: error });
    }
}

function* add(action) {
    try {
        const link = `${url}/api/v1/user/add`;
        const data = yield postRequest(link, JSON.stringify(action.payload));
        console.log('dataADD::', data)

        if (data) {
            yield put({ type: types.ADD_USER_SUCCESS, payload: data });
            toast.success(data.data.message);
            yield put({ type: types.GET_USERS_REQUEST });
        } else {
            toast.error("Aucune donnée n'a été ajouté.");
            yield put({ type: types.ADD_USER_FAILED, payload: "Échec lors de la récupération des données" });
        }

    } catch (error) {
        toast.error("Aucune donnée n'a été ajouté.");
        console.error(error);
        yield put({ type: types.ADD_USER_FAILED, payload: error.message || "Une erreur s'est produite" });
    }
}

function* deleteUser (action) {
    const { id } = action.payload;
console.log('id', id)
    try {
        const link = `${url}/api/v1/user/delete?id=${id}`;

        const data = yield deleteRequest(link);
        if (data) {
            yield put({ type: types.DELETE_USER_SUCCESS, payload: data });
            toast.success(data.data.message);
            yield put({ type: types.GET_USERS_REQUEST });
        } else {
            toast.error("Aucune donnée n'a été supprimé.");
            yield put({ type: types.DELETE_USER_FAILED, payload: "Échec lors de la suppression des données" });
        }

    } catch (error) {
        console.error(error);
        toast.error("Aucune donnée n'a été supprimé.");
        yield put({ type: types.DELETE_USER_FAILED, payload: error.message || "Une erreur s'est produite" });
    }
}

export default function* UserSaga() {
    yield takeLatest(types.GET_USERS_REQUEST, listUser);
    yield takeLatest(types.UPDATE_USER_REQUEST, update);
    yield takeLatest(types.ADD_USER_REQUEST, add);
    yield takeLatest(types.DELETE_USER_REQUEST, deleteUser);
}