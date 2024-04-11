import {configureStore} from '@reduxjs/toolkit'
import courseSlice from '../reducers/courseSlice';
import userSlice from '../reducers/userSlice'
export default configureStore({
    reducer: {
      user: userSlice,
      data: courseSlice,
    },
  });