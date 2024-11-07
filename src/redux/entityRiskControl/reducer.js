import * as types from './types';

const INITIAL_STATE = {
  entityRiskControls: [],
  loading: false,
  error: null,
  addSuccess: false,
  newItemId: null,
};

function EntityRiskControlReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GET_ENTITYRISKCONTROLS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
      case types.GET_ENTITYRISKCONTROLS_SUCCESS:
        return {
          ...state,
          loading: false,
          entityRiskControls: action.payload.data,
        };
    case types.GET_ENTITYRISKCONTROLS_FAILED:
      return {
        ...state,
        loading: false,
        entityRiskControls: [],
      };
    case types.UPDATE_ENTITYRISKCONTROL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.UPDATE_ENTITYRISKCONTROL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.UPDATE_ENTITYRISKCONTROL_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case types.ADD_ENTITYRISKCONTROL_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
          addSuccess: false, // Réinitialiser en cas de nouvelle requête
        };
      case types.ADD_ENTITYRISKCONTROL_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null,
          addSuccess: true, // Action réussie
          newItemId: action.id,
        };
      case types.ADD_ENTITYRISKCONTROL_FAILED:
        return {
          ...state,
          loading: false,
          error: action.payload,
          addSuccess: false, // Échec de l'action
          newItemId: null,
        };
    case types.DELETE_ENTITYRISKCONTROL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.DELETE_ENTITYRISKCONTROL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.DELETE_ENTITYRISKCONTROL_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
export default EntityRiskControlReducer;