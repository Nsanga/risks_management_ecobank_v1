import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import toast from 'react-hot-toast';
import { getRequest } from 'helper/api';
import { url } from 'urlLoader';
import { putRequest } from 'helper/api';
import { postRequest } from 'helper/api';
import { deleteRequest } from 'helper/api';


function* list(action) {
    const { type } = action.payload;
    try {
        let link = `${url}/api/v1/campaign/list?type=${type}`;
        const data = yield getRequest(link);
        console.log(data)
        if (data.message === "Success") {
            yield put({ type: types.GET_CAMPAIGNS_SUCCESS, payload: data });
        } else {
            yield put({ type: types.GET_CAMPAIGNS_FAILED, payload: "echec recuperation des données" });
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.GET_CAMPAIGNS_FAILED, payload: error });
    }
}

function* update(action) {
    const { id } = action.payload;
    try {
        let link = `${url}/api/v1/campaign/update?id=${id}`;
        const data = yield putRequest(link, action.payload.campaignData);
        console.log("data:::/", data)
        if (data.message === "Success") {
            yield put({ type: types.UPDATE_CAMPAIGN_SUCCESS, payload: data.data.campaign });
            toast.success(data.data.message);
            yield call(list, { payload: { type: 'Automatically' } });
        } else {
            yield put({ type: types.UPDATE_CAMPAIGN_FAILED, payload: "Échec lors de la modification des données" });
            toast.error(data.data.message);
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.UPDATE_CAMPAIGN_FAILED, payload: error });
    }
}

function* add(action) {
    try {
        const link = `${url}/api/v1/campaign/add`;
        const data = yield postRequest(link, JSON.stringify(action.payload));
        console.log('dataADD::', data)

        if (data.message === 'Created') {
            yield put({ type: types.ADD_CAMPAIGN_SUCCESS, payload: data });
            toast.success(data.data.message);
            yield put({ type: types.GET_CAMPAIGNS_REQUEST, payload: { type: action.payload.type } });
        } else {
            toast.error("Aucune donnée n'a été ajouté.");
            yield put({ type: types.ADD_CAMPAIGN_FAILED, payload: "Échec lors de la récupération des données" });
        }

    } catch (error) {
        toast.error("Aucune donnée n'a été ajouté.");
        console.error(error);
        yield put({ type: types.ADD_CAMPAIGN_FAILED, payload: error.message || "Une erreur s'est produite" });
    }
}

function* deleteCampaign(action) {
    const { id, type } = action.payload;
    try {
        const link = `${url}/api/v1/campaign/delete?id=${id}`;

        const data = yield deleteRequest(link);
        if (data) {
            yield put({ type: types.DELETE_CAMPAIGN_SUCCESS, payload: data });
            toast.success(data.data.message);
            yield put({ type: types.GET_CAMPAIGNS_REQUEST, payload: { type: type } });
        } else {
            toast.error("Aucune donnée n'a été supprimé.");
            yield put({ type: types.DELETE_CAMPAIGN_FAILED, payload: "Échec lors de la suppression des données" });
        }

    } catch (error) {
        console.error(error);
        toast.error("Aucune donnée n'a été supprimé.");
        yield put({ type: types.DELETE_CAMPAIGN_FAILED, payload: error.message || "Une erreur s'est produite" });
    }
}

function* listGroups() {
    try {
        let link = `${url}/api/v1/group/list`;
        const data = yield getRequest(link);
        if (data.message === "Success") {
            yield put({ type: types.GET_GROUPS_SUCCESS, payload: data });
        } else {
            yield put({ type: types.GET_GROUPS_FAILED, payload: "echec recuperation des données" });
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.GET_GROUPS_FAILED, payload: error });
    }
}

function* addGroup(action) {
    try {
        const link = `${url}/api/v1/group/add`;
        const data = yield postRequest(link, JSON.stringify(action.payload));
        console.log('dataADD::', data)

        if (data) {
            yield put({ type: types.ADD_GROUP_SUCCESS, payload: data });
            toast.success(data.data.message);
            yield put({ type: types.GET_GROUPS_REQUEST });
        } else {
            toast.error("Aucune donnée n'a été ajouté.");
            yield put({ type: types.ADD_GROUP_FAILED, payload: "Échec lors de la récupération des données" });
        }

    } catch (error) {
        toast.error("Aucune donnée n'a été ajouté.");
        console.error(error);
        yield put({ type: types.ADD_GROUP_FAILED, payload: error.message || "Une erreur s'est produite" });
    }
}

function* updateGroup(action) {
    const { id } = action.payload;
    try {
        let link = `${url}/api/v1/group/update?id=${id}`;
        const data = yield putRequest(link, action.payload.groupData);
        console.log("data:::/", data)
        if (data.message === "Success") {
            yield put({ type: types.UPDATE_GROUP_SUCCESS, payload: data.data.product });
            toast.success(data.data.message);
            yield put({ type: types.GET_GROUPS_REQUEST });
        } else {
            yield put({ type: types.UPDATE_GROUP_FAILED, payload: "Échec lors de la modification des données" });
            toast.error(data.data.message);
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.UPDATE_GROUP_FAILED, payload: error });
    }
}

function* deleteGroup(action) {
    const { id } = action.payload;
    console.log('id', id)
    try {
        const link = `${url}/api/v1/group/delete?id=${id}`;

        const data = yield deleteRequest(link);
        if (data) {
            yield put({ type: types.DELETE_GROUP_SUCCESS, payload: data });
            toast.success(data.data.message);
            yield put({ type: types.GET_GROUPS_REQUEST });
        } else {
            toast.error("Aucune donnée n'a été supprimé.");
            yield put({ type: types.DELETE_GROUP_FAILED, payload: "Échec lors de la suppression des données" });
        }

    } catch (error) {
        console.error(error);
        toast.error("Aucune donnée n'a été supprimé.");
        yield put({ type: types.DELETE_GROUP_FAILED, payload: error.message || "Une erreur s'est produite" });
    }
}

export default function* CampaignSaga() {
    yield takeLatest(types.GET_CAMPAIGNS_REQUEST, list);
    // yield takeLatest(types.GET_SERVICES_REQUEST, listServices);
    yield takeLatest(types.UPDATE_CAMPAIGN_REQUEST, update);
    yield takeLatest(types.ADD_CAMPAIGN_REQUEST, add);
    yield takeLatest(types.DELETE_CAMPAIGN_REQUEST, deleteCampaign);
    yield takeLatest(types.GET_GROUPS_REQUEST, listGroups);
    yield takeLatest(types.UPDATE_GROUP_REQUEST, updateGroup);
    yield takeLatest(types.DELETE_GROUP_REQUEST, deleteGroup);
    yield takeLatest(types.ADD_GROUP_REQUEST, addGroup);
}