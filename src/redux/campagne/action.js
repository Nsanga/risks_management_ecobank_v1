import * as types from './types';

export const listCampaigns = payload => ({
  type: types.GET_CAMPAIGNS_REQUEST,
  payload
});

export const updateCampaign = (id, campaignData) => ({
    type: types.UPDATE_CAMPAIGN_REQUEST,
    payload: {id, campaignData}
  });

  export const AddCampaign = (campaignData) => ({
    type: types.ADD_CAMPAIGN_REQUEST,
    payload: campaignData
  });

  export const deleteCampaign = (id, type) => ({
    type: types.DELETE_CAMPAIGN_REQUEST,
    payload: {id, type}
  });

  export const listGroups = payload => ({
    type: types.GET_GROUPS_REQUEST,
    payload
  });
  
  export const updateGroup = (id, groupData) => ({
    type: types.UPDATE_GROUP_REQUEST,
    payload: {id, groupData}
  });
  
  export const AddGroup = (groupData) => ({
    type: types.ADD_GROUP_REQUEST,
    payload: groupData
  });
  
  export const deleteGroup = (id) => ({
    type: types.DELETE_GROUP_REQUEST,
    payload: {id}
  });