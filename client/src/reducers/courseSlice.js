import { createSlice } from '@reduxjs/toolkit';

export const courseSlice = createSlice({
  name: 'course',
  initialState: {
    userId: null, // Initially set to null
    enrolledCourses: [], // Array to hold enrolled courses
    availableCourses:[],
  },
  reducers: {
    enroll: (state, action) => {
      state.enrolledCourses = action.payload;
    },
    // disenroll: (state, action) => {
    //   const { userId, courseId } = action.payload;
    //   // If the userId matches the current userId in state, disenroll the course
    //   if (userId === state.userId) {
    //     state.enrolledCourses = state.enrolledCourses.filter(id => id !== courseId);
    //   }
    // },
    setAvailableCourses: (state, action) => {
      state.availableCourses = action.payload; // Set all available courses
    },
  
  },
});

export const { enroll, setAvailableCourses  } = courseSlice.actions;

export default courseSlice.reducer;
