
import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    userList: [],
    loading: false,
    error: null,
  },
  reducers: {
    setUsers(state, action) {
      state.userList = action.payload;
    },
    addUser(state, action) {
      state.userList.push(action.payload);
    },
    updateUser(state, action) {
      const index = state.userList.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.userList[index] = action.payload;
      }
    },
    deleteUser(state, action) {
      state.userList = state.userList.filter(user => user.id !== action.payload);
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});


export const { setUsers, addUser, updateUser, deleteUser, setLoading, setError } = usersSlice.actions;


export default usersSlice.reducer;
