import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null, user: null, status: 'idle', error: null, role: null, },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.status = 'succeeded';
      state.error = null;
    },
    logout: (state) => {
      state.token = null;
      state.role=null;
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
    signupRequest: (state,action) => {
      state.status = 'loading';
      state.role = action.payload.role;

      state.error = null;
    },
    signupSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.status = 'succeeded';
      state.error = null;
    },
    signupFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    }
  }
});


export const { login, logout, signupRequest, signupSuccess, signupFailure } = authSlice.actions;

export default authSlice.reducer;
