import * as types from './types';

export const listTenants = () => ({
  type: types.GET_TENANTS_REQUEST,
});

export const getTenant = () => ({
  type: types.GET_TENANT_REQUEST,
});

export const updateTenant = (id, tenantData) => ({
  type: types.UPDATE_TENANT_REQUEST,
  payload: { id, tenantData }
});

export const AddTenant = (tenantData) => ({
  type: types.ADD_TENANT_REQUEST,
  payload: tenantData
});

export const deleteTenant = (id) => ({
  type: types.DELETE_TENANT_REQUEST,
  payload: { id }
});