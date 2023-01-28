import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    user: {}
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUser: (state, action) => {
            state.user = action.payload
        },
        removeUser: ( state ) => {
            state.user = ''
        }
    }
})

export const { getUser, removeUser } = userSlice.actions;