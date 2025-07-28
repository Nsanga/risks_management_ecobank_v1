import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import { url } from 'urlLoader';
import { getTenantFromSubdomain } from 'utils/getTenant';
import { postRequestFormData } from 'helper/api';

function* uploadFileSaga(action) {
    const { file } = action.payload;
    const tenantId = getTenantFromSubdomain();
    const link = `${url}/api/v1/risks-controls/upload`;
    
    try {
        // Création du FormData
        const formData = new FormData();
        formData.append('file', file);

        // Appel API avec suivi de progression
        const { response, progress } = yield call(
            uploadWithProgressWrapper, 
            postRequestFormData, 
            link, 
            formData, 
            tenantId,
            (progress) => {
                // Mise à jour de la progression dans le store
                put({ type: types.UPDATE_UPLOAD_PROGRESS, payload: progress });
            }
        );

        if (response.success) {
            yield put({ 
                type: types.UPLOAD_FILE_SUCCESS, 
                payload: response 
            });
        } else {
            yield put({ 
                type: types.UPLOAD_FILE_FAILURE, 
                payload: response.message || "Échec lors de l'upload du fichier" 
            });
        }

    } catch (error) {
        console.error('Upload error:', error);
        yield put({ 
            type: types.UPLOAD_FILE_FAILURE, 
            payload: error.response?.message || error.message || "Une erreur s'est produite lors de l'upload" 
        });
    }
}

// Wrapper pour gérer le suivi de progression
function* uploadWithProgressWrapper(apiFn, url, formData, tenantId, onProgress) {
    return yield call(
        apiFn, 
        url, 
        formData, 
        tenantId, 
        { onProgress } // Passer les options supplémentaires
    );
}

export default function* fileUploadSaga() {
    yield takeLatest(types.UPLOAD_FILE_REQUEST, uploadFileSaga);
}