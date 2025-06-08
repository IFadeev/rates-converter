import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from '@/features/auth/authSlice';
import ratesSettingsReducer from '@/features/rates/model/ratesSettingsSlice';
import { ratesApi } from '@/features/rates/api/ratesApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ratesSettings: ratesSettingsReducer,
    [ratesApi.reducerPath]: ratesApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(ratesApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
