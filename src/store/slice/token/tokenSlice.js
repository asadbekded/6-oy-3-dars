import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    token: ''
};

export const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        getToken : (state, action) => {
            state.token = action.payload
        },
        removeToken : ( state ) => {
            state.token = ''
        }
    }
});

export const { getToken, removeToken } = tokenSlice.actions;