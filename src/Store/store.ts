import { configureStore } from "@reduxjs/toolkit";
import productFormReducer from './slices/productFormSlice'
// import authReducer from './slices/authSlice' // TEMPORARILY DISABLED - Firebase incompatible with Expo Go



export const store = configureStore({
    reducer: {
        productForm: productFormReducer,
        // auth: authReducer // TEMPORARILY DISABLED
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch