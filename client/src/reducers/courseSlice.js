import { createSlice } from '@reduxjs/toolkit';

export const courseSlice = createSlice({
  name: 'course',
  initialState: {
    availableCourses:[],
  },
  reducers: {
    setAvailableCourses: (state, action) => {
      state.availableCourses = action.payload; // Set all available courses
    },
  
  },
});

export const { setAvailableCourses  } = courseSlice.actions;

export default courseSlice.reducer;
