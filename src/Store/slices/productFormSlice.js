import { createSlice } from "@reduxjs/toolkit";



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
        products: []
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
        }
    }
})

export const { updateField, setColors, setCategory, resetForm, addProduct } = productFormSlice.actions;
export default productFormSlice.reducer