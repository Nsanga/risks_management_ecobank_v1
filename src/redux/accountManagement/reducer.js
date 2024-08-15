import * as types from './types';

const INITIAL_STATE = {
  accounts: [],
  totals: {},
  loading: false,
  error: null,
};

function AccountReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GET_ACCOUNTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_ACCOUNTS_SUCCESS:
      return {
        ...state,
        loading: false,
        accounts: action.payload.data.accounts,
        totals: action.payload.data.totals
      };
    case types.GET_ACCOUNTS_FAILED:
      return {
        ...state,
        loading: false,
        accounts: [],
      };
      case types.UPDATE_ACCOUNT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.UPDATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.UPDATE_ACCOUNT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
export default AccountReducer;