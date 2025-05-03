import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import toast from 'react-hot-toast';
import { getRequest } from 'helper/api';
import { url } from 'urlLoader';
import { putRequest } from 'helper/api';
import { postRequest } from 'helper/api';
import { deleteRequest } from 'helper/api';

function* list() {
    try {
        let link = `${url}/api/v1/risks-controls/getKeyIndicator`;
        const response = yield getRequest(link);
        console.log("response triggered", response);
        
        if (response.success === true) {
            // Récupérer tous les dataKeyIndicators de toutes les entités
            const allKeyIndicators = response.data.reduce((acc, entity) => {
                return [...acc, ...entity.dataKeyIndicators];
            }, []);
            
            yield put({ 
                type: types.GET_ALL_KRI_SUCCESS, 
                payload: allKeyIndicators 
            });
        } else {
            yield put({ 
                type: types.GET_ALL_KRI_FAILED, 
                payload: "echec recuperation des données" 
            });
        }
    } catch (error) {
        console.log(error);
        yield put({ 
            type: types.GET_ALL_KRI_FAILED, 
            payload: error 
        });
    }
}

function* listByEntity(action) {
    console.log("actions.action::", action)
    try {
        let link = `${url}/api/v1/risks-controls/get-KeyIndicator`;
        const response = yield postRequest(link, JSON.stringify(action.payload));
        console.log("API Response::", response.data.dataKeyIndicators);
        if (response.success === true) {
            yield put({ type: types.GET_ENTITY_KRI_SUCCESS, payload: response.data.dataKeyIndicators });
        } else {
            yield put({ type: types.GET_ENTITY_KRI_FAILED, payload: "echec recuperation des données" });
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.GET_ENTITY_KRI_FAILED, payload: error });
    }
}

function* update(action) {
    try {
        let link = `${url}/api/v1/risks-controls/updateKri`;
        const data = yield putRequest(link, JSON.stringify(action.payload.keyIndicatorData));
        console.log("data:::/", data)
        if (data.message === "Mise à jour réussie") {
            yield put({ type: types.UPDATE_KRI_SUCCESS, payload: data.data});
            toast.success("Risk indicator updated successfully");
        } else {
            yield put({ type: types.UPDATE_KRI_FAILED, payload: "Échec lors de la modification de l'action" });
            toast.error(data.message);
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.UPDATE_KRI_FAILED, payload: error });
    }
}

function* add(action) {
    try {
        const link = `${url}/api/v1/actions/postAction`;
        const data = yield postRequest(link, JSON.stringify(action.payload));
        console.log('dataADD::', data)

        if (data.statut === 200) { 
            yield put({ type: types.ADD_KRI_SUCCESS, payload: data });
            toast.success(data.message);
            yield put({ type: types.GET_KRI_REQUEST, payload: { type: action.payload.type } });
        } else {
            toast.error("Aucune donnée n'a été ajouté."); 
            yield put({ type: types.ADD_KRI_FAILED, payload: "Échec lors de la creation de l'action" });
        } 

    } catch (error) {
        toast.error("Aucune donnée n'a été ajouté.");
        console.error(error);
        yield put({ type: types.ADD_KRI_FAILED, payload: error.message || "Une erreur s'est produite" });
    }
}

function* deleteKeyIndicator(action) {
    const { id } = action.payload;
    try {
        const link = `${url}/api/v1/actions/delete/${id}`;

        const data = yield deleteRequest(link);
        if (data) {
            yield put({ type: types.DELETE_KRI_SUCCESS, payload: data });
            toast.success('Action deleted successfully');
            yield put({ type: types.GET_KRI_REQUEST});
        } else {
            toast.error("Aucune donnée n'a été supprimé.");
            yield put({ type: types.DELETE_KRI_FAILED, payload: "Échec lors de la suppression des données" });
        }

    } catch (error) {
        console.error(error);
        toast.error("Aucune donnée n'a été supprimé.");
        yield put({ type: types.DELETE_KRI_FAILED, payload: error.message || "Une erreur s'est produite" });
    }
}

export default function* KeyIndicatorSaga() {
    yield takeLatest(types.GET_ALL_KRI_REQUEST, list);
    yield takeLatest(types.GET_ENTITY_KRI_REQUEST, listByEntity);
    yield takeLatest(types.UPDATE_KRI_REQUEST, update);
    yield takeLatest(types.ADD_KRI_REQUEST, add);
    yield takeLatest(types.DELETE_KRI_REQUEST, deleteKeyIndicator);
}