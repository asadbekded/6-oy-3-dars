import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState  = {
    loading: false,
    data: [],
    error: ''
}
// 1-usuli 

export const getPosts = createAsyncThunk('posts/getData', (id) => {
    return axios.get('http://localhost:8080/posts?user_id=' + id)
    .then((res) => res.data)
});

// 2- usuli 
// export const getPosts = createAsyncThunk('posts/getData', async (arg, { rejectWithValue }) => {
//     try {
//         const {data} = await axios.get('http://localhost:8080/posts')
//         return data;
//     } catch (error) {
//         rejectWithValue(error.res.data)
//     }
// });

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    extraReducers: ( builder ) => {
        builder.addCase(getPosts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(getPosts.rejected, (state, action) => {
            state.loading = false;
            state.data = [];
            state.error = action.error.message;
        });
    }
})
