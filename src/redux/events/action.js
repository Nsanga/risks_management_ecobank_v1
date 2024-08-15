import * as types from './types';

export const listEvents = () => ({
  type: types.GET_EVENTS_REQUEST,
});

export const updateEvent = (id, eventData) => ({
    type: types.UPDATE_EVENT_REQUEST,
    payload: {id, eventData}
  });

  export const AddEvent = (eventData) => ({
    type: types.ADD_EVENT_REQUEST,
    payload: eventData
  });

  export const deleteEvent = (id, type) => ({
    type: types.DELETE_EVENT_REQUEST,
    payload: {id, type}
  });