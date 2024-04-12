// src/features/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    userData: null,
    mycourse:[],
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.userData = action.payload.userData;
      state.mycourse = action.payload.courseData;
      state.error = null;
    },
    updateCourse:(state,action)=>{
      state.mycourse = action.payload.courseData;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userData = null;
      state.error = null;
    },
  },
});

export const { loginSuccess, logout, updateCourse } = userSlice.actions;

export default userSlice.reducer;
