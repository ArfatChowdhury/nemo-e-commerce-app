import { configureStore } from "@reduxjs/toolkit";
import productFormReducer from '../slices/productFormSlice'




export const store = configureStore({
    reducer:{
        productForm: productFormReducer
    }
})