import * as types from './types';

const INITIAL_STATE = {
  campaigns: [],
  groups: [],
  loading: false,
  error: null,
};

function CampaignReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GET_CAMPAIGNS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_CAMPAIGNS_SUCCESS:
      return {
        ...state,
        loading: false,
        campaigns: action.payload.data.campaigns,
      };
    case types.GET_CAMPAIGNS_FAILED:
      return {
        ...state,
        loading: false,
        campaigns: [],
      };
      case types.UPDATE_CAMPAIGN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.UPDATE_CAMPAIGN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.UPDATE_CAMPAIGN_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case types.ADD_CAMPAIGN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.ADD_CAMPAIGN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.ADD_CAMPAIGN_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case types.DELETE_CAMPAIGN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.DELETE_CAMPAIGN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.DELETE_CAMPAIGN_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case types.GET_GROUPS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_GROUPS_SUCCESS:
      return {
        ...state,
        loading: false,
        groups: action.payload.data.groups,
      };
    case types.GET_GROUPS_FAILED:
      return {
        ...state,
        loading: false,
        groups: [],
      };
    case types.UPDATE_GROUP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.UPDATE_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.UPDATE_GROUP_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.ADD_GROUP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.ADD_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.ADD_GROUP_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.DELETE_GROUP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.DELETE_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.DELETE_GROUP_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      default:
      return state;
  }
}
export default CampaignReducer;