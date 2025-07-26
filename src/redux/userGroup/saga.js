import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import toast from 'react-hot-toast';
import { getRequest } from 'helper/api';
import { url } from 'urlLoader';
import { putRequest } from 'helper/api';
import { postRequest } from 'helper/api';
import { deleteRequest } from 'helper/api';
import { getTenantFromSubdomain } from 'utils/getTenant';


function* list() {
    try {
        const tenantId = getTenantFromSubdomain();
        let link = `${url}/api/v1/user-groups/all`;
        const data = yield getRequest(link, tenantId);
        console.log(data)
        if (data.message === "Success") {
            yield put({ type: types.GET_USERGROUPS_SUCCESS, payload: data });
        } else {
            yield put({ type: types.GET_USERGROUPS_FAILED, payload: "echec recuperation des données" });
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.GET_USERGROUPS_FAILED, payload: error });
    }
}

function* update(action) {
    const { id } = action.payload;
    try {
        const tenantId = getTenantFromSubdomain();
        let link = `${url}/api/v1/user-groups/update/${id}`;
        const data = yield putRequest(link, JSON.stringify(action.payload.userGroupData), tenantId);
        console.log("action.payload.userGroupData:::/", action.payload.userGroupData)
        if (data.status === 200) {
            yield put({ type: types.UPDATE_USERGROUP_SUCCESS, payload: data.data.userGroup });
            toast.success(data.data.message);
            yield put({ type: types.GET_USERGROUPS_REQUEST });
        } else {
            yield put({ type: types.UPDATE_USERGROUP_FAILED, payload: "Échec lors de la modification des données" });
            toast.error(data.data.message);
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.UPDATE_USERGROUP_FAILED, payload: error });
    }
}

function* add(action) {
    try {
        const tenantId = getTenantFromSubdomain();
        const link = `${url}/api/v1/user-groups/create`;
        const data = yield postRequest(link, JSON.stringify(action.payload), tenantId);
        console.log('dataADD::', data)

        if (data.message === 'Created') {
            yield put({ type: types.ADD_USERGROUP_SUCCESS, payload: data });
            toast.success(data.data.message);
            yield put({ type: types.GET_USERGROUPS_REQUEST, payload: { type: action.payload.type } });
        } else {
            toast.error("Aucune donnée n'a été ajouté.");
            yield put({ type: types.ADD_USERGROUP_FAILED, payload: "Échec lors de la creation de l'évenement" });
        }

    } catch (error) {
        toast.error("Aucune donnée n'a été ajouté.");
        console.error(error);
        yield put({ type: types.ADD_USERGROUP_FAILED, payload: error.message || "Une erreur s'est produite" });
    }
}

function* deleteUserGroup(action) {
    const { id } = action.payload;
    try {
        const tenantId = getTenantFromSubdomain();
        const link = `${url}/api/v1/user-groups/delete/${id}`;

        const data = yield deleteRequest(link, tenantId);
        if (data) {
            yield put({ type: types.DELETE_USERGROUP_SUCCESS, payload: data });
            toast.success('User group deleted successfully');
            yield put({ type: types.GET_USERGROUPS_REQUEST });
        } else {
            toast.error("Aucune donnée n'a été supprimé.");
            yield put({ type: types.DELETE_USERGROUP_FAILED, payload: "Échec lors de la suppression des données" });
        }

    } catch (error) {
        console.error(error);
        toast.error("Aucune donnée n'a été supprimé.");
        yield put({ type: types.DELETE_USERGROUP_FAILED, payload: error.message || "Une erreur s'est produite" });
    }
}

export default function* UserGroupSaga() {
    yield takeLatest(types.GET_USERGROUPS_REQUEST, list);
    yield takeLatest(types.UPDATE_USERGROUP_REQUEST, update);
    yield takeLatest(types.ADD_USERGROUP_REQUEST, add);
    yield takeLatest(types.DELETE_USERGROUP_REQUEST, deleteUserGroup);
}