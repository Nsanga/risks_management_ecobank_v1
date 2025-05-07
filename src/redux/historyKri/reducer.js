import * as types from './types';

const INITIAL_STATE = {
  histories: [],
  average: 0,
  loading: false,
  error: null,
};

function HistoryKRIReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GET_HISTORIESKRI_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_HISTORIESKRI_SUCCESS:
      return {
        ...state,
        loading: false,
        histories: action.payload.data.histories,
        average: action.payload.data.average,
      };
    case types.GET_HISTORIESKRI_FAILED:
      return {
        ...state,
        loading: false,
        histories: [],
        average: 0
      };
    case types.UPDATE_HISTORYKRI_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.UPDATE_HISTORYKRI_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.UPDATE_HISTORYKRI_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.ADD_HISTORYKRI_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.ADD_HISTORYKRI_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.ADD_HISTORYKRI_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.DELETE_HISTORYKRI_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.DELETE_HISTORYKRI_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.DELETE_HISTORYKRI_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
export default HistoryKRIReducer;