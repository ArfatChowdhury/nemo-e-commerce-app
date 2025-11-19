import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";



const productFormSlice = createSlice({
    name: 'productForm',
    initialState: {
        productName: '',
        price: '',
        description: '',
        brandName: '',
        stock: '',
        colors: [],
        category: '',
        images: [],
        products: [],
        cartItems: [],
        loading: false,
        error: null
    },
    reducers: {
        updateField: (state, action) => {
            const { field, value } = action.payload
            state[field] = value
        },
        setColors: (state, action) => {
            state.colors = action.payload
        },
        setCategory: (state, action) => {
            state.category = action.payload
        },
        resetForm: (state) => {
            state.productName = '';
            state.price = '';
            state.description = '';
            state.brandName = '';
            state.stock = '';
            state.colors = [];
            state.category = '';
            state.images = []
        },
        addProduct: (state, action) => {
            state.products.push(action.payload)
        },
        setImages: (state, action) => {
            state.images = action.payload
        },
        addImage: (state, action) => {
            state.images.push(action.payload)
        },
        removeImage: (state, action) => {
            state.images = state.images.filter((_, index) => index !== action.payload)
        },
        setMainImage: (state, action) => {
            const index = action.payload
            const imageToPromote = state.images[index]
            const otherImages = state.images.filter((_, i) => i !== index)
            state.images = [imageToPromote, ...otherImages]
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setError: (state, action) =>{
            state.error = action.payload
        },
        setProducts: (state, action) =>{
            state.products = action.payload
        },
        addToCart: (state,action)=>{
            state.cartItems.push(action.payload)
        }
    }
})

export const fetchProducts = () => {
    return async(dispatch) =>{
        try{
            dispatch(setLoading(true))
            dispatch(setError(null))

            const response = await fetch('https://backend-of-nemo.vercel.app/products')
            const data = await response.json()
            dispatch(setProducts(data.data || data))
        }catch{
            console.error('Error fetching products:', error)
            dispatch(setError(error.message))
        }finally{
            dispatch(setLoading(false))
        }
    }
}



export const { updateField, setColors, setCategory, resetForm, addProduct, addImage, setImages,removeImage,setMainImage, setProducts, setLoading, setError, addToCart } = productFormSlice.actions;
export default productFormSlice.reducer