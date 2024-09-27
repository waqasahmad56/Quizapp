import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const createProfile = createAsyncThunk(
  'profile/createProfile',
  async (newProfile, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('firstName', newProfile.firstName);
      formData.append('lastName', newProfile.lastName);
      formData.append('email', newProfile.email);
      formData.append('password', newProfile.password);

      if (newProfile.profilePic) {
        formData.append('profilePic', newProfile.profilePic);
      }

      const response = await axios.post('http://localhost:5000/auth/users/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    firstName: '',
    lastName: '',
    email: '',
    profilePic: null,
    status: 'idle', 
    error: null,
  },
  reducers: {
  
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        
        const { firstName = '', lastName = '', email = '', profilePic = null } = action.payload || {};
        state.firstName = firstName;
        state.lastName = lastName;
        state.email = email;
        state.profilePic = profilePic;
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to create profile';
      });
  },
});


export default profileSlice.reducer;
