import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import courseSlice from '../reducers/courseSlice';
import userSlice from '../reducers/userSlice';

const persistConfig = {
  key: 'root',
  storage: storage,
  version: 1,
};

const rootReducer = combineReducers({
  user: userSlice, // Accessing the reducer property of userSlice
  data: courseSlice, // Accessing the reducer property of courseSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
