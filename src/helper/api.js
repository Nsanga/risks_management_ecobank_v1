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


export const postRequestFormData = (url, data, tenantId, options = {}) => {
  // Créer une nouvelle promesse pour gérer le suivi de progression
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('POST', url);
    xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
    if (tenantId) {
      xhr.setRequestHeader('x-tenant-id', tenantId);
    }

    // Suivi de progression
    if (options.onProgress) {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable && typeof options.onProgress === 'function') {
          const progress = Math.round((event.loaded / event.total) * 100);
          options.onProgress(progress);
        }
      };
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          resolve({ response, progress: 100 });
        } catch (e) {
          reject(new Error('Invalid JSON response'));
        }
      } else {
        reject(new Error(xhr.statusText));
      }
    };

    xhr.onerror = () => reject(new Error('Network Error'));
    xhr.send(data);
  });
};

// Assurez-vous que toutes les fonctions d'API sont correctement exportées
