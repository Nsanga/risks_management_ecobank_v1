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
        let link = `${url}/api/v1/risk-control/all`;
        console.log(link)
        const data = yield getRequest(link);
        console.log(data)
        if (data.message === "Success") {
            yield put({ type: types.GET_ENTITYRISKCONTROLS_SUCCESS, payload: data });
        } else {
            yield put({ type: types.GET_ENTITYRISKCONTROLS_FAILED, payload: "echec recuperation des données" });
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.GET_ENTITYRISKCONTROLS_FAILED, payload: error });
    }
}

function* update(action) {
    const { id } = action.payload;
    try {
        let link = `${url}/api/v1/risk-control/update/${id}`;
        const data = yield putRequest(link, JSON.stringify(action.payload.entityRiskControlData));
        console.log("data:::/", data)
        if (data.message === "Success") {
            yield put({ type: types.UPDATE_ENTITYRISKCONTROL_SUCCESS, payload: data.data.entityRiskControl });
            toast.success(data.data.message);
            yield put({ type: types.GET_ENTITYRISKCONTROLS_REQUEST});
        } else {
            yield put({ type: types.UPDATE_ENTITYRISKCONTROL_FAILED, payload: "Échec lors de la modification des données" });
            toast.error(data.data.message);
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.UPDATE_ENTITYRISKCONTROL_FAILED, payload: error });
    }
}

function* add(action) {
    try {
        const link = `${url}/api/v1/risk-control/create`;
        const data = yield postRequest(link, JSON.stringify(action.payload));
        console.log('dataADD::', data)

        if (data.message === 'Created') {
            const newItemId = data.data.newEntityRiskControl._id;
            yield put({ type: types.ADD_ENTITYRISKCONTROL_SUCCESS, payload: data, id: newItemId });
            toast.success(data.data.message);
            return newItemId;
            // yield put({ type: types.GET_ENTITYRISKCONTROLS_REQUEST });
        } else {
            toast.error("Aucune donnée n'a été ajouté.");
            yield put({ type: types.ADD_ENTITYRISKCONTROL_FAILED, payload: "Échec lors de la creation du control" });
        }

    } catch (error) {
        toast.error("Aucune donnée n'a été ajouté.");
        console.error(error);
        yield put({ type: types.ADD_ENTITYRISKCONTROL_FAILED, payload: error.message || "Une erreur s'est produite" });
    }
}

function* deleteEntityRiskControl(action) {
    const { id } = action.payload;
    try {
        const link = `${url}/api/v1/risk-control/delete/${id}`;

        const data = yield deleteRequest(link);
        if (data) {
            yield put({ type: types.DELETE_ENTITYRISKCONTROL_SUCCESS, payload: data });
            toast.success('Control deleted successfully');
            yield put({ type: types.GET_ENTITYRISKCONTROLS_REQUEST});
        } else {
            toast.error("Aucune donnée n'a été supprimé.");
            yield put({ type: types.DELETE_ENTITYRISKCONTROL_FAILED, payload: "Échec lors de la suppression des données" });
        }

    } catch (error) {
        console.error(error);
        toast.error("Aucune donnée n'a été supprimé.");
        yield put({ type: types.DELETE_ENTITYRISKCONTROL_FAILED, payload: error.message || "Une erreur s'est produite" });
    }
}

export default function* EntityRiskControlSaga() {
    yield takeLatest(types.GET_ENTITYRISKCONTROLS_REQUEST, list);
    yield takeLatest(types.UPDATE_ENTITYRISKCONTROL_REQUEST, update);
    yield takeLatest(types.ADD_ENTITYRISKCONTROL_REQUEST, add);
    yield takeLatest(types.DELETE_ENTITYRISKCONTROL_REQUEST, deleteEntityRiskControl);
}