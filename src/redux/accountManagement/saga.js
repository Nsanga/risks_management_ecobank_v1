import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import toast from 'react-hot-toast';
import { getRequest } from 'helper/api';
import { url } from 'urlLoader';
import { putRequest } from 'helper/api';
import { getTenantFromSubdomain } from 'utils/getTenant';

function* list() {
    try {
        const tenantId = getTenantFromSubdomain();
        let link = `${url}/api/v1/account/list`;
        const data = yield getRequest(link, tenantId);;
        console.log('data:::::', data)
        if (data.message === "Success") {
            yield put({ type: types.GET_ACCOUNTS_SUCCESS, payload: data });
        } else {
            yield put({ type: types.GET_ACCOUNTS_FAILED, payload: "echec recuperation des données" });
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.GET_ACCOUNTS_FAILED, payload: error });
    }
}

function* update(action) {
    const { id } = action.payload;
    try {
        const tenantId = getTenantFromSubdomain();
        let link = `${url}/api/v1/account/update?id=${id}`;
        const data = yield putRequest(link, JSON.stringify(action.payload.accountData));
        console.log("dataUser:::/", data)
        if (data.message === "Success") {
            yield put({ type: types.UPDATE_ACCOUNT_SUCCESS, payload: data.data });
            toast.success(data.message);
            yield put({ type: types.GET_ACCOUNTS_REQUEST });
        } else {
            yield put({ type: types.UPDATE_ACCOUNT_FAILED, payload: "Échec lors de la modification des données" });
            toast.error(data.message);
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.UPDATE_ACCOUNT_FAILED, payload: error });
    }
}



export default function* AccountSaga() {
    yield takeLatest(types.GET_ACCOUNTS_REQUEST, list);
    yield takeLatest(types.UPDATE_ACCOUNT_REQUEST, update);
}