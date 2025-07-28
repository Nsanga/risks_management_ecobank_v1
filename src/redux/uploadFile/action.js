import * as types from './types';

export const uploadFile = (file) => ({
    type: types.UPLOAD_FILE_REQUEST,
    payload: { file }
});