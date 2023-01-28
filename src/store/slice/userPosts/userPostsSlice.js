import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    loading: false,
    data: [],
    error: '',
}

export const getUserPosts = createAsyncThunk('userPosts/getUserPosts', () => {
    return axios.get('http://localhost:8080/posts').then(res => res.data)
})

export const userPostsSlice = createSlice({
    name: 'userPosts',
    initialState,
    extraReducers: ( builder ) => {
        builder.addCase(getUserPosts.pending, (state) => {
            state.loading = true
        });
        builder.addCase(getUserPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(getUserPosts.rejected, (state, action) => {
            state.loading = false;
            state.data = [];
            state.error = action.error.message;
        })
    }
})