import { configureStore } from "@reduxjs/toolkit";
import productFormReducer from './slices/productFormSlice'
// import authReducer from './slices/authSlice' // TEMPORARILY DISABLED - Firebase incompatible with Expo Go



export const store = configureStore({
    reducer: {
        productForm: productFormReducer,
        // auth: authReducer // TEMPORARILY DISABLED
    }
})