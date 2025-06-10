import * as types from './types';

const INITIAL_STATE = {
  stats: [],
  loading: false,
  error: null,
};

function StatReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GET_STATS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_STATS_SUCCESS:
      return {
        ...state,
        loading: false,
        stats: action.payload.data,
      };
    case types.GET_STATS_FAILED:
      return {
        ...state,
        loading: false,
        reports: [],
      };
    default:
      return state;
  }
}
export default StatReducer;