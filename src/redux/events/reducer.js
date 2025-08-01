import { produce } from 'immer';
import * as types from './types';

const INITIAL_STATE = {
  events: [],
  event: null,
  loading: false,
  error: null,
};

const EventReducer = (state = INITIAL_STATE, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_EVENTS_REQUEST:
        draft.loading = true;
        draft.error = null;
        break;
      case types.GET_EVENTS_SUCCESS:
        draft.loading = false;
        draft.events = action.payload.data.events;
        break;
      case types.GET_EVENTS_FAILED:
        draft.loading = false;
        draft.events = [];
        draft.error = action.payload;
        break;
      case types.GET_EVENT_REQUEST:
        draft.loading = true;
        draft.error = null;
        break;
      case types.GET_EVENT_SUCCESS:
        draft.loading = false;
        draft.event = action.payload.data.event;
        break;
      case types.GET_EVENT_FAILED:
        draft.loading = false;
        draft.event = null;
        draft.error = action.payload;
        break;
      case types.GET_EVENTS_BY_ENTITY_REQUEST:
        draft.loading = true;
        draft.error = null;
        break;
      case types.GET_EVENTS_BY_ENTITY_SUCCESS:
        draft.loading = false;
        draft.events = action.payload.data.events;
        break;
      case types.GET_EVENTS_BY_ENTITY_FAILED:
        draft.loading = false;
        draft.events = [];
        draft.error = action.payload;
        break;
      case types.UPDATE_EVENT_REQUEST:
        draft.loading = true;
        draft.error = null;
        break;
      case types.UPDATE_EVENT_SUCCESS:
        draft.loading = false;
        draft.error = null;
        break;
      case types.UPDATE_EVENT_FAILED:
        draft.loading = false;
        draft.error = action.payload;
        break;
      case types.ADD_EVENT_REQUEST:
        draft.loading = true;
        draft.error = null;
        break;
      case types.ADD_EVENT_SUCCESS:
        draft.loading = false;
        draft.error = null;
        break;
      case types.ADD_EVENT_FAILED:
        draft.loading = false;
        draft.error = action.payload;
        break;
      case types.DELETE_EVENT_REQUEST:
        draft.loading = true;
        draft.error = null;
        break;
      case types.DELETE_EVENT_SUCCESS:
        draft.loading = false;
        draft.error = null;
        break;
      case types.DELETE_EVENT_FAILED:
        draft.loading = false;
        draft.error = action.payload;
        break;
      default:
        return state;
    }
  });

export default EventReducer;
