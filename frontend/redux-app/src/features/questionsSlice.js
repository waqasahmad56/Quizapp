import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    quizzes: [],
    status: 'idle',
    error: null,
};

export const fetchQuizzes = createAsyncThunk(
    'quizzes/fetchQuizzes',
    async ({ title, difficulty }) => {
        const response = await axios.get(`http://localhost:5000/auth/users/question/quizzes`, {
            params: { title, difficulty },
        });
        return response.data;
    }
);

const questionsSlice = createSlice({
    name: 'quizzes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuizzes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchQuizzes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.quizzes = action.payload;
            })
            .addCase(fetchQuizzes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const selectAllQuizzes = (state) => state.quizzes.quizzes;
export const selectQuizzesStatus = (state) => state.quizzes.status;

export default questionsSlice.reducer;
