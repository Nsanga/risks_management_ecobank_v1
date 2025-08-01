import * as types from './types';

const INITIAL_STATE = {
  tenants: [],
  tenant: null,
  loading: false,
  error: null,
};

function TenantReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GET_TENANTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_TENANTS_SUCCESS:
      return {
        ...state,
        loading: false,
        tenants: action.payload.data.tenants,
      };
    case types.GET_TENANTS_FAILED:
      return {
        ...state,
        loading: false,
        tenants: [],
      };
    case types.GET_TENANT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_TENANT_SUCCESS:
      return {
        ...state,
        loading: false,
        tenant: action.payload.data.tenant,
      };
    case types.GET_TENANT_FAILED:
      return {
        ...state,
        loading: false,
        tenant: null,
      };
    case types.UPDATE_TENANT_REQUEST: 
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.UPDATE_TENANT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.UPDATE_TENANT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.ADD_TENANT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.ADD_TENANT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.ADD_TENANT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.DELETE_TENANT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.DELETE_TENANT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.DELETE_TENANT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
export default TenantReducer;