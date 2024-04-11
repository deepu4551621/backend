// src/features/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    userData: null,
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.userData = action.payload.userData;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.userData = null;
      state.error = action.payload.error;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userData = null;
      state.error = null;
    },
  },
});

export const { loginSuccess, loginFailure, logout } = userSlice.actions;

export default userSlice.reducer;
