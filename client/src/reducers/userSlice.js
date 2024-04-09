// src/features/user/userSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: null,
    userId: null,
    userData:[],
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = action.payload.success;
      state.userId = action.payload.id;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userId = null;
    },
    update:(state, action)=>{
      state.userData =action.payload.data
    }
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
