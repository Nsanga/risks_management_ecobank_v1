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
        const link = `${url}/api/v1/risks-controls/get-entity`;
        const data = yield postRequest(link, JSON.stringify(action.payload));
        console.log('dataADD::', data);

        if (data.success === true) {
            yield put({ type: types.GET_ENTITYRISKCONTROLS_SUCCESS, payload: { data: data.data } });
        } else {
            yield put({ type: types.GET_ENTITYRISKCONTROLS_FAILED, payload: "Échec lors de la récupération des contrôles de risques de l'entité" });
        }
    } catch (error) {
        console.error(error);
        yield put({ type: types.GET_ENTITYRISKCONTROLS_FAILED, payload: error.message || "Une erreur s'est produite" });
    }
}

function* update(action) {
    try {
        let link = `${url}/api/v1/risks-controls/update`;
        const data = yield putRequest(link, JSON.stringify(action.payload.entityRiskControlData));
        // console.log('action: =>', action)
        console.log("data:::/", data)
        if (data.message === "Success") {
            yield put({ type: types.UPDATE_ENTITYRISKCONTROL_SUCCESS, payload: { data: data.data } });
            // yield put({ type: types.GET_ENTITYRISKCONTROLS_SUCCESS, payload: { data: data.data } });
            toast.success("Entity updated successfully");
        } else {
            yield put({ type: types.UPDATE_ENTITYRISKCONTROL_FAILED, payload: "Échec lors de la modification des données" });
            toast.error(data.message);
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.UPDATE_ENTITYRISKCONTROL_FAILED, payload: error });
    }
}

function* deleteEntityRiskControl(action) {
    const { id } = action.payload;
    try {
        const link = `${url}/api/v1/risk-control/delete/${id}`;

        const data = yield deleteRequest(link);
        if (data) {
            yield put({ type: types.DELETE_ENTITYRISKCONTROL_SUCCESS, payload: data });
            toast.success(data.message);
            yield put({ type: types.GET_ENTITYRISKCONTROLS_REQUEST });
        } else {
            toast.error(data.message);
            yield put({ type: types.DELETE_ENTITYRISKCONTROL_FAILED, payload: "Échec lors de la suppression des données" });
        }

    } catch (error) {
        console.error(error);
        toast.error("Aucune donnée n'a été supprimé.");
        yield put({ type: types.DELETE_ENTITYRISKCONTROL_FAILED, payload: error.message || "Une erreur s'est produite" });
    }
}

function* copy(action) {
    try {
        const link = `${url}/api/v1/risks-controls/copy`;
        const data = yield call(postRequest, link, JSON.stringify(action.payload));
        console.log('dataCOPY::', data);

        if (data.success === true) {
            // Rafraîchir la liste après une copie réussie
            toast.success(data.message);
        } else {
            toast.error(data.message);
            yield put({ type: types.COPY_ENTITYRISKCONTROL_FAILED, payload: "Échec de la copie de l'entité" });
        }
    } catch (error) {
        console.error(error);
        yield put({ type: types.COPY_ENTITYRISKCONTROL_FAILED, payload: error.message || "Une erreur s'est produite lors de la copie" });
    }
}

function* move(action) {
    try {
        const link = `${url}/api/v1/risks-controls/move`;
        const data = yield call(postRequest, link, JSON.stringify(action.payload));
        console.log('dataMOVE::', data);

        if (data.success === true) {
            toast.success(data.message);
        } else {
            toast.error(data.message);
            yield put({ type: types.MOVE_ENTITYRISKCONTROL_FAILED, payload: "Échec du déplacement de l'entité" });
        }
    } catch (error) {
        console.error(error);
        yield put({ type: types.MOVE_ENTITYRISKCONTROL_FAILED, payload: error.message || "Une erreur s'est produite lors du déplacement" });
    }
}


export default function* EntityRiskControlSaga() {
    yield takeLatest(types.GET_ENTITYRISKCONTROLS_REQUEST, list);
    yield takeLatest(types.UPDATE_ENTITYRISKCONTROL_REQUEST, update);
    yield takeLatest(types.DELETE_ENTITYRISKCONTROL_REQUEST, deleteEntityRiskControl);
    yield takeLatest(types.COPY_ENTITYRISKCONTROL_REQUEST, copy);
    yield takeLatest(types.MOVE_ENTITYRISKCONTROL_REQUEST, move);
}