import * as types from './types';

export const listProfiles = () => ({
  type: types.GET_PROFILES_REQUEST,
});

export const updateProfile = (id, profileData) => ({
    type: types.UPDATE_PROFILE_REQUEST,
    payload: {id, profileData}
  });

  export const AddProfile = (profileData) => ({
    type: types.ADD_PROFILE_REQUEST,
    payload: profileData
  });

  export const deleteProfile = (id) => ({
    type: types.DELETE_PROFILE_REQUEST,
    payload: {id}
  });