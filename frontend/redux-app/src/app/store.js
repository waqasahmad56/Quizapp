import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import quizReducer from '../features/auth/quizSlice';  
import usersReducer from '../features/users/usersSlice';
import profileReducer from '../features/profileSlice';
import questionsReducer from '../features/questionsSlice';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, profileReducer);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    quiz: quizReducer,
    users: usersReducer,
    // profile: profileReducer,
    quizzes: questionsReducer,
    profile: persistedReducer,



  },
});


export const persistor = persistStore(store);
