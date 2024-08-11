import { configureStore } from '@reduxjs/toolkit';
import { formSlice, formApi } from './slices/formSlice';

export const store = configureStore({
    reducer: {
        [formSlice.reducerPath]: formSlice.reducer,
        [formApi.reducerPath]: formApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(formApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
