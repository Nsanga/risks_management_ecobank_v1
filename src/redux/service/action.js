import * as types from './types';

export const listOffers = payload => ({
  type: types.GET_OFFERS_REQUEST,
  payload
});

export const updateOffer = (id, offerData) => ({
  type: types.UPDATE_OFFER_REQUEST,
  payload: {id, offerData}
});

export const AddOffer = (offerData) => ({
  type: types.ADD_OFFER_REQUEST,
  payload: offerData
});

export const deleteOffer = (id) => ({
  type: types.DELETE_OFFER_REQUEST,
  payload: {id}
});

export const listServices = payload => ({
  type: types.GET_SERVICES_REQUEST,
  payload
});

export const updateService = (id, serviceData) => ({
    type: types.UPDATE_SERVICE_REQUEST,
    payload: {id, serviceData}
  });

  export const AddService = (serviceData) => ({
    type: types.ADD_SERVICE_REQUEST,
    payload: serviceData
  });

  export const deleteService = (id) => ({
    type: types.DELETE_SERVICE_REQUEST,
    payload: {id}
  });