import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const createProfile = createAsyncThunk('profile/createProfile', async (newProfile) => {
  const response = await axios.post('http://localhost:5000/auth/users/profile', newProfile, {
    headers: {
      'Content-Type': 'multipart/form-data', 
    },
  });
  return response.data; 
});


const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    firstName: '',
    lastName: '',
    email: '',
    profilePic: '',
    status: 'idle',
  },
  reducers: {
    resetProfile: (state) => {
      state.firstName = '';
      state.lastName = '';
      state.email = '';
      state.profilePic = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.email = action.payload.email;
        state.profilePic = action.payload.profilePic;
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.status = 'failed';
        console.error(action.error.message); 
      });
  },
});

export const { resetProfile } = profileSlice.actions;
export default profileSlice.reducer;

























