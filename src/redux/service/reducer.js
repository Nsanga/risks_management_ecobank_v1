import * as types from './types';

const INITIAL_STATE = {
  offers: [],
  services: [],
  loading: false,
  error: null,
};

function ServiceReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GET_OFFERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_OFFERS_SUCCESS:
      return {
        ...state,
        loading: false,
        offers: action.payload.data.offers,
      };
    case types.GET_OFFERS_FAILED:
      return {
        ...state,
        loading: false,
        offers: [],
      };
    case types.UPDATE_OFFER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.UPDATE_OFFER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.UPDATE_OFFER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.ADD_OFFER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.ADD_OFFER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.ADD_OFFER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.DELETE_OFFER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.DELETE_OFFER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.DELETE_OFFER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.GET_SERVICES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_SERVICES_SUCCESS:
      return {
        ...state,
        loading: false,
        services: action.payload.data.products,
      };
    case types.GET_SERVICES_FAILED:
      return {
        ...state,
        loading: false,
        service: [],
      };
    case types.UPDATE_SERVICE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.UPDATE_SERVICE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.UPDATE_SERVICE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.ADD_SERVICE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.ADD_SERVICE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.ADD_SERVICE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.DELETE_SERVICE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.DELETE_SERVICE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.DELETE_SERVICE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
export default ServiceReducer;