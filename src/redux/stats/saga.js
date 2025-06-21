import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import { getRequest } from 'helper/api';
import { url } from 'urlLoader';

function* allStats() {
    try {
        let link = `${url}/api/v1/stats/get-stats`;
        const response = yield getRequest(link);
        if (response.status === 200) {
            yield put({ type: types.GET_STATS_SUCCESS, payload: { data: response.data } });
        } else {
            yield put({ type: types.GET_STATS_FAILED, payload: "echec recuperation des données" });
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.GET_STATS_FAILED, payload: error });
    }
}

export default function* StatSaga() {
    yield takeLatest(types.GET_STATS_REQUEST, allStats);
}