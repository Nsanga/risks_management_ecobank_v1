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
        let link = `${url}/api/v1/profiles/all`;
        const data = yield getRequest(link, tenantId);;
        if (data.message === "Success") {
            yield put({ type: types.GET_PROFILES_SUCCESS, payload: data });
        } else {
            yield put({ type: types.GET_PROFILES_FAILED, payload: "echec recuperation des données" });
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.GET_PROFILES_FAILED, payload: error });
    }
}

function* update(action) {
    const { id } = action.payload;
    try {
        const tenantId = getTenantFromSubdomain();
        let link = `${url}/api/v1/profiles/update/${id}`;
        const data = yield putRequest(link, JSON.stringify(action.payload.profileData), tenantId);
        if (data.message === "Success") {
            yield put({ type: types.UPDATE_PROFILE_SUCCESS, payload: data.data.profile });
            toast.success(data.data.message);
            yield put({ type: types.GET_PROFILES_REQUEST });
        } else {
            yield put({ type: types.UPDATE_PROFILE_FAILED, payload: "Échec lors de la modification des données" });
            toast.error(data.data.message);
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.UPDATE_PROFILE_FAILED, payload: error });
    }
}

function* add(action) {
    try {
        const tenantId = getTenantFromSubdomain();
        const link = `${url}/api/v1/profiles/create`;
        const data = yield postRequest(link, JSON.stringify(action.payload), tenantId);

        if (data.status === 201) {
            yield put({ type: types.ADD_PROFILE_SUCCESS, payload: data });
            toast.success(data.data.message);
            yield put({ type: types.GET_PROFILES_REQUEST, payload: { type: action.payload.type } });

            // Exécuter le callback si défini
            if (action.meta?.onSuccess) {
                action.meta.onSuccess();
            }
        } else {
            toast.error(data.message.message);
            yield put({ type: types.ADD_PROFILE_FAILED, payload: "Échec lors de la création du profil" });

            if (action.meta?.onError) {
                action.meta.onError("Erreur lors de l'ajout");
            }
        }

    } catch (error) {
        toast.error("Aucune donnée n'a été ajoutée.");
        console.error(error);
        yield put({ type: types.ADD_PROFILE_FAILED, payload: error.message || "Une erreur s'est produite" });

        if (action.meta?.onError) {
            action.meta.onError(error.message);
        }
    }
}

function* deleteProfile(action) {
    const { id } = action.payload;
    try {
        const tenantId = getTenantFromSubdomain();
        const link = `${url}/api/v1/profiles/delete/${id}`;

        const data = yield deleteRequest(link, tenantId);
        if (data) {
            yield put({ type: types.DELETE_PROFILE_SUCCESS, payload: data });
            toast.success('Profile deleted successfully');
            yield put({ type: types.GET_PROFILES_REQUEST });
        } else {
            toast.error("Aucune donnée n'a été supprimé.");
            yield put({ type: types.DELETE_PROFILE_FAILED, payload: "Échec lors de la suppression des données" });
        }

    } catch (error) {
        console.error(error);
        toast.error("Aucune donnée n'a été supprimé.");
        yield put({ type: types.DELETE_PROFILE_FAILED, payload: error.message || "Une erreur s'est produite" });
    }
}

export default function* ProfileSaga() {
    yield takeLatest(types.GET_PROFILES_REQUEST, list);
    yield takeLatest(types.UPDATE_PROFILE_REQUEST, update);
    yield takeLatest(types.ADD_PROFILE_REQUEST, add);
    yield takeLatest(types.DELETE_PROFILE_REQUEST, deleteProfile);
}