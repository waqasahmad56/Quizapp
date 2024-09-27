import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const updateQuiz = createAsyncThunk(
    'quiz/updateQuiz',
    async ({ id, quizData }, thunkAPI) => {
        try {
            const response = await axios.put(`/auth/users/quizzes/${id}`, quizData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const quizSlice = createSlice({
    name: 'quiz',
    initialState: {
        quizzes: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateQuiz.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateQuiz.fulfilled, (state, action) => {
                state.loading=false;
                const index = state.quizzes.findIndex(quiz => quiz._id === action.payload._id);
                if (index !== -1) {
                    state.quizzes[index] = action.payload;
                }
            })
            .addCase(updateQuiz.rejected, (state, action) => {
                state.loading = false;
                state.error=action.payload;
        
            });
    },
});

export default quizSlice.reducer;
