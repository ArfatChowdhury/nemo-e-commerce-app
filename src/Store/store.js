import { configureStore } from "@reduxjs/toolkit";
import productFormReducer from './slices/productFormSlice'
import authReducer from './slices/authSlice'



export const store = configureStore({
    reducer: {
        productForm: productFormReducer,
        auth: authReducer
    }
})