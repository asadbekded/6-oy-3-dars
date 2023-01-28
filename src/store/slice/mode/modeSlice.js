import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    mode : JSON.parse(localStorage.getItem("mode")) || false,
}

export const modeSlice = createSlice({
    name: 'mode',
    initialState,
    reducers: {
        toggleDarkMode : (state) => {
            state.mode = !state.mode
            localStorage.setItem("mode", JSON.stringify(state.mode))
        }
    }
})

export const { toggleDarkMode } = modeSlice.actions;