import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'course',
  initialState: {
    enrolledCourses: [] // Array to hold enrolled courses
  },
  reducers: {
    enroll: (state, action) => {
      const { courseId } = action.payload;
      // Check if the course is not already enrolled
      if (!state.enrolledCourses.includes(courseId)) {
        state.enrolledCourses.push(courseId); // Enroll the course
      }
    },
    disenRoll: (state, action) => {
      const { courseId } = action.payload;
      // Filter out the removed course from enrolled courses
      state.enrolledCourses = state.enrolledCourses.filter(id => id !== courseId);
    },
    // Add other reducers as needed
  },
});

export const { enroll, disenRoll } = cartSlice.actions;

export default cartSlice.reducer;
