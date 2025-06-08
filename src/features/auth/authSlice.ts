import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';

interface AuthState {
  token: string | null;
  status: 'idle' | 'loading' | 'error';
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.status = 'loading';
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<string>) {
      state.status = 'idle';
      state.token = action.payload;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.status = 'error';
      state.error = action.payload;
      state.token = null;
    },
    logout(state) {
      state.token = null;
      state.status = 'idle';
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectIsAuthenticated = (state: RootState) => !!state.auth.token;
export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;
