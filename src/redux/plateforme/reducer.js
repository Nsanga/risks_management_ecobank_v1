import * as types from './types';

const INITIAL_STATE = {
  plateforme: [],
  loading: false,
  error: null,
};

function PlateformeReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GET_MESSAGE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        plateforme: action.payload.data.plateformes,
      };
    case types.GET_MESSAGE_FAILED:
      return {
        ...state,
        loading: false,
        plateforme: [],
      };
      case types.UPDATE_MESSAGE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.UPDATE_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        plateforme: state.plateforme.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };
    case types.UPDATE_MESSAGE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      default:
      return state;
  }
}
export default PlateformeReducer;