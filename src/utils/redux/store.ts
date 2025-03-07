import persistedRootReducer from './reducer';
import { configureStore } from '@reduxjs/toolkit';
// import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

// Setup Middlewares
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

// Create Store
const store = configureStore({
    reducer: persistedRootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }).concat(middleware),
});

// Setup Store persistence
// const persistor = persistStore(store, null);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
