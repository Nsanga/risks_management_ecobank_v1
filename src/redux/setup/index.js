import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import sagas from './sagas';
import rootReducer from './reducers';

// Create the Saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the Redux store with middleware and reducer
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

// Run the root Saga
sagaMiddleware.run(sagas);

export default store;
