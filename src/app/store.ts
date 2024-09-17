import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import baseQuery from '../features/baseQuery';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [baseQuery.reducerPath]: baseQuery.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            baseQuery.middleware
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;