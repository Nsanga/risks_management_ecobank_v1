const json = 'application/json; charset=utf-8';
const multPart = 'multipart/form-data; charset=utf-8';

/**
 * Requête authentifiée
 */
const request = async (contentType, tenantId, method, url, data, options = {}) => {
  try {
    const headers = {
      Authorization: localStorage.getItem('token'),
      ...(tenantId && { 'x-tenant-id': tenantId }),
      ...(contentType && { 'Content-Type': contentType }),
    };

    const response = await fetch(url, {
      method,
      headers,
      body: data,
      timeout: 15000,
      ...options,
    });

    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error('Erreur API :', error);
    throw error;
  }
};

/**
 * Requête non authentifiée
 */
const unAuthRequest = async (contentType, tenantId, method, url, data) => {
  const headers = {
    ...(tenantId && { 'x-tenant-id': tenantId }),
    ...(contentType && { 'Content-Type': contentType }),
  };

  const response = await fetch(url, {
    method,
    headers,
    body: data,
    timeout: 15000,
  });

  if (response) return await response.json();
  throw new Error('Api call failed');
};

// Fonctions d'API
export const getRequest = (url, tenantId) => request(json, tenantId, 'GET', url);
export const postRequest = (url, data, tenantId) => request(json, tenantId, 'POST', url, data);
export const putRequest = (url, data, tenantId) => request(json, tenantId, 'PUT', url, data);
export const deleteRequest = (url, data, tenantId) => request(json, tenantId, 'DELETE', url, data);

export const postRequestFormData = (url, data, tenantId, options = {}) =>
  request(null, tenantId, 'POST', url, data, options);

export const putRequestFormData = (url, data, tenantId, options = {}) =>
  request(null, tenantId, 'PUT', url, data, options);

export const postUnauthRequest = (url, data, tenantId) =>
  unAuthRequest(json, tenantId, 'POST', url, data);

export const getUnauthRequest = (url, tenantId) =>
  unAuthRequest(json, tenantId, 'GET', url);

export const putUnauthRequest = (url, data, tenantId) =>
  unAuthRequest(json, tenantId, 'PUT', url, data);

export const deleteUnauthRequest = (url, data, tenantId) =>
  unAuthRequest(json, tenantId, 'DELETE', url, data);

// Assurez-vous que toutes les fonctions d'API sont correctement exportées
