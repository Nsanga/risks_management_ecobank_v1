import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import toast from 'react-hot-toast';
import { getRequest } from 'helper/api';
import { url } from 'urlLoader';
import { putRequest } from 'helper/api';
import { postRequest } from 'helper/api';
import { deleteRequest } from 'helper/api';


function* listOffers() {
    try {
        let link = `${url}/api/v1/offer/list`;
        const data = yield getRequest(link);
        if (data.message === "Success") {
            yield put({ type: types.GET_OFFERS_SUCCESS, payload: data });
        } else {
            yield put({ type: types.GET_OFFERS_FAILED, payload: "echec recuperation des données" });
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.GET_OFFERS_FAILED, payload: error });
    }
}

function* addOffer(action) {
    try {
        const link = `${url}/api/v1/offer/add`;
        const data = yield postRequest(link, JSON.stringify(action.payload));
        console.log('dataADD::', data)

        if (data) {
            yield put({ type: types.ADD_OFFER_SUCCESS, payload: data });
            toast.success(data.data.message);
            yield put({ type: types.GET_OFFERS_REQUEST });
        } else {
            toast.error("Aucune donnée n'a été ajouté.");
            yield put({ type: types.ADD_OFFER_FAILED, payload: "Échec lors de la récupération des données" });
        }

    } catch (error) {
        toast.error("Aucune donnée n'a été ajouté.");
        console.error(error);
        yield put({ type: types.ADD_OFFER_FAILED, payload: error.message || "Une erreur s'est produite" });
    }
}

function* updateOffer(action) {
    const { id } = action.payload;
    try {
        let link = `${url}/api/v1/offer/update?id=${id}`;
        const data = yield putRequest(link, action.payload.offerData);
        console.log("data:::/", data)
        if (data.message === "Success") {
            yield put({ type: types.UPDATE_OFFER_SUCCESS, payload: data.data.product });
            toast.success(data.data.message);
            yield put({ type: types.GET_OFFERS_REQUEST });
        } else {
            yield put({ type: types.UPDATE_OFFER_FAILED, payload: "Échec lors de la modification des données" });
            toast.error(data.data.message);
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.UPDATE_OFFER_FAILED, payload: error });
    }
}

function* deleteOffer (action) {
    const { id } = action.payload;
console.log('id', id)
    try {
        const link = `${url}/api/v1/offer/delete?id=${id}`;

        const data = yield deleteRequest(link);
        if (data) {
            yield put({ type: types.DELETE_OFFER_SUCCESS, payload: data });
            toast.success(data.data.message);
            yield put({ type: types.GET_OFFERS_REQUEST });
        } else {
            toast.error("Aucune donnée n'a été supprimé.");
            yield put({ type: types.DELETE_OFFER_FAILED, payload: "Échec lors de la suppression des données" });
        }

    } catch (error) {
        console.error(error);
        toast.error("Aucune donnée n'a été supprimé.");
        yield put({ type: types.DELETE_OFFER_FAILED, payload: error.message || "Une erreur s'est produite" });
    }
}

function* listServices() {
    try {
        let link = `${url}/api/v1/product/list`;
        const data = yield getRequest(link);
        if (data.message === "Success") {
            yield put({ type: types.GET_SERVICES_SUCCESS, payload: data });
        } else {
            yield put({ type: types.GET_SERVICES_FAILED, payload: "echec recuperation des données" });
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.GET_SERVICES_FAILED, payload: error });
    }
}

function* update(action) {
    const { id } = action.payload;
    try {
        let link = `${url}/api/v1/product/update?id=${id}`;
        const data = yield putRequest(link, action.payload.serviceData);
        console.log("data:::/", data)
        if (data.message === "Success") {
            yield put({ type: types.UPDATE_SERVICE_SUCCESS, payload: data.data.product });
            toast.success(data.data.message);
            yield put({ type: types.GET_SERVICES_REQUEST });
        } else {
            yield put({ type: types.UPDATE_SERVICE_FAILED, payload: "Échec lors de la modification des données" });
            toast.error(data.data.message);
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.UPDATE_SERVICE_FAILED, payload: error });
    }
}

function* add(action) {
    try {
        const link = `${url}/api/v1/product/add`;
        const data = yield postRequest(link, JSON.stringify(action.payload));
        console.log('dataADD::', data)

        if (data) {
            yield put({ type: types.ADD_SERVICE_SUCCESS, payload: data });
            toast.success(data.data.message);
            yield put({ type: types.GET_SERVICES_REQUEST });
        } else {
            toast.error("Aucune donnée n'a été ajouté.");
            yield put({ type: types.ADD_SERVICE_FAILED, payload: "Échec lors de la récupération des données" });
        }

    } catch (error) {
        toast.error("Aucune donnée n'a été ajouté.");
        console.error(error);
        yield put({ type: types.ADD_SERVICE_FAILED, payload: error.message || "Une erreur s'est produite" });
    }
}

function* deleteService (action) {
    const { id } = action.payload;
console.log('id', id)
    try {
        const link = `${url}/api/v1/product/delete?id=${id}`;

        const data = yield deleteRequest(link);
        if (data) {
            yield put({ type: types.DELETE_SERVICE_SUCCESS, payload: data });
            toast.success(data.data.message);
            yield put({ type: types.GET_SERVICES_REQUEST });
        } else {
            toast.error("Aucune donnée n'a été supprimé.");
            yield put({ type: types.DELETE_SERVICE_FAILED, payload: "Échec lors de la suppression des données" });
        }

    } catch (error) {
        console.error(error);
        toast.error("Aucune donnée n'a été supprimé.");
        yield put({ type: types.DELETE_SERVICE_FAILED, payload: error.message || "Une erreur s'est produite" });
    }
}

export default function* ServiceSaga() {
    yield takeLatest(types.GET_OFFERS_REQUEST, listOffers);
    yield takeLatest(types.GET_SERVICES_REQUEST, listServices);
    yield takeLatest(types.UPDATE_SERVICE_REQUEST, update);
    yield takeLatest(types.UPDATE_OFFER_REQUEST, updateOffer);
    yield takeLatest(types.ADD_SERVICE_REQUEST, add);
    yield takeLatest(types.DELETE_SERVICE_REQUEST, deleteService);
    yield takeLatest(types.DELETE_OFFER_REQUEST, deleteOffer);
    yield takeLatest(types.ADD_OFFER_REQUEST, addOffer);
}