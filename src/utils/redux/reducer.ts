// Secure Storage library
import { persistCombineReducers } from 'redux-persist';

// slices
import { userSlice } from './slice/user/userSlice';
import { gameSlice } from './slice/game/slice';

const reducers = {
    user: userSlice.reducer,
    game: gameSlice.reducer,
};

const persistConfig = {
    key: 'root',
    storage: localStorage,
    // There is an issue in the source code of redux-persist (default setTimeout does not cleaning)
    timeout: undefined,
};

// Setup Reducers
export const persistedRootReducer = persistCombineReducers(persistConfig, reducers);

export type RootState = ReturnType<typeof persistedRootReducer>;

export default persistedRootReducer;
