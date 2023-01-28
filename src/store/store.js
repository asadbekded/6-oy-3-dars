import { configureStore } from "@reduxjs/toolkit";
import { modeSlice } from "./slice/mode/modeSlice";
import { postsSlice } from "./slice/posts/postsSlice";
import { tokenSlice } from "./slice/token/tokenSlice";
import { userSlice } from "./slice/user/userSlice";
import { userPostsSlice } from "./slice/userPosts/userPostsSlice";


export const store = configureStore({
    reducer: {
        token: tokenSlice.reducer,
        user: userSlice.reducer,
        posts: postsSlice.reducer,
        userPosts: userPostsSlice.reducer,
        mode: modeSlice.reducer,
    },
});