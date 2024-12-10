import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Authslice";
const Store = configureStore({
    reducer: {
        auth: authSlice,
    },
}); 

export default Store; 