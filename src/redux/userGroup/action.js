import * as types from './types';

export const listUserGroups = () => ({
  type: types.GET_USERGROUPS_REQUEST,
});

export const updateUserGroup = (id, userGroupData) => ({
    type: types.UPDATE_USERGROUP_REQUEST,
    payload: {id, userGroupData}
  });

  export const AddUserGroup = (userGroupData) => ({
    type: types.ADD_USERGROUP_REQUEST,
    payload: userGroupData
  });

  export const deleteUserGroup = (id) => ({
    type: types.DELETE_USERGROUP_REQUEST,
    payload: {id}
  });